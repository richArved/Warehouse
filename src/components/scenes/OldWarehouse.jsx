import React, { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Instances, Instance } from '@react-three/drei'

/**
 * AKT 1: DAS ALTE LAGERHAUS (High Detail Geometry Version)
 * Features:
 * - Backstein-Optik durch Geometrie
 * - Stahlträger-Dachkonstruktion
 * - Rohre & Industrie-Details
 * - Volumetrisches Licht (God Rays)
 */

// ==================== BELEUCHTUNG & ATMOSPHÄRE ====================

function WarehouseAtmosphere() {
  return (
    <group>
      {/* 1. OPTIMIERT: Nur 2 echte Lichtquellen statt 6 */}
      {/* Zentrale Lampen mit echtem Licht */}
      <IndustrialLight position={[0, 6, -2]} flicker={true} hasRealLight={true} />
      <IndustrialLight position={[0, 6, 2]} flicker={false} hasRealLight={true} />

      {/* Dekorative Lampen nur mit Emissive (kein echtes Licht) */}
      <IndustrialLight position={[-5, 6, -2]} flicker={false} hasRealLight={false} />
      <IndustrialLight position={[5, 6, -2]} flicker={false} hasRealLight={false} />
      <IndustrialLight position={[-5, 6, 2]} flicker={false} hasRealLight={false} />
      <IndustrialLight position={[5, 6, 2]} flicker={false} hasRealLight={false} />

      {/* 2. OPTIMIERT: Nur 2 God Rays statt 5 */}
      <GodRay position={[-11.5, 4, 0]} rotation={[0, 0, -0.6]} />
      <GodRay position={[11.5, 4, 0]} rotation={[0, 0, 0.6]} />

      {/* 3. Grundlicht (Dunkel & Warm) */}
      <ambientLight intensity={0.25} color="#554433" />
    </group>
  )
}

// Wiederverwendbare Geometrien und Materialien für GodRays
const godRayGeometry = new THREE.ConeGeometry(1, 8, 32, 1, true)
const godRayMaterial = new THREE.MeshBasicMaterial({
  color: '#fff5cc',
  transparent: true,
  opacity: 0.03,
  side: THREE.DoubleSide,
  depthWrite: false,
  blending: THREE.AdditiveBlending
})

function GodRay({ position, rotation }) {
  // Simuliert staubiges Licht, das durch Fenster fällt
  return (
    <mesh position={position} rotation={rotation} geometry={godRayGeometry} material={godRayMaterial} />
  )
}

// Wiederverwendbare Color-Objekte für IndustrialLight
const lightColorOn = new THREE.Color(0xffaa00)
const lightColorOff = new THREE.Color(0x331100)

function IndustrialLight({ position, flicker = false, hasRealLight = true }) {
  const lightRef = useRef()
  const bulbRef = useRef()
  const frameCount = useRef(0)

  useFrame(() => {
    // Frame-Throttling: nur jeden 3. Frame updaten
    frameCount.current++
    if (frameCount.current % 3 !== 0) return

    if (flicker && hasRealLight && lightRef.current && bulbRef.current) {
      const isOn = Math.random() > 0.05 // Meistens an
      const intensity = isOn ? 0.8 + Math.random() * 0.4 : 0.1
      lightRef.current.intensity = intensity
      bulbRef.current.material.color.copy(isOn ? lightColorOn : lightColorOff)
    }
  })

  return (
    <group position={position}>
      {/* Lampenschirm (Rostig) - reduzierte Segmente */}
      <mesh position={[0, 0.2, 0]}>
        <coneGeometry args={[0.4, 0.3, 8, 1, true]} />
        <meshStandardMaterial color="#3a2a1a" roughness={0.9} side={THREE.DoubleSide} />
      </mesh>
      {/* Birne - mit Emissive für Leuchteffekt ohne echtes Licht */}
      <mesh ref={bulbRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.1, 6, 6]} />
        <meshStandardMaterial
          color="#ffaa00"
          emissive="#ffaa00"
          emissiveIntensity={hasRealLight ? 0.5 : 2}
        />
      </mesh>
      {/* Kabel */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 2, 6]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Nur echtes Licht wenn aktiviert */}
      {hasRealLight && (
        <pointLight
          ref={lightRef}
          color="#ffaa00"
          intensity={1.2}
          distance={12}
          decay={2}
          castShadow={false}
        />
      )}
    </group>
  )
}

