import React, { useState, Suspense } from 'react' // <--- 1. SUSPENSE IMPORTIEREN
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll } from '@react-three/drei'
import Experience from './components/Experience'
import HtmlContent from './components/HtmlContent'
import ScrollProgress from './components/ScrollProgress'
import NavigationDots from './components/NavigationDots'

// Anzahl der Seiten (Sektionen)
const PAGES = 12

// Sektionen-Definitionen
const sections = [
  { id: 'prolog', label: 'Prolog', act: 1 },
  { id: 'chaos', label: 'Das Problem', act: 1 },
  { id: 'wendepunkt', label: 'Wendepunkt', act: 1 },
  { id: 'methodik', label: 'Daten-Scan', act: 1 },
  { id: 'eintritt', label: 'Eintritt', act: 2 },
  { id: 'iot', label: 'Technologie', act: 2 },
  { id: 'amazon', label: 'Amazon', act: 2 },
  { id: 'dhl', label: 'DHL', act: 2 },
  { id: 'nachhaltigkeit', label: 'Balance', act: 2 },
  { id: 'diagnose', label: 'Diagnose', act: 3 },
  { id: 'kritik', label: 'Reflexion', act: 3 },
  { id: 'epilog', label: 'Ausblick', act: 3 },
]

export default function App() {
  const [currentSection, setCurrentSection] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  return (
    <>
      <ScrollProgress progress={scrollProgress} />
      
      <NavigationDots 
        sections={sections} 
        currentSection={currentSection}
        totalPages={PAGES}
      />

      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 2, 10], fov: 50 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance' // GPU-Performance priorisieren
          }}
          dpr={[1, 1.5]} // Adaptive Device Pixel Ratio - max 1.5 für Mobile Performance
          shadows="soft" // Soft shadows für bessere Performance
          performance={{ min: 0.5 }} // Adaptive Performance-Degradation
        >
          <ScrollControls 
            pages={PAGES} 
            damping={0.25}
            distance={1}
          >
            {/* 2. HIER IST DER FIX: Suspense wickelt alles ein */}
            <Suspense fallback={null}>
              <Experience 
                onProgressChange={setScrollProgress}
                onSectionChange={setCurrentSection}
              />
              
              <Scroll html>
                <HtmlContent />
              </Scroll>
            </Suspense>

          </ScrollControls>
        </Canvas>
      </div>
    </>
  )
}