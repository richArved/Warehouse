import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * PLACEHOLDER: Warehouse Base Structure
 * 
 * Später ersetzen durch:
 * import { useGLTF } from '@react-three/drei'
 * const { scene } = useGLTF('/models/warehouse.glb')
 * return <primitive object={scene} />
 */

export default function WarehouseBase() {
  return (
    <group>
      {/* Warehouse Wände (Wireframe-Stil für Low-Poly Look) */}
      
      {/* Rückwand */}
      <mesh position={[0, 3, -8]}>
        <boxGeometry args={[20, 6, 0.2]} />
        <meshStandardMaterial 
          color="#2d3748" 
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>

      {/* Linke Wand */}
      <mesh position={[-10, 3, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[16, 6, 0.2]} />
        <meshStandardMaterial 
          color="#2d3748" 
          roughness={0.7}
          metalness={0.3}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Rechte Wand */}
      <mesh position={[10, 3, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[16, 6, 0.2]} />
        <meshStandardMaterial 
          color="#2d3748" 
          roughness={0.7}
          metalness={0.3}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Dachstruktur (Träger) */}
      {[-8, -4, 0, 4, 8].map((x, i) => (
        <mesh key={i} position={[x, 6, -4]}>
          <boxGeometry args={[0.3, 0.5, 16]} />
          <meshStandardMaterial color="#1a1a24" metalness={0.5} />
        </mesh>
      ))}

      {/* Boden-Markierungen (Logistik-Linien) */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.15, 14]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.5} />
      </mesh>
      <mesh position={[-3, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.1, 14]} />
        <meshBasicMaterial color="#ffcc00" transparent opacity={0.3} />
      </mesh>
      <mesh position={[3, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.1, 14]} />
        <meshBasicMaterial color="#ff9900" transparent opacity={0.3} />
      </mesh>
    </group>
  )
}