// ==================== GEBÄUDESTRUKTUR (DETAIL REICH) ====================

function WarehouseStructure() {
  return (
    <group>
      {/* --- BODEN --- */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        {/* Dunkler, dreckiger Beton */}
        <meshStandardMaterial color="#2a2a2a" roughness={0.8} />
      </mesh>
      
      {/* Schmutzflecken auf dem Boden (Transparente Planes) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2, 0.01, 3]}>
        <circleGeometry args={[1.5, 32]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-3, 0.01, -2]}>
        <circleGeometry args={[2, 32]} />
        <meshBasicMaterial color="#1a1005" transparent opacity={0.4} />
      </mesh>

      {/* --- WÄNDE --- */}
      {/* Wir bauen Wände aus Segmenten für mehr Struktur */}
      <WallSegment position={[-12.5, 3.5, 0]} rotation={[0, Math.PI / 2, 0]} width={20} hasWindows={true} />
      <WallSegment position={[12.5, 3.5, 0]} rotation={[0, -Math.PI / 2, 0]} width={20} hasWindows={true} />
      <WallSegment position={[0, 3.5, -10]} rotation={[0, 0, 0]} width={25} hasWindows={false} />

      {/* --- DACHKONSTRUKTION (TRUSSES) --- */}
      {[-8, -4, 0, 4, 8].map((z, i) => (
        <RoofTruss key={i} position={[0, 6.5, z]} width={24} />
      ))}

      {/* --- ROHRE & DETAILS --- */}
      <RustyPipes />
      
    </group>
  )
}

function WallSegment({ position, rotation, width, hasWindows }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Hauptmauer (Dunkler Backstein-Look) */}
      <mesh>
        <boxGeometry args={[width, 7, 0.5]} />
        <meshStandardMaterial color="#4a3b32" roughness={0.9} />
      </mesh>
      
      {/* Säulen (Struktur) alle 4 Meter */}
      {Array.from({ length: Math.ceil(width / 4) + 1 }).map((_, i) => {
        const x = -width / 2 + i * 4
        return (
          <mesh key={i} position={[x, 0, 0.3]}>
            <boxGeometry args={[0.6, 7.2, 0.2]} />
            <meshStandardMaterial color="#3a2a22" roughness={1} />
          </mesh>
        )
      })}

      {/* Fenster (wenn aktiviert) */}
      {hasWindows && Array.from({ length: Math.floor(width / 4) }).map((_, i) => {
        const x = -width / 2 + 2 + i * 4
        return (
          <group key={i} position={[x, 1.5, 0.1]}>
             {/* Fensterrahmen */}
             <mesh>
               <boxGeometry args={[2, 1.5, 0.5]} />
               <meshStandardMaterial color="#1a1a1a" />
             </mesh>
             {/* Glas (Milchig/Dreckig) */}
             <mesh position={[0, 0, 0.05]}>
               <planeGeometry args={[1.8, 1.3]} />
               <meshStandardMaterial color="#8899aa" roughness={0.4} transparent opacity={0.6} />
             </mesh>
             {/* Gitterstäbe */}
             <mesh position={[0, 0, 0.06]}>
                <boxGeometry args={[0.05, 1.3, 0.05]} />
                <meshStandardMaterial color="#000" />
             </mesh>
             <mesh position={[0, 0, 0.06]}>
                <boxGeometry args={[1.8, 0.05, 0.05]} />
                <meshStandardMaterial color="#000" />
             </mesh>
          </group>
        )
      })}
      
      {/* Fußleiste (Schmutzrand unten) */}
      <mesh position={[0, -3.4, 0.26]}>
        <boxGeometry args={[width, 0.4, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" roughness={1} />
      </mesh>
    </group>
  )
}

function RoofTruss({ position, width }) {
  // Dreieckige Dachkonstruktion
  return (
    <group position={position}>
      {/* Unterzug (Horizontal) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[width, 0.2, 0.2]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.6} roughness={0.7} />
      </mesh>
      {/* Schrägen (Dachneigung) */}
      <mesh position={[-width/4, 1.5, 0]} rotation={[0, 0, 0.25]}>
        <boxGeometry args={[width/1.9, 0.15, 0.15]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.6} />
      </mesh>
      <mesh position={[width/4, 1.5, 0]} rotation={[0, 0, -0.25]}>
        <boxGeometry args={[width/1.9, 0.15, 0.15]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.6} />
      </mesh>
      {/* Vertikale Stützen */}
      <mesh position={[0, 1.5, 0]}>
         <boxGeometry args={[0.1, 3, 0.1]} />
         <meshStandardMaterial color="#2a2a2a" />
      </mesh>
    </group>
  )
}

function RustyPipes() {
  return (
    <group>
      {/* Langes Rohr an der Rückwand */}
      <mesh position={[0, 5, -9.5]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.15, 0.15, 24, 8]} />
        <meshStandardMaterial color="#5a3a2a" roughness={0.6} />
      </mesh>
      
      {/* Rohrverbinder */}
      {[-5, 0, 5].map((x, i) => (
        <mesh key={i} position={[x, 5, -9.5]}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial color="#4a2a1a" />
        </mesh>
      ))}

      {/* Lüftungsschacht links oben */}
      <mesh position={[-11, 5.5, 0]} rotation={[0, Math.PI/2, 0]}>
         <boxGeometry args={[20, 0.8, 0.8]} />
         <meshStandardMaterial color="#444" metalness={0.5} />
      </mesh>
    </group>
  )
}


