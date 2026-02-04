import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

/**
 * DHL Zone - Right side of warehouse
 * Yellow/Red branding, GoGreen elements
 */

// DHL-Style Paket
function DHLBox({ position, size = [0.4, 0.3, 0.35] }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color="#ffcc00" roughness={0.6} />
      </mesh>
      {/* DHL Streifen */}
      <mesh position={[0, 0, size[2]/2 + 0.001]}>
        <planeGeometry args={[size[0], 0.08]} />
        <meshBasicMaterial color="#d40511" />
      </mesh>
    </group>
  )
}

// GoGreen Zertifizierungs-Display
function GoGreenDisplay({ position }) {
  const ref = useRef()
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <group position={position}>
      {/* Säule */}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.05, 0.08, 1.5, 8]} />
        <meshStandardMaterial color="#2d3748" metalness={0.6} />
      </mesh>
      
      {/* Rotierendes Display */}
      <group ref={ref} position={[0, 1.6, 0]}>
        {/* Hintergrund */}
        <mesh>
          <boxGeometry args={[0.5, 0.3, 0.05]} />
          <meshStandardMaterial color="#10b981" />
        </mesh>
        
        {/* "GoGreen" Text Placeholder */}
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[0.4, 0.15]} />
          <meshBasicMaterial color="#064e3b" />
        </mesh>
      </group>
      
      {/* Glowing Ring */}
      <mesh position={[0, 1.6, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.35, 0.02, 8, 32]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.6} />
      </mesh>
    </group>
  )
}

// Elektro-Transporter (DHL Style)
function DHLVan({ position }) {
  return (
    <group position={position}>
      {/* Karosserie */}
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[0.9, 0.6, 1.6]} />
        <meshStandardMaterial color="#ffcc00" roughness={0.5} />
      </mesh>
      
      {/* Kabine */}
      <mesh position={[0, 0.6, 0.65]}>
        <boxGeometry args={[0.85, 0.4, 0.45]} />
        <meshStandardMaterial color="#ffcc00" roughness={0.5} />
      </mesh>
      
      {/* DHL Streifen */}
      <mesh position={[0.451, 0.45, 0]}>
        <planeGeometry args={[0.2, 1.4]} />
        <meshBasicMaterial color="#d40511" />
      </mesh>
      <mesh position={[-0.451, 0.45, 0]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[0.2, 1.4]} />
        <meshBasicMaterial color="#d40511" />
      </mesh>
      
      {/* Räder */}
      {[[0.4, 0.55], [0.4, -0.55], [-0.4, 0.55], [-0.4, -0.55]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.12, z]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.12, 0.12, 0.08, 16]} />
          <meshStandardMaterial color="#1a1a24" />
        </mesh>
      ))}
      
      {/* E-Mobility Badge */}
      <mesh position={[0, 0.76, 0.88]}>
        <circleGeometry args={[0.08, 16]} />
        <meshBasicMaterial color="#10b981" />
      </mesh>
    </group>
  )
}

// CO2 Tracking Display
function CO2Display({ position }) {
  const screenRef = useRef()
  const valueRef = useRef(0)
  
  useFrame((state) => {
    if (screenRef.current) {
      // Pulsierender Bildschirm
      screenRef.current.material.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <group position={position}>
      {/* Monitor Ständer */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.03, 0.05, 1, 8]} />
        <meshStandardMaterial color="#2d3748" metalness={0.7} />
      </mesh>
      
      {/* Monitor */}
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[0.6, 0.4, 0.05]} />
        <meshStandardMaterial color="#1a1a24" />
      </mesh>
      
      {/* Bildschirm */}
      <mesh ref={screenRef} position={[0, 1.1, 0.03]}>
        <planeGeometry args={[0.55, 0.35]} />
        <meshStandardMaterial 
          color="#10b981" 
          emissive="#10b981" 
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* "CO2" Indikator */}
      <mesh position={[-0.15, 1.2, 0.04]}>
        <planeGeometry args={[0.15, 0.08]} />
        <meshBasicMaterial color="#064e3b" />
      </mesh>
      
      {/* Wert Anzeige */}
      <mesh position={[0.1, 1.05, 0.04]}>
        <planeGeometry args={[0.25, 0.12]} />
        <meshBasicMaterial color="#34d399" />
      </mesh>
    </group>
  )
}

