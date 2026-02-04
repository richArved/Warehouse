import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Text, Html } from '@react-three/drei'
import * as THREE from 'three'

/**
 * IoT Elements: RFID Tags, Sensors, Data Visualizations
 */

// RFID Tag
function RFIDTag({ position, color = '#00d4ff' }) {
  const ref = useRef()
  const waveRef = useRef()

  useFrame((state) => {
    // Pulsierender Glow-Effekt
    if (waveRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.2
      waveRef.current.scale.set(scale, scale, 1)
      waveRef.current.material.opacity = 0.3 - Math.sin(state.clock.elapsedTime * 3) * 0.15
    }
  })

  return (
    <group position={position}>
      {/* Tag Basis */}
      <mesh ref={ref}>
        <boxGeometry args={[0.3, 0.02, 0.2]} />
        <meshStandardMaterial color="#1a1a24" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Antenne */}
      <mesh position={[0, 0.015, 0]}>
        <ringGeometry args={[0.05, 0.07, 16]} />
        <meshBasicMaterial color={color} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Signal-Welle */}
      <mesh ref={waveRef} position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.08, 0.12, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

// Sensor (Temperatur/Feuchtigkeit)
function Sensor({ position, type = 'temp', value = '22°C' }) {
  const colors = {
    temp: '#ef4444',
    humidity: '#3b82f6',
    motion: '#10b981'
  }
  
  const ref = useRef()
  
  useFrame((state) => {
    if (ref.current) {
      // Leichtes Pulsieren
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05
      ref.current.scale.set(pulse, pulse, pulse)
    }
  })

  return (
    <group position={position} ref={ref}>
      {/* Sensor Gehäuse */}
      <mesh>
        <cylinderGeometry args={[0.1, 0.1, 0.15, 16]} />
        <meshStandardMaterial color="#2d3748" metalness={0.5} roughness={0.3} />
      </mesh>
      
      {/* Sensor LED */}
      <mesh position={[0, 0.08, 0.08]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial color={colors[type]} />
      </mesh>
      
      {/* Glow Ring */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.1, 0.12, 16]} />
        <meshBasicMaterial color={colors[type]} transparent opacity={0.4} />
      </mesh>
    </group>
  )
}

// Schwebende Daten-Visualisierung
function DataPoint({ position, label, value, color = '#00d4ff' }) {
  return (
    <Float
      speed={2}
      rotationIntensity={0}
      floatIntensity={0.5}
      floatingRange={[-0.1, 0.1]}
    >
      <group position={position}>
        {/* Punkt */}
        <mesh>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color={color} />
        </mesh>
        
        {/* Verbindungslinie nach unten */}
        <mesh position={[0, -0.25, 0]}>
          <cylinderGeometry args={[0.005, 0.005, 0.5, 8]} />
          <meshBasicMaterial color={color} transparent opacity={0.5} />
        </mesh>
      </group>
    </Float>
  )
}

// AGV (Automated Guided Vehicle) - Placeholder
function AGV({ position }) {
  const ref = useRef()
  
  useFrame((state) => {
    if (ref.current) {
      // Leichte Bewegung
      ref.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.5) * 2
    }
  })

  return (
    <group ref={ref} position={position}>
      {/* Basis */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.8, 0.2, 0.5]} />
        <meshStandardMaterial color="#2d3748" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Räder */}
      {[[-0.35, 0], [0.35, 0]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.08, z]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.08, 0.1, 16]} />
          <meshStandardMaterial color="#1a1a24" />
        </mesh>
      ))}
      
      {/* Sensor oben */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 0.1, 8]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.3} />
      </mesh>
      
      {/* LED Streifen */}
      <mesh position={[0, 0.26, 0.26]}>
        <boxGeometry args={[0.6, 0.02, 0.02]} />
        <meshBasicMaterial color="#00d4ff" />
      </mesh>
    </group>
  )
}

// Förderband
function ConveyorBelt({ position, length = 4 }) {
  const beltRef = useRef()
  
  useFrame((state) => {
    if (beltRef.current) {
      // Textur-Offset für Bewegungseffekt
      beltRef.current.material.map && (beltRef.current.material.map.offset.x += 0.01)
    }
  })

  return (
    <group position={position}>
      {/* Struktur */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[length, 0.1, 0.6]} />
        <meshStandardMaterial color="#2d3748" metalness={0.5} />
      </mesh>
      
      {/* Belt */}
      <mesh ref={beltRef} position={[0, 0.36, 0]}>
        <boxGeometry args={[length - 0.1, 0.02, 0.5]} />
        <meshStandardMaterial color="#1a1a24" roughness={0.9} />
      </mesh>
      
      {/* Seitenrails */}
      {[-0.28, 0.28].map((z, i) => (
        <mesh key={i} position={[0, 0.4, z]}>
          <boxGeometry args={[length, 0.08, 0.04]} />
          <meshStandardMaterial color="#4a5568" metalness={0.6} />
        </mesh>
      ))}
      
      {/* Stützen */}
      {Array.from({ length: Math.floor(length / 1.5) + 1 }, (_, i) => (
        <mesh key={i} position={[-length/2 + i * 1.5, 0.15, 0]}>
          <boxGeometry args={[0.1, 0.3, 0.5]} />
          <meshStandardMaterial color="#4a5568" />
        </mesh>
      ))}
    </group>
  )
}

export default function IoTElements() {
  return (
    <group>
      {/* RFID Tags an Regalen */}
      <RFIDTag position={[-5.5, 1.5, -3.5]} />
      <RFIDTag position={[-5.5, 2.5, -3.5]} />
      <RFIDTag position={[5.5, 1.5, -3.5]} color="#ffcc00" />
      <RFIDTag position={[5.5, 2.5, -3.5]} color="#ffcc00" />
      <RFIDTag position={[0, 1.5, -5.5]} color="#10b981" />
      
      {/* Sensoren */}
      <Sensor position={[-8, 2, -4]} type="temp" />
      <Sensor position={[8, 2, -4]} type="humidity" />
      <Sensor position={[0, 4, 0]} type="motion" />
      
      {/* Schwebende Datenpunkte */}
      <DataPoint position={[-3, 3, -2]} label="Temp" value="22°C" color="#ef4444" />
      <DataPoint position={[3, 3.5, -3]} label="Stock" value="1,247" color="#00d4ff" />
      <DataPoint position={[0, 4, -4]} label="Orders" value="89/h" color="#10b981" />
      
      {/* AGV */}
      <AGV position={[0, 0, 1]} />
      
      {/* Förderband */}
      <ConveyorBelt position={[0, 0, -3]} length={6} />
    </group>
  )
}