// ==================== REST (REGALE, STAPLER ETC.) ====================
// (Bleibt weitgehend gleich, nur integriert in die neue Struktur)

// ==================== INSTANCED SHELF SYSTEM ====================
// Wiederverwendbare Geometrien für Instancing
const shelfPostGeometry = new THREE.BoxGeometry(0.08, 4, 0.08)
const shelfBraceGeometry = new THREE.BoxGeometry(2.5, 0.05, 0.05)
const shelfBoardGeometry = new THREE.BoxGeometry(2.5, 0.05, 0.8)
const boxGeometry = new THREE.BoxGeometry(0.4, 0.3, 0.35)

const shelfPostMaterial = new THREE.MeshStandardMaterial({ color: '#6b5c4a', roughness: 0.9, metalness: 0.3 })
const shelfBraceMaterial = new THREE.MeshStandardMaterial({ color: '#5a4d3a', roughness: 0.9 })
const shelfBoardMaterial = new THREE.MeshStandardMaterial({ color: '#7a6b5a', roughness: 0.85 })
const boxMaterial = new THREE.MeshStandardMaterial({ color: '#8b7355', roughness: 0.85 })

function InstancedShelfSystem() {
  const { posts, braces, boards, boxes } = useMemo(() => {
    const posts = []
    const braces = []
    const boards = []
    const boxes = []

    // Regal-Definitionen: position, lean, items
    const shelves = [
      { pos: [-7, 0, -4], lean: 0.03, items: [[-0.5, 0.55, 0], [0.4, 0.55, 0], [0, 2.55, 0]] },
      { pos: [-7, 0, 0], lean: -0.02, items: [[0, 0.55, 0]] },
      { pos: [-7, 0, 4], lean: 0.04, items: [] },
      { pos: [7, 0, -4], lean: -0.04, items: [[-0.3, 0.55, 0], [0, 1.55, 0]] },
      { pos: [7, 0, 0], lean: 0.02, items: [[0.2, 0.55, 0]] },
      { pos: [7, 0, 4], lean: -0.03, items: [] },
      { pos: [0, 0, -5], lean: 0.02, items: [[-0.4, 0.55, 0], [0, 1.55, 0]] },
    ]

    shelves.forEach(shelf => {
      const [px, py, pz] = shelf.pos
      const lean = shelf.lean

      // Pfosten (2 pro Regal)
      ;[-1.2, 1.2].forEach(x => {
        posts.push({ pos: [px + x, py + 2, pz], rot: [0, 0, lean] })
      })

      // Querstreben (4 pro Regal)
      ;[0.5, 1.5, 2.5, 3.5].forEach(y => {
        braces.push({ pos: [px, py + y, pz - 0.35], rot: [0, 0, lean] })
      })

      // Regalböden (4 pro Regal)
      ;[0.3, 1.3, 2.3, 3.3].forEach(y => {
        boards.push({ pos: [px, py + y, pz], rot: [0, 0, lean] })
      })

      // Pakete auf dem Regal
      shelf.items.forEach(item => {
        boxes.push({ pos: [px + item[0], py + item[1], pz + item[2]], rot: [0, 0, lean] })
      })
    })

    return { posts, braces, boards, boxes }
  }, [])

  return (
    <group>
      {/* INSTANCED: Regal-Pfosten */}
      <Instances geometry={shelfPostGeometry} material={shelfPostMaterial}>
        {posts.map((data, i) => (
          <Instance key={i} position={data.pos} rotation={data.rot} />
        ))}
      </Instances>

      {/* INSTANCED: Querstreben */}
      <Instances geometry={shelfBraceGeometry} material={shelfBraceMaterial}>
        {braces.map((data, i) => (
          <Instance key={i} position={data.pos} rotation={data.rot} />
        ))}
      </Instances>

      {/* INSTANCED: Regalböden */}
      <Instances geometry={shelfBoardGeometry} material={shelfBoardMaterial}>
        {boards.map((data, i) => (
          <Instance key={i} position={data.pos} rotation={data.rot} />
        ))}
      </Instances>

      {/* INSTANCED: Pakete */}
      <Instances geometry={boxGeometry} material={boxMaterial}>
        {boxes.map((data, i) => (
          <Instance key={i} position={data.pos} rotation={data.rot} />
        ))}
      </Instances>
    </group>
  )
}

