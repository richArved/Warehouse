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

  // PERFORMANCE FIX: Wiederverwendbare Color-Objekte (statt 120 Allocations/sec!)
  const tempColor1 = useMemo(() => new THREE.Color(), [])
  const tempColor2 = useMemo(() => new THREE.Color(), [])
  
  // Dramaturgische Kamera-Positionen (Daten bleiben gleich)
  const cameraPositions = useMemo(() => [
    // AKT 1: DAS PROBLEM
    { 
      pos: [0, 3, 20], target: [0, 1, 0],
      ambient: 0.4, fog: { near: 15, far: 40 }, fogColor: '#1a1512'
    },
    { 
      pos: [4, 2, 10], target: [0, 1, 0],
      ambient: 0.5, fog: { near: 12, far: 35 }, fogColor: '#1f1815'
    },
    { 
      pos: [0, 2.5, 6], target: [0, 2, -10],
      ambient: 0.6, fog: { near: 10, far: 40 }, fogColor: '#151a20'
    },
    // AKT 2: DIE TRANSFORMATION
    { 
      pos: [0, 2.5, -5], target: [0, 1, -15],
      ambient: 0.7, fog: { near: 15, far: 50 }, fogColor: '#0f1015'
    },
    { 
      pos: [6, 2.5, -18], target: [2, 1.5, -22],
      ambient: 0.8, fog: { near: 15, far: 60 }, fogColor: '#0a0f15'
    },
    { 
      pos: [-8, 2.5, -25], target: [-5, 1, -28],
      ambient: 0.7, fog: { near: 12, far: 50 }, fogColor: '#1a1008'
    },
    { 
      pos: [8, 2.5, -25], target: [5, 1, -28],
      ambient: 0.7, fog: { near: 12, far: 50 }, fogColor: '#1a1508'
    },
    { 
      pos: [0, 10, -22], target: [0, 0, -25],
      ambient: 0.8, fog: { near: 20, far: 70 }, fogColor: '#081510'
    },
    // AKT 3: DIE ERKENNTNIS
    {
      pos: [0, 3, -32], target: [0, 2, -38],
      ambient: 0.6, fog: { near: 15, far: 50 }, fogColor: '#0a0a0f'
    },
    {
      pos: [-6, 4, -28], target: [0, 1, -32],
      ambient: 0.65, fog: { near: 18, far: 55 }, fogColor: '#0f0a0a'
    },
    {
      pos: [5, 3, -30], target: [0, 1.5, -35],
      ambient: 0.7, fog: { near: 20, far: 60 }, fogColor: '#0a0a12'
    },
    {
      pos: [0, 8, -25], target: [0, 0, -30],
      ambient: 0.8, fog: { near: 25, far: 80 }, fogColor: '#080a12'
    },
  ], [])

  useFrame((state, delta) => {
    const offset = scroll.offset
    
    // 1. PERFORMANCE FIX: DOM direkt manipulieren
    const progressBar = document.getElementById('scroll-progress-bar')
    if (progressBar) {
      progressBar.style.width = `${offset * 100}%`
    }

    // 2. PERFORMANCE FIX: Section State nur updaten wenn er sich ÄNDERT
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

    // Kamera Position & Target (direkte Manipulation war schon korrekt)
    state.camera.position.x = THREE.MathUtils.lerp(current.pos[0], next.pos[0], eased)
    state.camera.position.y = THREE.MathUtils.lerp(current.pos[1], next.pos[1], eased)
    state.camera.position.z = THREE.MathUtils.lerp(current.pos[2], next.pos[2], eased)

    const targetX = THREE.MathUtils.lerp(current.target[0], next.target[0], eased)
    const targetY = THREE.MathUtils.lerp(current.target[1], next.target[1], eased)
    const targetZ = THREE.MathUtils.lerp(current.target[2], next.target[2], eased)
    state.camera.lookAt(targetX, targetY, targetZ)

    // 3. PERFORMANCE FIX: Lichter & Fog direkt manipulieren (Kein State!)
    
    // Ambient Light
    if (ambientLightRef.current) {
      const newAmbient = THREE.MathUtils.lerp(current.ambient, next.ambient, eased)
      ambientLightRef.current.intensity = newAmbient
    }
    
    // Fog
    if (fogRef.current) {
      fogRef.current.near = THREE.MathUtils.lerp(current.fog.near, next.fog.near, eased)
      fogRef.current.far = THREE.MathUtils.lerp(current.fog.far, next.fog.far, eased)

      // PERFORMANCE FIX: Wiederverwendbare Color-Objekte statt neue zu erstellen
      tempColor1.set(current.fogColor)
      tempColor2.set(next.fogColor)
      fogRef.current.color.lerpColors(tempColor1, tempColor2, eased)
      // Hintergrundfarbe der Szene anpassen damit Fog passt
      scene.background = fogRef.current.color
    }
  })

  // PERFORMANCE FIX: useScroll().offset nur 1x berechnen statt 3x
  const scrollOffset = scroll.offset

  return (
    <>
      {/* Refs zuweisen statt State-Werte zu binden */}
      <ambientLight ref={ambientLightRef} intensity={0.1} />

      <directionalLight
        position={[10, 20, 10]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[512, 512]} // Reduziert auf 512 für Mobile Performance
        shadow-bias={-0.0001}
      />

      <directionalLight position={[-10, 10, -5]} intensity={0.4} />
      <hemisphereLight args={['#b1e1ff', '#2d3748', 0.5]} />

      {/* Fog mit Ref verbinden */}
      <fog ref={fogRef} attach="fog" args={['#0a0a0f', 5, 20]} />

      {/* PERFORMANCE: Stars reduziert von 800 auf 400 */}
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