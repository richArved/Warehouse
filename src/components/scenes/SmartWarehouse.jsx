import React, { useMemo, useRef } from 'react'
import { Instances, Instance, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import AmazonZone from '../models/AmazonZone'
import DHLZone from '../models/DHLZone'

/**
 * OPTIMIZED SMART WAREHOUSE
 * Mit Instancing für Regale, Paletten, Kartons + Förderbänder + Gabelstapler
 */

// Model paths with base URL for GitHub Pages compatibility
const MODEL_PATH = {
  box: `${import.meta.env.BASE_URL}models/cardboard_box.glb`,
  shelf: `${import.meta.env.BASE_URL}models/warehouse_shelving_3_low_poly.glb`,
  pallet: `${import.meta.env.BASE_URL}models/wooden_pallet_low-poly.glb`,
  forklift: `${import.meta.env.BASE_URL}models/forklift_truck.glb`,
}

// Preload Models für bessere Performance
useGLTF.preload(MODEL_PATH.box)
useGLTF.preload(MODEL_PATH.shelf)
useGLTF.preload(MODEL_PATH.pallet)
useGLTF.preload(MODEL_PATH.forklift)

// ==================== MODERN WAREHOUSE ROOM (CODE) ====================
function ModernWarehouseRoom() {
  const WALL_COLOR = "#1a1a1a" 
  const FLOOR_COLOR = "#0a0a0a" 

  return (
    <group position={[0, 0, -5]}> 
      {/* BODEN */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} /> 
        <meshStandardMaterial color={FLOOR_COLOR} roughness={0.2} metalness={0.5} />
      </mesh>

      {/* SÄULEN */}
      {[-18, 18].map((xSide) => (
        <group key={xSide}>
          {[-20, -10, 0, 10, 20].map((zPos) => (
            <mesh key={zPos} position={[xSide, 5, zPos]} castShadow receiveShadow>
              <boxGeometry args={[1, 10, 1]} />
              <meshStandardMaterial color="#333" roughness={0.8} />
            </mesh>
          ))}
        </group>
      ))}

      {/* RÜCKWAND */}
      <mesh position={[0, 5, -25]}>
        <boxGeometry args={[60, 10, 1]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>

      {/* DECKEN-TRÄGER */}
      {[-20, -10, 0, 10, 20].map((zPos) => (
         <mesh key={zPos} position={[0, 9.5, zPos]}>
           <boxGeometry args={[40, 0.5, 0.5]} />
           <meshStandardMaterial color="#222" />
         </mesh>
      ))}
    </group>
  )
}

// ==================== LICHT (OPTIMIERT) ====================
function SmartLighting() {
  return (
    <group>
      <ambientLight intensity={0.4} color="#ffffff" />

      {/* Environment entfernt für bessere Performance */}
      {/* Ersetzt durch hemisphere light für bessere Ausleuchtung */}
      <hemisphereLight
        skyColor="#ffffff"
        groundColor="#444444"
        intensity={0.6}
      />

      <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow />

      {/* NEON RÖHREN */}
      {[-10, 0, 10].map((x, i) => (
        <group key={i} position={[x, 9, 0]}>
          <mesh rotation={[Math.PI/2, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 40]} />
            <meshBasicMaterial color="#00dcb4" toneMapped={false} />
          </mesh>
          <pointLight intensity={1} distance={20} color="#00dcb4" decay={2} />
        </group>
      ))}
    </group>
  )
}

// ==================== EXCLUSION ZONES ====================
// Bereiche, in denen keine Regale generiert werden (für Case Study Showrooms)
const EXCLUSION_ZONES = [
  // Amazon Zone (Links): X: -8 bis -4, Z: -9 bis -6
  { minX: -9, maxX: -3, minZ: -10, maxZ: -5 },
  // DHL Zone (Rechts): X: 4 bis 8, Z: -9 bis -6
  { minX: 3, maxX: 9, minZ: -10, maxZ: -5 }
]

function isInExclusionZone(x, z) {
  return EXCLUSION_ZONES.some(zone =>
    x >= zone.minX && x <= zone.maxX && z >= zone.minZ && z <= zone.maxZ
  )
}

// ==================== INSTANCED SHELVES ====================
function ShelfSystem() {
  // 1. ALLE MODELLE LADEN
  // Kartons
  const { nodes: boxNodes, materials: boxMaterials } = useGLTF(MODEL_PATH.box)
  // Regale
  const { nodes: rackNodes, materials: rackMaterials } = useGLTF(MODEL_PATH.shelf)
  // Paletten
  const { nodes: palletNodes, materials: palletMaterials } = useGLTF(MODEL_PATH.pallet)

  const { racks, goods, pallets } = useMemo(() => {
    const racks = []
    const goods = []
    const pallets = []

    const rows = [
      { x: -14 }, { x: -11 }, { x: -8 },
      { x: 8 }, { x: 11 }, { x: 14 },
      { x: -8, zOffset: -2, color: '#ff9900' },
      { x: -4, zOffset: -2, color: '#ff9900' },
      { x: 4, zOffset: -2, color: '#ffcc00' },
      { x: 8, zOffset: -2, color: '#ffcc00' }
    ]

    const mainZPositions = [-15, -12, -9, -6, -3, 0, 3]

    rows.forEach(row => {
      const zPositions = row.zOffset !== undefined ? [row.zOffset] : mainZPositions
      const levels = 4
      const width = 2.8
      const shelfColor = row.color || '#4080c0'

      zPositions.forEach(z => {
        const posX = row.x
        const posZ = z

        // Überspringe Regale in Exclusion Zones (Showroom-Bereiche)
        if (isInExclusionZone(posX, posZ)) return

        // --- REGAL ---
        racks.push({
          pos: [posX, 0, posZ], 
          scale: [1.0, 1.0, 1.4],
          color: shelfColor
        })

        // --- INHALT ---
        for (let i = 0; i < levels; i++) {
          const y = 0.5 + i * 0.9 

          const numItems = 2 + Math.floor(Math.random() * 2)
          const spacing = (width - 0.5) / numItems
          
          for (let k = 0; k < numItems; k++) {
            const itemX = -width/2 + 0.4 + k * spacing
            
            // PALETTE EINSTELLUNGEN
            pallets.push({
               pos: [posX + itemX, y, posZ],
               scale: [0.015, 0.015, 0.015],
               rotation: [-Math.PI / 2, 0, 0]
            })

            // PAKET EINSTELLUNGEN
            const SCALE_FACTOR = 0.014;
            const LIFT_UP = 0.15; 
            
            const height = 0.25 + Math.random() * 0.35
            const itemWidth = 0.5 + Math.random() * 0.3
            const itemDepth = 0.6
            // color Variable wird hier nicht genutzt da wir Textur haben, aber für Logik ok
            
            goods.push({
              pos: [posX + itemX, y + LIFT_UP, posZ],
              scale: [itemWidth * SCALE_FACTOR, height * SCALE_FACTOR, itemDepth * SCALE_FACTOR],
            })
          }
        }
      })
    })

    return { racks, goods, pallets }
  }, [])

  return (
    <group>
      {/* BATCH 1: REGALE */}
      <Instances 
        range={racks.length}
        // FIX: Wir nutzen rackNodes (nicht nodes) und prüfen sicher auf Object_4
        geometry={rackNodes.Object_4 ? rackNodes.Object_4.geometry : Object.values(rackNodes).find(n => n.isMesh)?.geometry}      
        // FIX: Wir nutzen rackMaterials (nicht materials)
        material={rackMaterials.Scaffalatura || Object.values(rackMaterials)[0]}          
      >
        {racks.map((data, i) => (
          <Instance key={i} position={data.pos} scale={data.scale} color={data.color} />
        ))}
      </Instances>

      {/* BATCH 2: PALETTEN */}
      <Instances 
        range={pallets.length}
        geometry={palletNodes.pallet_pallet_0.geometry} 
        material={palletMaterials.pallet}               
      >
        {pallets.map((data, i) => (
          <Instance 
            key={i} 
            position={data.pos} 
            rotation={data.rotation}
            scale={data.scale}
          />
        ))}
      </Instances>

      {/* BATCH 3: WAREN */}
      <Instances 
        range={goods.length}
        geometry={boxNodes.CardboardBox_LP_lambert1_0.geometry}   
        material={boxMaterials.lambert1}     
      >
        {goods.map((data, i) => (
          <Instance key={i} position={data.pos} scale={data.scale} />
        ))}
      </Instances>
    </group>
  )
}

// ==================== FÖRDERBAND ====================
function ConveyorBelt({ 
  position, 
  length = 7, 
  rotation = [0, 0, 0],
  width = 1.5,
  beltColor = "#111111",
  frameColor = "#ffcc00" 
}) {
  const packagesRef = useRef()
  const frameCount = useRef(0)
  const sideOffset = width / 2 - 0.05

  // --- EINSTELLUNG: ANZAHL DER PAKETE ---
  const PACKAGE_COUNT = 6

  // 1. Modell laden
  const { nodes, materials } = useGLTF(MODEL_PATH.box)

  const boxGeometry = nodes.CardboardBox_LP_lambert1_0?.geometry || Object.values(nodes).find(n => n.isMesh)?.geometry
  const boxMaterial = materials.lambert1 || Object.values(materials)[0]
  const BOX_SCALE = 0.02

  useFrame(({ clock }) => {
    // Frame-Throttling: nur jeden 2. Frame updaten
    frameCount.current++
    if (frameCount.current % 2 !== 0) return

    if (packagesRef.current) {
      const t = clock.getElapsedTime() * 1.5 // Geschwindigkeit des Bandes

      // WICHTIG: Abstand automatisch berechnen
      // Wir teilen die Gesamtlänge durch die Anzahl, damit sie gleichmäßig verteilt sind
      const spacing = length / PACKAGE_COUNT

      packagesRef.current.children.forEach((child, i) => {
        // Position berechnen
        const offset = (t + i * spacing) % length

        child.position.x = -length / 2 + offset

        // Unsichtbar machen am Ende (Verschwinden lassen)
        const isVisible = offset <= length - 0.5 && offset >= 0.5
        const baseScale = boxGeometry ? BOX_SCALE : 1
        child.scale.setScalar(isVisible ? baseScale : 0)
      })
    }
  })

  return (
    <group position={position} rotation={rotation}>
      
      {/* --- RAHMEN & BAND (Bleibt gleich) --- */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[length, 0.1, width]} />
        <meshStandardMaterial color="#3a3a3a" metalness={0.6} />
      </mesh>
      
      <mesh position={[0, 0.6, sideOffset]}>
        <boxGeometry args={[length, 0.15, 0.05]} />
        <meshStandardMaterial color={frameColor} />
      </mesh>
      <mesh position={[0, 0.6, -sideOffset]}>
        <boxGeometry args={[length, 0.15, 0.05]} />
        <meshStandardMaterial color={frameColor} />
      </mesh>
      
      <mesh position={[0, 0.56, 0]}>
        <boxGeometry args={[length - 0.1, 0.02, width - 0.2]} />
        <meshStandardMaterial color={beltColor} roughness={0.8} />
      </mesh>
      
      {/* Stützen */}
      {Array.from({ length: Math.floor(length / 2) + 1 }, (_, i) => (
        <mesh key={i} position={[-length/2 + i * 2, 0.25, 0]}>
          <boxGeometry args={[0.1, 0.5, width - 0.2]} />
          <meshStandardMaterial color="#4a4a4a" />
        </mesh>
      ))}
      
      {/* --- DIE PAKETE --- */}
      <group ref={packagesRef} position={[0, 0.75, 0]}>
        {/* Hier nutzen wir jetzt PACKAGE_COUNT statt fest 15 */}
        {Array.from({ length: PACKAGE_COUNT }).map((_, i) => (
          <mesh key={i} castShadow>
             {boxGeometry ? (
               <>
                 <primitive object={boxGeometry} attach="geometry" />
                 <primitive object={boxMaterial} attach="material" />
               </>
             ) : (
               <>
                 <boxGeometry args={[0.5, 0.35, 0.4]} />
                 <meshStandardMaterial color="orange" />
               </>
             )}
          </mesh>
        ))}
      </group>
    </group>
  )
}
// ==================== GABELSTAPLER ====================
function SmartForklift({ position, rotation = [0, 0, 0] }) {
  const { scene } = useGLTF(MODEL_PATH.forklift)
  const clone = useMemo(() => scene.clone(), [scene])

  return (
    <group position={position} rotation={rotation}>
      <primitive
        object={clone}
        scale={[1, 1, 1]}
      />
    </group>
  )
}

// ==================== INDUSTRIEWAAGE (Balance/Nachhaltigkeit) ====================
function IndustrialScale({ position = [0, 0, 0] }) {
  const scaleRef = useRef()
  const leftPanRef = useRef()
  const rightPanRef = useRef()

  // Sanftes Wippen der Waage
  useFrame(({ clock }) => {
    if (scaleRef.current) {
      const t = clock.getElapsedTime()
      scaleRef.current.rotation.z = Math.sin(t * 0.5) * 0.02
    }
    if (leftPanRef.current && rightPanRef.current) {
      const t = clock.getElapsedTime()
      leftPanRef.current.position.y = 1.8 + Math.sin(t * 0.5) * 0.05
      rightPanRef.current.position.y = 1.8 - Math.sin(t * 0.5) * 0.05
    }
  })

  // Wiederverwendbare Geometrien
  const baseGeometry = useMemo(() => new THREE.CylinderGeometry(1.2, 1.5, 0.3, 32), [])
  const pillarGeometry = useMemo(() => new THREE.CylinderGeometry(0.15, 0.2, 3, 16), [])
  const beamGeometry = useMemo(() => new THREE.BoxGeometry(4, 0.15, 0.15), [])
  const panGeometry = useMemo(() => new THREE.CylinderGeometry(0.8, 0.8, 0.1, 24), [])
  const chainGeometry = useMemo(() => new THREE.CylinderGeometry(0.02, 0.02, 0.6, 8), [])

  return (
    <group position={position}>
      {/* Basis/Sockel */}
      <mesh geometry={baseGeometry} position={[0, 0.15, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Mittelsäule */}
      <mesh geometry={pillarGeometry} position={[0, 1.65, 0]} castShadow>
        <meshStandardMaterial color="#4a4a4a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Drehpunkt-Kugel */}
      <mesh position={[0, 3.2, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.3} metalness={0.9} />
      </mesh>

      {/* Waagebalken (rotiert) */}
      <group ref={scaleRef} position={[0, 3.2, 0]}>
        <mesh geometry={beamGeometry} castShadow>
          <meshStandardMaterial color="#3a3a3a" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Linke Ketten */}
        {[-0.2, 0.2].map((z, i) => (
          <mesh key={`left-${i}`} geometry={chainGeometry} position={[-1.8, -0.35, z]}>
            <meshStandardMaterial color="#666" metalness={0.8} />
          </mesh>
        ))}

        {/* Rechte Ketten */}
        {[-0.2, 0.2].map((z, i) => (
          <mesh key={`right-${i}`} geometry={chainGeometry} position={[1.8, -0.35, z]}>
            <meshStandardMaterial color="#666" metalness={0.8} />
          </mesh>
        ))}
      </group>

      {/* Linke Waagschale mit Paket (Ökonomie) */}
      <group ref={leftPanRef} position={[-1.8, 1.8, 0]}>
        <mesh geometry={panGeometry} castShadow receiveShadow>
          <meshStandardMaterial color="#3a3a3a" metalness={0.6} roughness={0.4} />
        </mesh>
        {/* Paket auf der Waagschale */}
        <mesh position={[0, 0.25, 0]} castShadow>
          <boxGeometry args={[0.5, 0.4, 0.4]} />
          <meshStandardMaterial color="#ff9900" roughness={0.7} />
        </mesh>
        {/* Münzen/Geld Symbol */}
        <mesh position={[0, 0.55, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.05, 16]} />
          <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* Rechte Waagschale mit Blatt (Ökologie) */}
      <group ref={rightPanRef} position={[1.8, 1.8, 0]}>
        <mesh geometry={panGeometry} castShadow receiveShadow>
          <meshStandardMaterial color="#3a3a3a" metalness={0.6} roughness={0.4} />
        </mesh>
        {/* Grüne Kugel/Erde */}
        <mesh position={[0, 0.35, 0]} castShadow>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.2} roughness={0.6} />
        </mesh>
        {/* Blatt-Symbol (stilisiert) */}
        <mesh position={[0, 0.7, 0]} rotation={[0, 0, Math.PI / 4]}>
          <coneGeometry args={[0.15, 0.4, 4]} />
          <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.3} />
        </mesh>
      </group>

      {/* Leuchtender Ring um die Basis */}
      <mesh position={[0, 0.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.3, 0.05, 8, 32]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.6} />
      </mesh>

      {/* Spotlight auf die Waage */}
      <spotLight
        position={[0, 6, 2]}
        target-position={[0, 2, 0]}
        angle={0.4}
        penumbra={0.5}
        intensity={2}
        color="#ffffff"
        castShadow={false}
      />
    </group>
  )
}