function OldForklift({ position, rotation = [0, 0, 0], broken = false }) {
  const tiltRotation = broken ? [0.1, rotation[1], 0.15] : rotation
  return (
    <group position={position} rotation={tiltRotation}>
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[1, 0.6, 1.5]} />
        <meshStandardMaterial color={broken ? "#8b4513" : "#e8a000"} roughness={0.7} />
      </mesh>
      <mesh position={[0, 1, -0.2]}>
        <boxGeometry args={[0.9, 0.7, 0.8]} />
        <meshStandardMaterial color={broken ? "#6b4010" : "#cc8800"} roughness={0.6} />
      </mesh>
      <mesh position={[0, 1.5, -0.2]}>
        <boxGeometry args={[1, 0.08, 1]} />
        <meshStandardMaterial color="#3a3a3a" metalness={0.5} />
      </mesh>
      <mesh position={[0, 1.2, 0.7]}><boxGeometry args={[0.1, 2.2, 0.1]} /><meshStandardMaterial color="#4a4a4a" /></mesh>
      <mesh position={[0.35, 1.2, 0.7]}><boxGeometry args={[0.1, 2.2, 0.1]} /><meshStandardMaterial color="#4a4a4a" /></mesh>
      <mesh position={[-0.35, 1.2, 0.7]}><boxGeometry args={[0.1, 2.2, 0.1]} /><meshStandardMaterial color="#4a4a4a" /></mesh>
      
      {/* Räder */}
      {[[-0.45, 0.6], [-0.45, -0.5], [0.45, 0.6], [0.45, -0.5]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.18, z]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.18, 0.18, 0.12, 16]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
        </mesh>
      ))}
    </group>
  )
}

