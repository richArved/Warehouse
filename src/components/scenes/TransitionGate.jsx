import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Sparkles, Float } from '@react-three/drei'
import * as THREE from 'three'

/**
 * FINAL SIMPLE TRANSITION GATE
 * Ein sauberer Scanner, der den Übergang markiert.
 * Research Terminal v2.0 (Kapitel 4 / Methodik) ist direkt hier am Gate platziert.
 */

// ==================== RESEARCH TERMINAL v2.0 (Kapitel 4 - Methodik) ====================
function ResearchTerminal({ position = [0, 0, 0] }) {
  const screenRef = useRef()
  const scanLineRef = useRef()

  useFrame(({ clock }) => {
    if (scanLineRef.current) {
      const t = clock.getElapsedTime()
      scanLineRef.current.position.y = 1.3 + Math.sin(t * 2) * 0.4
    }
    if (screenRef.current) {
      const t = clock.getElapsedTime()
      screenRef.current.material.emissiveIntensity = 0.8 + Math.sin(t * 10) * 0.1
    }
  })

  return (
    <group position={position}>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 1, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.1, 16]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh position={[0, 1.3, 0]}>
        <boxGeometry args={[1.2, 1.0, 0.3]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh ref={screenRef} position={[0, 1.3, 0.16]}>
        <planeGeometry args={[1.0, 0.8]} />
        <meshStandardMaterial color="#001020" emissive="#00d4ff" emissiveIntensity={0.8} />
      </mesh>
      <mesh ref={scanLineRef} position={[0, 1.3, 0.17]}>
        <planeGeometry args={[1.0, 0.02]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.8} />
      </mesh>
      <group position={[0, 1.5, 0.17]}>
        {[-0.3, -0.1, 0.1, 0.3].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]}>
            <boxGeometry args={[0.08, 0.15, 0.01]} />
            <meshBasicMaterial color="#10b981" />
          </mesh>
        ))}
      </group>
      <group position={[-0.3, 1.1, 0.17]}>
        {[0.6, 0.4, 0.8, 0.3, 0.7].map((h, i) => (
          <mesh key={i} position={[i * 0.15, h * 0.15, 0]}>
            <boxGeometry args={[0.1, h * 0.3, 0.01]} />
            <meshBasicMaterial color={i % 2 === 0 ? '#00d4ff' : '#10b981'} />
          </mesh>
        ))}
      </group>
      <mesh position={[0, 0.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.65, 0.03, 8, 32]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.6} />
      </mesh>
      <group position={[0, 2.2, 0]}>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.5} transparent opacity={0.6} wireframe />
        </mesh>
      </group>
      <spotLight position={[0, 4, 2]} angle={0.4} penumbra={0.5} intensity={2} color="#00d4ff" castShadow={false} />
    </group>
  )
}

export default function TransitionGate({ scrollProgress }) {
  const scannerRef = useRef()
  const WIDTH = 6
  const HEIGHT = 4.5

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (scannerRef.current) {
      scannerRef.current.position.y = Math.sin(t * 1.5) * 1.8
    }
  })

  return (
    <group position={[0, 2.5, 0]}>
      {/* 1. DER RAHMEN */}
      <GlowingFrame width={WIDTH} height={HEIGHT} color="#00dcb4" />

      {/* 2. DER SCANNER (Laser-Balken) */}
      <group ref={scannerRef}>
        <mesh>
          <boxGeometry args={[WIDTH - 0.4, 0.05, 0.05]} />
          <meshBasicMaterial color="#ff0055" toneMapped={false} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[WIDTH - 0.5, 0.5]} />
          <meshBasicMaterial color="#ff0055" transparent opacity={0.15} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* 3. PARTIKEL (Datenstrom) */}
      <Sparkles count={60} scale={[WIDTH - 1, HEIGHT - 1, 2]} size={6} speed={0.8} opacity={0.5} color="#00dcb4" />

      {/* 4. SCHWEBENDER TEXT */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        <group position={[0, HEIGHT / 2 + 0.8, 0]}>
          <mesh>
            <boxGeometry args={[2.5, 0.5, 0.1]} />
            <meshStandardMaterial color="#111" />
          </mesh>
          <Text position={[0, 0, 0.07]} fontSize={0.2} color="#00dcb4" anchorX="center" anchorY="middle">
            SECTOR B: SMART LAB
          </Text>
        </group>
      </Float>

      {/* 5. RESEARCH TERMINAL v2.0 – direkt am Gate, außerhalb der Regale */}
      <ResearchTerminal position={[0, -2.5, 2.5]} />

      {/* 6. LICHTQUELLE */}
      <pointLight color="#00dcb4" intensity={2} distance={8} decay={2} />
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