// ==================== FORSCHUNGSLÜCKE (Reflexion) ====================
function ResearchGap({ position = [0, 0, 0] }) {
  const questionRef = useRef()
  const signRef = useRef()

  // Animation: Schwebendes Fragezeichen + Rotation
  useFrame(({ clock }) => {
    if (questionRef.current) {
      const t = clock.getElapsedTime()
      questionRef.current.position.y = 3 + Math.sin(t * 0.8) * 0.3
      questionRef.current.rotation.y = t * 0.3
    }
    if (signRef.current) {
      const t = clock.getElapsedTime()
      signRef.current.rotation.y = Math.sin(t * 0.5) * 0.1
    }
  })

  return (
    <group position={position}>
      {/* Schwebende Fragezeichen-Konstruktion */}
      <group ref={questionRef} position={[0, 3, 0]}>
        {/* Fragezeichen aus Torus + Kugel */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.6, 0.15, 16, 32, Math.PI * 1.5]} />
          <meshStandardMaterial
            color="#ff9900"
            emissive="#ff9900"
            emissiveIntensity={0.5}
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>
        {/* Strich des Fragezeichens */}
        <mesh position={[0.6, -0.4, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.5, 16]} />
          <meshStandardMaterial color="#ff9900" emissive="#ff9900" emissiveIntensity={0.5} />
        </mesh>
        {/* Punkt des Fragezeichens */}
        <mesh position={[0.6, -0.9, 0]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#ff9900" emissive="#ff9900" emissiveIntensity={0.5} />
        </mesh>

        {/* Leuchtring um das Fragezeichen */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.2, 0.03, 8, 32]} />
          <meshBasicMaterial color="#ff9900" transparent opacity={0.4} />
        </mesh>
      </group>

      {/* "Under Construction" Schild */}
      <group ref={signRef} position={[0, 1.5, 0]}>
        {/* Schild-Pfosten */}
        <mesh position={[0, -0.75, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 1.5, 8]} />
          <meshStandardMaterial color="#666" metalness={0.7} />
        </mesh>
        {/* Schild-Tafel */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[1.8, 0.8, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
        {/* Gelbe Warnstreifen */}
        <mesh position={[0, 0.3, 0.06]}>
          <planeGeometry args={[1.7, 0.7]} />
          <meshBasicMaterial color="#ffcc00" />
        </mesh>
        {/* Schwarze Streifen (diagonal) */}
        {[-0.5, 0, 0.5].map((x, i) => (
          <mesh key={i} position={[x, 0.3, 0.07]} rotation={[0, 0, Math.PI / 4]}>
            <planeGeometry args={[0.15, 1.2]} />
            <meshBasicMaterial color="#1a1a1a" />
          </mesh>
        ))}
      </group>

      {/* Baustellen-Pylone */}
      {[[-1.2, 0, 0.8], [1.2, 0, 0.8], [-0.8, 0, -0.8], [0.8, 0, -0.8]].map((pos, i) => (
        <group key={i} position={pos}>
          <mesh position={[0, 0.35, 0]}>
            <coneGeometry args={[0.2, 0.7, 8]} />
            <meshStandardMaterial color="#ff6600" roughness={0.7} />
          </mesh>
          {/* Weiße Streifen */}
          <mesh position={[0, 0.25, 0]}>
            <torusGeometry args={[0.15, 0.03, 8, 16]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0, 0.45, 0]}>
            <torusGeometry args={[0.1, 0.03, 8, 16]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </group>
      ))}

      {/* Spotlight */}
      <spotLight
        position={[0, 8, 3]}
        target-position={[0, 2, 0]}
        angle={0.5}
        penumbra={0.6}
        intensity={3}
        color="#ff9900"
        castShadow={false}
      />
    </group>
  )
}

// ==================== EXPORT ====================
export default function SmartWarehouse({ scrollProgress }) {
  // const visible = scrollProgress > 0.25
  // if (!visible) return null

  return (
    <group>
      <SmartLighting />
      <ModernWarehouseRoom />
      
      {/* Optimiertes Regalsystem */}
      <ShelfSystem />
      
      {/* Gabelstapler */}
      <SmartForklift 
        position={[-4, 0, 1]}     
        rotation={[0, -0.5, 0]}   
      />
      <SmartForklift 
        position={[4, 0, -5]} 
        rotation={[0, Math.PI / 2, 0]} 
      />
      
{/* Das breite, farbige Hauptband */}
      <ConveyorBelt
        position={[0, 0, -5]}
        length={30}
        rotation={[0, Math.PI / 2, 0]}
        width={2}
        beltColor="#222222"
        frameColor="#ff9900"
      />

      {/* Case Study Showrooms */}
      {/* Amazon Zone - Links (E-Mobility / Climate Pledge) */}
      <AmazonZone position={[-6, 0, -7.5]} />

      {/* DHL Zone - Rechts (GoGreen) */}
      <DHLZone position={[6, 0, -7.5]} />

      {/* Balance/Nachhaltigkeit - Industriewaage bei Z = -10 (absolut: -30) */}
      <IndustrialScale position={[0, 0, -10]} />

      {/* Forschungslücke/Reflexion - bei Z = -18 (absolut: -38) */}
      <ResearchGap position={[0, 0, -18]} />
    </group>
  )
}