function Pallet({ position, rotation = [0, 0, 0], hasLoad = true, loadHeight = 0.4 }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.07, 0]}>
        <boxGeometry args={[1.2, 0.14, 1]} />
        <meshStandardMaterial color="#8b6914" roughness={0.9} />
      </mesh>
      {hasLoad && (
        <mesh position={[0, 0.14 + loadHeight / 2, 0]}>
          <boxGeometry args={[1, loadHeight, 0.8]} />
          <meshStandardMaterial color="#7a6555" roughness={0.8} />
        </mesh>
      )}
    </group>
  )
}

function PalletStacks() {
  return (
    <group>
      <Pallet position={[-3, 0, 2]} rotation={[0, 0.1, 0]} loadHeight={0.5} />
      <Pallet position={[-2, 0, 3]} rotation={[0, -0.15, 0]} loadHeight={0.3} />
      <Pallet position={[2, 0, 3]} rotation={[0, 0.05, 0]} loadHeight={0.6} />
      <Pallet position={[0, 0, 4]} rotation={[0, -0.1, 0]} loadHeight={0.45} />
      <Pallet position={[-3, 0, -2]} loadHeight={0.5} />
      <Pallet position={[-3, 0.65, -2]} loadHeight={0.4} />
      <Pallet position={[3, 0, -2]} loadHeight={0.45} />
    </group>
  )
}

// Wiederverwendbare Geometrie für verstreute Objekte
const scatteredBoxGeometry = new THREE.BoxGeometry(0.3, 0.2, 0.3)
const scatteredBoxMaterial = new THREE.MeshStandardMaterial({ color: '#7a6048', roughness: 0.85 })

function ScatteredItems() {
  const items = useMemo(() => {
    const result = []
    // Reduziert von 12 auf 8 für bessere Performance
    for (let i = 0; i < 8; i++) {
      result.push({
        pos: [(Math.random() - 0.5) * 16, Math.random() * 0.05, (Math.random() - 0.5) * 12],
        rot: [Math.random() * 0.1, Math.random() * Math.PI, Math.random() * 0.1],
      })
    }
    return result
  }, [])

  return (
    <group>
      {/* INSTANCED: Verstreute Pakete */}
      <Instances geometry={scatteredBoxGeometry} material={scatteredBoxMaterial}>
        {items.map((item, i) => (
          <Instance key={i} position={item.pos} rotation={item.rot} />
        ))}
      </Instances>

      {/* Einzelnes Fass (bleibt als einzelnes Mesh) */}
      <mesh position={[5, 0.25, 1]} rotation={[Math.PI / 2, 0, 0.3]}>
        <cylinderGeometry args={[0.25, 0.25, 0.6, 8]} />
        <meshStandardMaterial color="#3a5a3a" roughness={0.7} />
      </mesh>
    </group>
  )
}

function WarningSigns() {
  return (
    <group>
      <group position={[-11.8, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <planeGeometry args={[0.6, 0.6]} />
          <meshStandardMaterial color="#cc9900" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[0.4, 0.4]} />
          <meshBasicMaterial color="#1a1a1a" transparent opacity={0.5} />
        </mesh>
      </group>
      <group position={[-7, 2.8, -7.8]}>
        <mesh>
          <planeGeometry args={[0.5, 0.25]} />
          <meshBasicMaterial color="#22c55e" />
        </mesh>
      </group>
    </group>
  )
}

// ==================== HAUPTEXPORT ====================

export default function OldWarehouse({ scrollProgress }) {
  return (
    <group>
      <WarehouseAtmosphere />
      <WarehouseStructure />

      {/* OPTIMIERT: Instanced Regalsystem statt einzelner Meshes */}
      <InstancedShelfSystem />
      <OldForklift position={[-2, 0, 1]} rotation={[0, 0.3, 0]} />
      <OldForklift position={[4, 0, -1]} rotation={[0, -0.5, 0]} broken={true} />

      <PalletStacks />
      <ScatteredItems />
      <WarningSigns />
    </group>
  )
}