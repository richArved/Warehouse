import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useScroll, Stars } from '@react-three/drei'
import * as THREE from 'three'

// Szenen-Komponenten
import OldWarehouse from './scenes/OldWarehouse'
import SmartWarehouse from './scenes/SmartWarehouse'
import TransitionGate from './scenes/TransitionGate'

export default function Experience({ onSectionChange }) {
  const scroll = useScroll()
  const { scene } = useThree()

  // REFS statt STATE für Performance
  const ambientLightRef = useRef()
  const fogRef = useRef()

  // Ref um die letzte Section zu speichern (verhindert unnötige Updates)
  const lastSectionIndex = useRef(0)

  // PERFORMANCE FIX: Wiederverwendbare Color-Objekte
  const tempColor1 = useMemo(() => new THREE.Color(), [])
  const tempColor2 = useMemo(() => new THREE.Color(), [])
  
  // Dramaturgische Kamera-Positionen
  // HINWEIS: SmartWarehouse Gruppe ist bei [0, 0, -20]
  // Alle Ziele in SmartWarehouse müssen also -20 auf der Z-Achse addiert bekommen.
  const cameraPositions = useMemo(() => [
    // ════ AKT 1 (4 Sektionen) ════
    // 1. Prolog
    { 
      pos: [0, 3, 20], target: [0, 1, 0],
      ambient: 0.4, fog: { near: 15, far: 40 }, fogColor: '#1a1512'
    },
    // 2. Das Problem (Chaos)
    { 
      pos: [4, 2, 10], target: [0, 1, 0],
      ambient: 0.5, fog: { near: 12, far: 35 }, fogColor: '#1f1815'
    },
    // 3. Wendepunkt
    { 
      pos: [0, 2.5, 6], target: [0, 2, -10],
      ambient: 0.6, fog: { near: 10, far: 40 }, fogColor: '#151a20'
    },
    // 4. Daten-Scan (Methodik) – Research Terminal v2.0 am TransitionGate (Welt z ≈ -8)
    { 
      pos: [0, 2.5, -4], target: [0, 1, -8],
      ambient: 0.6, fog: { near: 8, far: 30 }, fogColor: '#081015'
    },

    // ════ AKT 2 (5 Sektionen) ════
    // 5. Eintritt Smart Warehouse
    { 
      pos: [0, 2.5, -5], target: [0, 1, -15],
      ambient: 0.7, fog: { near: 15, far: 50 }, fogColor: '#0f1015'
    },
    // 6. IoT Technologien
    { 
      pos: [6, 2.5, -18], target: [2, 1.5, -22],
      ambient: 0.8, fog: { near: 15, far: 60 }, fogColor: '#0a0f15'
    },
    // 7. Amazon Zone
    // Zone bei lokal [-6, 0, -7.5] -> Welt [-6, 0, -27.5]
    { 
      pos: [-2, 2.5, -24], target: [-6, 1.5, -27.5],
      ambient: 0.7, fog: { near: 12, far: 50 }, fogColor: '#1a1008'
    },
    // 8. DHL Zone
    // Zone bei lokal [6, 0, -7.5] -> Welt [6, 0, -27.5]
    { 
      pos: [2, 2.5, -24], target: [6, 1.5, -27.5],
      ambient: 0.7, fog: { near: 12, far: 50 }, fogColor: '#1a1508'
    },
    // 9. Balance (Nachhaltigkeit) – Industriewaage hinter letztem Regal links (lokal Z -18 → Welt -38)
    { 
      pos: [-3, 3, -34], target: [-5, 1.5, -38],
      ambient: 0.8, fog: { near: 20, far: 70 }, fogColor: '#081510'
    },

    // ════ AKT 3 (3 Sektionen) ════
    // 10. System-Diagnose (Warning) – hinter letztem Regal rechts (lokal Z -18 → Welt -38)
    { 
      pos: [3, 3, -34], target: [5, 1.5, -38],
      ambient: 0.6, fog: { near: 15, far: 50 }, fogColor: '#0a0a0f'
    },
    // 11. Kritische Diskussion – Warning-Schild hinter letztem Regal
    { 
      pos: [4, 5, -32], target: [5, 1.5, -38],
      ambient: 0.7, fog: { near: 25, far: 80 }, fogColor: '#080a12'
    },
    // 12. Epilog (Ausblick)
    { 
      pos: [0, 8, -15], target: [0, 0, -30],
      ambient: 0.5, fog: { near: 20, far: 90 }, fogColor: '#050508'
    },
  ], [])

  useFrame((state, delta) => {
    const offset = scroll.offset
    
    // 1. DOM direkt manipulieren
    const progressBar = document.getElementById('scroll-progress-bar')
    if (progressBar) {
      progressBar.style.width = `${offset * 100}%`
    }

    // 2. Section State Update
    const sectionIndex = Math.min(
      Math.floor(offset * cameraPositions.length),
      cameraPositions.length - 1
    )
    
    if (lastSectionIndex.current !== sectionIndex) {
      onSectionChange(sectionIndex)
      lastSectionIndex.current = sectionIndex
    }

    // Interpolation Logic
    const totalSections = cameraPositions.length - 1
    const currentSection = Math.floor(offset * totalSections)
    const nextSection = Math.min(currentSection + 1, totalSections)
    const sectionProgress = (offset * totalSections) % 1

    const current = cameraPositions[currentSection]
    const next = cameraPositions[nextSection]
    const eased = easeInOutQuart(sectionProgress)

    // Kamera Position & Target
    state.camera.position.x = THREE.MathUtils.lerp(current.pos[0], next.pos[0], eased)
    state.camera.position.y = THREE.MathUtils.lerp(current.pos[1], next.pos[1], eased)
    state.camera.position.z = THREE.MathUtils.lerp(current.pos[2], next.pos[2], eased)

    const targetX = THREE.MathUtils.lerp(current.target[0], next.target[0], eased)
    const targetY = THREE.MathUtils.lerp(current.target[1], next.target[1], eased)
    const targetZ = THREE.MathUtils.lerp(current.target[2], next.target[2], eased)
    state.camera.lookAt(targetX, targetY, targetZ)

    // Beleuchtung & Fog
    if (ambientLightRef.current) {
      const newAmbient = THREE.MathUtils.lerp(current.ambient, next.ambient, eased)
      ambientLightRef.current.intensity = newAmbient
    }
    
    if (fogRef.current) {
      fogRef.current.near = THREE.MathUtils.lerp(current.fog.near, next.fog.near, eased)
      fogRef.current.far = THREE.MathUtils.lerp(current.fog.far, next.fog.far, eased)

      tempColor1.set(current.fogColor)
      tempColor2.set(next.fogColor)
      fogRef.current.color.lerpColors(tempColor1, tempColor2, eased)
      scene.background = fogRef.current.color
    }
  })

  const scrollOffset = scroll.offset

  return (
    <>
      <ambientLight ref={ambientLightRef} intensity={0.1} />
      <directionalLight position={[10, 20, 10]} intensity={1.2} castShadow shadow-bias={-0.0001} />
      <directionalLight position={[-10, 10, -5]} intensity={0.4} />
      <hemisphereLight args={['#b1e1ff', '#2d3748', 0.5]} />
      <fog ref={fogRef} attach="fog" args={['#0a0a0f', 5, 20]} />
      <Stars radius={100} depth={50} count={400} factor={4} fade speed={0.5} />

      <group position={[0, 0, 0]}>
        <OldWarehouse scrollProgress={scrollOffset} />
      </group>

      <group position={[0, 0, -8]}>
        <TransitionGate scrollProgress={scrollOffset} />
      </group>

      <group position={[0, 0, -20]}>
        <SmartWarehouse scrollProgress={scrollOffset} />
      </group>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, -20]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#0a0a0f" roughness={0.95} />
      </mesh>
    </>
  )
}

function easeInOutQuart(t) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2
}