import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Sparkles, Float } from '@react-three/drei'
import * as THREE from 'three'

/**
 * FINAL SIMPLE TRANSITION GATE
 * Ein sauberer Scanner, der den Übergang markiert.
 */

export default function TransitionGate({ scrollProgress }) {
  const scannerRef = useRef()
  const WIDTH = 6
  const HEIGHT = 4.5

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    // Scanner-Balken bewegt sich hoch und runter
    if (scannerRef.current) {
      scannerRef.current.position.y = Math.sin(t * 1.5) * 1.8
    }
  })

  return (
    <group position={[0, 2.5, 0]}> {/* Positioniert auf Augenhöhe */}
      
      {/* 1. DER RAHMEN */}
      <GlowingFrame width={WIDTH} height={HEIGHT} color="#00dcb4" />

      {/* 2. DER SCANNER (Laser-Balken) */}
      <group ref={scannerRef}>
        <mesh>
          <boxGeometry args={[WIDTH - 0.4, 0.05, 0.05]} />
          <meshBasicMaterial color="#ff0055" toneMapped={false} />
        </mesh>
        {/* Laser-Schleier */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[WIDTH - 0.5, 0.5]} />
          <meshBasicMaterial 
            color="#ff0055" 
            transparent 
            opacity={0.15} 
            side={THREE.DoubleSide} 
          />
        </mesh>
      </group>

      {/* 3. PARTIKEL (Datenstrom) */}
      <Sparkles 
        count={60}
        scale={[WIDTH - 1, HEIGHT - 1, 2]} 
        size={6}
        speed={0.8}
        opacity={0.5}
        color="#00dcb4"
      />

      {/* 4. SCHWEBENDER TEXT */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        <group position={[0, HEIGHT / 2 + 0.8, 0]}>
          <mesh>
            <boxGeometry args={[2.5, 0.5, 0.1]} />
            <meshStandardMaterial color="#111" />
          </mesh>
          <Text
            position={[0, 0, 0.07]}
            fontSize={0.2}
            color="#00dcb4"
            anchorX="center"
            anchorY="middle"
          >
            SECTOR B: SMART LAB
          </Text>
        </group>
      </Float>

      {/* 5. LICHTQUELLE */}
      <pointLight 
        color="#00dcb4" 
        intensity={2} 
        distance={8} 
        decay={2} 
      />
    </group>
  )
}

// Rahmen-Helper
function GlowingFrame({ width, height, thickness = 0.3, color }) {
  const frameMat = new THREE.MeshStandardMaterial({
      color: '#1a1a1a',
      emissive: color,
      emissiveIntensity: 2,
      toneMapped: false
  })
  return (
    <group>
      <mesh position={[0, height / 2, 0]} material={frameMat}><boxGeometry args={[width, thickness, thickness]} /></mesh>
      <mesh position={[0, -height / 2, 0]} material={frameMat}><boxGeometry args={[width, thickness, thickness]} /></mesh>
      <mesh position={[-width / 2, 0, 0]} material={frameMat}><boxGeometry args={[thickness, height, thickness]} /></mesh>
      <mesh position={[width / 2, 0, 0]} material={frameMat}><boxGeometry args={[thickness, height, thickness]} /></mesh>
    </group>
  )
}