// SAF (Sustainable Aviation Fuel) Container
function SAFContainer({ position }) {
  return (
    <group position={position}>
      {/* Container */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.6, 16]} />
        <meshStandardMaterial color="#10b981" metalness={0.4} roughness={0.6} />
      </mesh>
      
      {/* Label */}
      <mesh position={[0, 0.3, 0.201]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.15, 0.3]} />
        <meshBasicMaterial color="#064e3b" />
      </mesh>
      
      {/* Ventil oben */}
      <mesh position={[0, 0.65, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.1, 8]} />
        <meshStandardMaterial color="#2d3748" metalness={0.8} />
      </mesh>
    </group>
  )
}

// Nachhaltigkeit Metriken Panel
function MetricsPanel({ position }) {
  const ref = useRef()
  
  useFrame((state) => {
    if (ref.current) {
      // Sanftes Schweben
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.05
    }
  })

  return (
    <Float speed={1} floatIntensity={0.2}>
      <group position={position} ref={ref}>
        {/* Panel Hintergrund */}
        <mesh>
          <planeGeometry args={[0.8, 0.5]} />
          <meshStandardMaterial 
            color="#1a1a24" 
            transparent 
            opacity={0.9}
          />
        </mesh>
        
        {/* Border */}
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[0.85, 0.55]} />
          <meshBasicMaterial color="#ffcc00" transparent opacity={0.5} />
        </mesh>
        
        {/* Metriken Balken */}
        {[0.15, 0, -0.15].map((y, i) => (
          <group key={i}>
            <mesh position={[-0.2, y, 0.01]}>
              <planeGeometry args={[0.3, 0.08]} />
              <meshBasicMaterial color="#2d3748" />
            </mesh>
            <mesh position={[-0.25 + (i === 0 ? 0.12 : i === 1 ? 0.08 : 0.1), y, 0.02]}>
              <planeGeometry args={[i === 0 ? 0.24 : i === 1 ? 0.16 : 0.2, 0.06]} />
              <meshBasicMaterial color={i === 0 ? '#10b981' : i === 1 ? '#ffcc00' : '#3b82f6'} />
            </mesh>
          </group>
        ))}
      </group>
    </Float>
  )
}

export default function DHLZone({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* Boden-Markierung */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 4]} />
        <meshBasicMaterial color="#ffcc00" transparent opacity={0.1} />
      </mesh>
      
      {/* Zone Border */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.8, 2, 4]} />
        <meshBasicMaterial color="#ffcc00" transparent opacity={0.3} />
      </mesh>

      {/* DHL Pakete */}
      <DHLBox position={[-0.5, 0.15, 0.3]} />
      <DHLBox position={[0.4, 0.15, 0.5]} size={[0.45, 0.35, 0.4]} />
      <DHLBox position={[0, 0.15, -0.3]} size={[0.35, 0.25, 0.3]} />
      <DHLBox position={[-0.4, 0.15, -0.6]} />
      <DHLBox position={[0.3, 0.45, 0.4]} size={[0.3, 0.2, 0.25]} />

      {/* GoGreen Display */}
      <GoGreenDisplay position={[1.2, 0, 0.5]} />

      {/* DHL Elektro-Van */}
      <DHLVan position={[1.5, 0, -1]} />

      {/* CO2 Tracking Display */}
      <CO2Display position={[-1.2, 0, -0.3]} />

      {/* SAF Container */}
      <SAFContainer position={[-1, 0, 0.8]} />

      {/* Metriken Panel schwebend */}
      <MetricsPanel position={[0, 2.2, 0]} />

      {/* Licht-Akzent */}
      <pointLight position={[0, 2, 0]} intensity={0.5} color="#ffcc00" distance={5} />
    </group>
  )
}
