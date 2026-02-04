import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Amazon Zone - Left side of warehouse
 * Orange branding, Prime-style packages
 */

// Amazon-Style Paket
function AmazonBox({ position, size = [0.4, 0.3, 0.35] }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color="#8B7355" roughness={0.8} />
      </mesh>
      {/* Amazon Smile Tape (vereinfacht als Streifen) */}
      <mesh position={[0, 0, size[2]/2 + 0.001]}>
        <planeGeometry args={[size[0] * 0.8, 0.05]} />
        <meshBasicMaterial color="#ff9900" />
      </mesh>
    </group>
  )
}

// Elektrisches Lieferfahrzeug (vereinfacht)
function ElectricVan({ position }) {
  return (
    <group position={position}>
      {/* Karosserie */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[0.8, 0.5, 1.5]} />
        <meshStandardMaterial color="#232f3e" metalness={0.6} roughness={0.4} />
      </mesh>
      
      {/* Kabine */}
      <mesh position={[0, 0.55, 0.6]}>
        <boxGeometry args={[0.75, 0.35, 0.4]} />
        <meshStandardMaterial color="#232f3e" metalness={0.6} roughness={0.4} />
      </mesh>
      
      {/* Windschutzscheibe */}
      <mesh position={[0, 0.55, 0.81]}>
        <planeGeometry args={[0.6, 0.25]} />
        <meshStandardMaterial color="#1a1a24" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Räder */}
      {[[0.35, 0.5], [0.35, -0.5], [-0.35, 0.5], [-0.35, -0.5]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.12, z]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.12, 0.12, 0.08, 16]} />
          <meshStandardMaterial color="#1a1a24" />
        </mesh>
      ))}
      
      {/* Amazon Logo (vereinfacht - orangener Streifen) */}
      <mesh position={[0.401, 0.4, 0]}>
        <planeGeometry args={[0.1, 1.2]} />
        <meshBasicMaterial color="#ff9900" />
      </mesh>
      <mesh position={[-0.401, 0.4, 0]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[0.1, 1.2]} />
        <meshBasicMaterial color="#ff9900" />
      </mesh>
    </group>
  )
}

// Climate Pledge Friendly Badge
function ClimateBadge({ position }) {
  const ref = useRef()
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <Float speed={1.5} floatIntensity={0.3}>
      <group position={position} ref={ref}>
        {/* Badge Hintergrund */}
        <mesh>
          <circleGeometry args={[0.25, 32]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
        
        {/* Innerer Ring */}
        <mesh position={[0, 0, 0.01]}>
          <ringGeometry args={[0.15, 0.2, 32]} />
          <meshBasicMaterial color="#064e3b" />
        </mesh>
        
        {/* Blatt-Symbol (vereinfacht) */}
        <mesh position={[0, 0, 0.02]}>
          <circleGeometry args={[0.08, 32]} />
          <meshBasicMaterial color="#34d399" />
        </mesh>
      </group>
    </Float>
  )
}

// KI-gestütztes Sortier-Terminal
function SortingTerminal({ position }) {
  const screenRef = useRef()
  
  useFrame((state) => {
    if (screenRef.current) {
      // Flackernder Bildschirm-Effekt
      screenRef.current.material.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 10) * 0.1
    }
  })

  return (
    <group position={position}>
      {/* Terminal Gehäuse */}
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[0.4, 1.2, 0.3]} />
        <meshStandardMaterial color="#1a1a24" metalness={0.5} />
      </mesh>
      
      {/* Bildschirm */}
      <mesh ref={screenRef} position={[0, 0.8, 0.16]}>
        <planeGeometry args={[0.3, 0.4]} />
        <meshStandardMaterial 
          color="#ff9900" 
          emissive="#ff9900" 
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Status LED */}
      <mesh position={[0.15, 0.4, 0.16]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial color="#10b981" />
      </mesh>
    </group>
  )
}

export default function AmazonZone({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* Boden-Markierung */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 4]} />
        <meshBasicMaterial color="#ff9900" transparent opacity={0.1} />
      </mesh>
      
      {/* Zone Border */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.8, 2, 4]} />
        <meshBasicMaterial color="#ff9900" transparent opacity={0.3} />
      </mesh>

      {/* Amazon Pakete */}
      <AmazonBox position={[-0.5, 0.15, 0.5]} />
      <AmazonBox position={[0.3, 0.15, 0.3]} size={[0.5, 0.35, 0.4]} />
      <AmazonBox position={[-0.3, 0.15, -0.4]} size={[0.35, 0.25, 0.3]} />
      <AmazonBox position={[0.5, 0.15, -0.5]} />
      <AmazonBox position={[0, 0.45, 0.4]} size={[0.3, 0.25, 0.3]} />

      {/* Elektrisches Lieferfahrzeug */}
      <ElectricVan position={[-1.5, 0, 1]} />

      {/* Climate Badge schwebend */}
      <ClimateBadge position={[0, 2.5, 0]} />

      {/* Sortier-Terminal */}
      <SortingTerminal position={[1.2, 0, -0.5]} />

      {/* Licht-Akzent */}
      <pointLight position={[0, 2, 0]} intensity={0.5} color="#ff9900" distance={5} />
    </group>
  )
}
