import React from 'react'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

/**
 * PLACEHOLDER: Warehouse Shelves with Boxes
 * 
 * Später ersetzen durch GLB Modelle
 */

// Einzelnes Regal
function Shelf({ position, boxes = [] }) {
  return (
    <group position={position}>
      {/* Regal-Struktur */}
      {/* Vertikale Streben */}
      {[-0.9, 0.9].map((x, i) => (
        <mesh key={`strut-${i}`} position={[x, 1.5, 0]}>
          <boxGeometry args={[0.1, 3, 0.1]} />
          <meshStandardMaterial color="#4a5568" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}
      
      {/* Regalböden */}
      {[0.5, 1.5, 2.5].map((y, i) => (
        <mesh key={`board-${i}`} position={[0, y, 0]}>
          <boxGeometry args={[2, 0.05, 0.8]} />
          <meshStandardMaterial color="#2d3748" metalness={0.3} />
        </mesh>
      ))}

      {/* Boxen auf den Regalen */}
      {boxes.map((box, i) => (
        <Box 
          key={i}
          position={box.position}
          color={box.color}
          size={box.size}
        />
      ))}
    </group>
  )
}

// Einzelne Box
function Box({ position, color = '#718096', size = [0.4, 0.3, 0.4] }) {
  return (
    <mesh position={position} castShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.6} />
    </mesh>
  )
}

export default function Shelves() {
  // Regal-Konfigurationen
  const shelfConfigs = [
    {
      position: [-6, 0, -4],
      boxes: [
        { position: [-0.4, 0.7, 0], color: '#ff9900', size: [0.5, 0.35, 0.4] },
        { position: [0.3, 0.7, 0], color: '#4299e1', size: [0.4, 0.3, 0.35] },
        { position: [-0.3, 1.7, 0], color: '#ffcc00', size: [0.45, 0.3, 0.4] },
        { position: [0.4, 1.7, 0], color: '#718096', size: [0.35, 0.35, 0.35] },
        { position: [0, 2.7, 0], color: '#10b981', size: [0.5, 0.3, 0.4] },
      ]
    },
    {
      position: [-6, 0, -1],
      boxes: [
        { position: [0, 0.7, 0], color: '#ff9900', size: [0.6, 0.35, 0.4] },
        { position: [-0.4, 1.7, 0], color: '#4299e1', size: [0.35, 0.3, 0.35] },
        { position: [0.3, 1.7, 0], color: '#ffcc00', size: [0.4, 0.35, 0.4] },
        { position: [0, 2.7, 0], color: '#718096', size: [0.45, 0.25, 0.4] },
      ]
    },
    {
      position: [6, 0, -4],
      boxes: [
        { position: [-0.3, 0.7, 0], color: '#ffcc00', size: [0.5, 0.3, 0.4] },
        { position: [0.4, 0.7, 0], color: '#ffcc00', size: [0.35, 0.35, 0.35] },
        { position: [0, 1.7, 0], color: '#ef4444', size: [0.55, 0.35, 0.4] },
        { position: [-0.4, 2.7, 0], color: '#ffcc00', size: [0.4, 0.3, 0.35] },
        { position: [0.3, 2.7, 0], color: '#718096', size: [0.35, 0.3, 0.4] },
      ]
    },
    {
      position: [6, 0, -1],
      boxes: [
        { position: [0.2, 0.7, 0], color: '#ffcc00', size: [0.45, 0.35, 0.4] },
        { position: [-0.35, 1.7, 0], color: '#ef4444', size: [0.4, 0.3, 0.4] },
        { position: [0.35, 1.7, 0], color: '#ffcc00', size: [0.35, 0.35, 0.35] },
        { position: [0, 2.7, 0], color: '#718096', size: [0.5, 0.25, 0.4] },
      ]
    },
    // Zentrale Regale
    {
      position: [0, 0, -6],
      boxes: [
        { position: [-0.4, 0.7, 0], color: '#00d4ff', size: [0.4, 0.35, 0.4] },
        { position: [0.4, 0.7, 0], color: '#10b981', size: [0.4, 0.3, 0.35] },
        { position: [0, 1.7, 0], color: '#00d4ff', size: [0.5, 0.35, 0.4] },
        { position: [-0.3, 2.7, 0], color: '#718096', size: [0.35, 0.3, 0.35] },
        { position: [0.3, 2.7, 0], color: '#00d4ff', size: [0.4, 0.3, 0.4] },
      ]
    },
  ]

  return (
    <group>
      {shelfConfigs.map((config, i) => (
        <Shelf key={i} {...config} />
      ))}
      
      {/* Paletten am Boden */}
      <Pallet position={[-2, 0, 2]} />
      <Pallet position={[2, 0, 2]} />
      <Pallet position={[0, 0, 3]} />
    </group>
  )
}

// Palette mit Boxen
function Pallet({ position }) {
  return (
    <group position={position}>
      {/* Palette Basis */}
      <mesh position={[0, 0.075, 0]}>
        <boxGeometry args={[1.2, 0.15, 1]} />
        <meshStandardMaterial color="#8B4513" roughness={0.9} />
      </mesh>
      
      {/* Boxen auf Palette */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[1, 0.5, 0.8]} />
        <meshStandardMaterial color="#718096" roughness={0.6} />
      </mesh>
      <mesh position={[-0.2, 0.85, 0.1]} castShadow>
        <boxGeometry args={[0.5, 0.4, 0.5]} />
        <meshStandardMaterial color="#4299e1" roughness={0.6} />
      </mesh>
    </group>
  )
}
