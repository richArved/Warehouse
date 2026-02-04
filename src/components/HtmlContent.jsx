import React from 'react'

export default function HtmlContent() {
  return (
    <div className="scroll-container" style={{ width: '100vw' }}>
      
      {/* ══════════════════════════════════════════════════════════════
          AKT 1: DAS PROBLEM (Sektionen 1-3)
          ══════════════════════════════════════════════════════════════ */}
      
      {/* ═══════ SEKTION 1: PROLOG ═══════ */}
      <section className="section" style={{ height: '100vh' }}>
        <div className="content-card content-card--center" style={{ 
          textAlign: 'center', 
          maxWidth: '700px',
          background: 'rgba(10, 8, 8, 0.9)',
          border: '1px solid rgba(255, 100, 50, 0.2)'
        }}>
          <p className="text-small" style={{ 
            color: '#ff6b35', 
            letterSpacing: '0.2em', 
            marginBottom: '1rem',
            textTransform: 'uppercase'
          }}>
            Eine systematische Literaturreview
          </p>
          <h1 className="title-xl" style={{ 
            background: 'linear-gradient(135deg, #f8fafc 0%, #64748b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '2rem'
          }}>
            Smart Warehouses
          </h1>
          <p className="text-body" style={{ 
            fontSize: '1.1rem', 
            color: '#94a3b8',
            fontStyle: 'italic'
          }}>
            "Wie können IoT-gestützte Smart Warehouses die Qualität und Nachhaltigkeit 
            von Logistik-Dienstleistungen verbessern?"
          </p>
          <div style={{ marginTop: '4rem', opacity: 0.5 }}>
            <span className="animate-pulse" style={{ color: '#ff6b35' }}>↓ Scroll um zu beginnen</span>
          </div>
        </div>
      </section>

      {/* ═══════ SEKTION 2: DAS CHAOS ═══════ */}
      <section className="section" style={{ height: '100vh' }}>
        <div className="content-card content-card--left" style={{ 
          background: 'rgba(26, 18, 16, 0.95)',
          border: '1px solid rgba(255, 100, 50, 0.3)',
          maxWidth: '550px'
        }}>
          <div className="tag" style={{ 
            background: 'rgba(239, 68, 68, 0.2)',
            color: '#ef4444',
            border: '1px solid rgba(239, 68, 68, 0.4)'
          }}>Das Problem</div>
          <h2 className="title-lg" style={{ color: '#f8fafc', marginTop: '1rem' }}>
            Die alte Welt der<br /><span style={{ color: '#ef4444' }}>Logistik</span>
          </h2>
          
          <ul className="feature-list" style={{ marginTop: '1.5rem' }}>
            <li style={{ color: '#94a3b8' }}>
              <strong style={{ color: '#ef4444' }}>80%</strong> falscher Lagerinformationen durch manuelle Eingabefehler
            </li>
            <li style={{ color: '#94a3b8' }}>Ineffiziente Raumnutzung und hohe Suchzeiten</li>
            <li style={{ color: '#94a3b8' }}>Fehlende Transparenz über Bestände</li>
            <li style={{ color: '#94a3b8' }}>Steigende CO₂-Emissionen</li>
          </ul>

          <div style={{ 
            marginTop: '1.5rem', 
            padding: '1rem',
            background: 'rgba(239, 68, 68, 0.1)',
            borderLeft: '3px solid #ef4444',
            borderRadius: '0 8px 8px 0'
          }}>
            <p className="text-body" style={{ margin: 0 }}>
              Die Komplexität globaler Lieferketten überfordert traditionelle Systeme.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════ SEKTION 3: WENDEPUNKT ═══════ */}
      <section className="section" style={{ height: '100vh' }}>
        <div className="content-card content-card--center" style={{
          textAlign: 'center',
          maxWidth: '600px',
          background: 'rgba(15, 21, 32, 0.95)',
          border: '1px solid rgba(0, 212, 255, 0.3)'
        }}>
          <h2 className="title-lg" style={{
            color: '#f8fafc',
            marginBottom: '1.5rem'
          }}>
            Doch was, wenn es<br />
            <span className="highlight-tech">einen besseren Weg</span> gibt?
          </h2>
          <p className="text-body" style={{ color: '#94a3b8' }}>
            Die digitale Transformation eröffnet neue Möglichkeiten.
            Industry 4.0 und das Internet of Things versprechen eine Revolution
            der Lagerhaltung.
          </p>
          <div style={{ marginTop: '2rem' }}>
            <span style={{ color: '#00d4ff', fontSize: '2rem' }}>→</span>
          </div>
        </div>
      </section>

      {/* ═══════ SEKTION 4: DER DATEN-SCAN (Methodik) ═══════ */}
      <section className="section" style={{ height: '100vh' }}>
        <div className="content-card content-card--center" style={{
          maxWidth: '700px',
          background: 'rgba(8, 12, 20, 0.98)',
          border: '1px solid rgba(0, 212, 255, 0.4)',
          boxShadow: '0 0 60px rgba(0, 212, 255, 0.15), inset 0 0 60px rgba(0, 0, 0, 0.5)',
          fontFamily: 'monospace'
        }}>
          {/* Terminal Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid rgba(0, 212, 255, 0.3)'
          }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffcc00' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }} />
            <span style={{ marginLeft: '1rem', color: '#64748b', fontSize: '0.85rem' }}>
              RESEARCH_TERMINAL v2.0 — PRISMA Protocol
            </span>
          </div>

          {/* System Log Title */}
          <div style={{ color: '#00d4ff', marginBottom: '1.5rem' }}>
            <span style={{ opacity: 0.6 }}>&gt;</span> Initialisiere Daten-Scan...
          </div>

          {/* Datenquellen */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ color: '#10b981', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
              [DATENQUELLEN VERBUNDEN]
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.5rem',
              padding: '1rem',
              background: 'rgba(0, 212, 255, 0.05)',
              borderRadius: '8px',
              border: '1px solid rgba(0, 212, 255, 0.2)'
            }}>
              <DataSource name="BASE" status="online" />
              <DataSource name="Google Scholar" status="online" />
              <DataSource name="IEEE Xplore" status="online" />
              <DataSource name="ScienceDirect" status="online" />
            </div>
          </div>

          {/* PRISMA Trichter */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ color: '#00d4ff', marginBottom: '1rem', fontSize: '0.9rem' }}>
              [PRISMA FILTER AKTIV]
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              {/* Stufe 1: Identifiziert */}
              <div style={{
                width: '100%',
                padding: '1rem',
                background: 'linear-gradient(90deg, rgba(100, 116, 139, 0.3), transparent)',
                borderLeft: '4px solid #64748b',
                borderRadius: '0 8px 8px 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ color: '#94a3b8' }}>Identifizierte Datensätze</span>
                <span style={{ color: '#f8fafc', fontSize: '1.75rem', fontWeight: 'bold' }}>58</span>
              </div>

              <div style={{ color: '#64748b', fontSize: '1.5rem' }}>↓</div>

              {/* Stufe 2: Geprüft */}
              <div style={{
                width: '85%',
                padding: '1rem',
                background: 'linear-gradient(90deg, rgba(0, 212, 255, 0.2), transparent)',
                borderLeft: '4px solid #00d4ff',
                borderRadius: '0 8px 8px 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ color: '#94a3b8' }}>Nach Screening</span>
                <span style={{ color: '#00d4ff', fontSize: '1.75rem', fontWeight: 'bold' }}>23</span>
              </div>

              <div style={{ color: '#00d4ff', fontSize: '1.5rem' }}>↓</div>

              {/* Stufe 3: Analysiert */}
              <div style={{
                width: '70%',
                padding: '1rem',
                background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.3), transparent)',
                borderLeft: '4px solid #10b981',
                borderRadius: '0 8px 8px 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 0 20px rgba(16, 185, 129, 0.2)'
              }}>
                <span style={{ color: '#10b981' }}>Finale Analyse</span>
                <span style={{
                  color: '#10b981',
                  fontSize: '2.25rem',
                  fontWeight: 'bold',
                  textShadow: '0 0 10px rgba(16, 185, 129, 0.5)'
                }}>13</span>
              </div>
            </div>
          </div>

          {/* System Message */}
          <div style={{
            padding: '1rem',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{ color: '#10b981', marginBottom: '0.5rem' }}>
              ✓ SCAN ABGESCHLOSSEN
            </div>
            <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>
              Das Rauschen wurde gefiltert. Zugang zum Smart Warehouse basiert auf <strong style={{ color: '#10b981' }}>13 verifizierten Kern-Studien</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          AKT 2: DIE TRANSFORMATION (Sektionen 5-9)
          ══════════════════════════════════════════════════════════════ */}

      {/* ═══════ SEKTION 5: EINTRITT INS SMART WAREHOUSE ═══════ */}
      <section className="section" style={{ height: '100vh' }}>
        <div className="content-card content-card--right" style={{ maxWidth: '550px' }}>
          <div className="tag tag--tech">Kapitel 3</div>
          <h2 className="title-lg">
            Willkommen im<br /><span className="highlight-tech">Smart Warehouse</span>
          </h2>
          <p className="text-body">
            Smart Warehouses sind hochautomatisierte Lagereinrichtungen, die durch 
            Industry-4.0-Technologien Echtzeit-Transparenz über alle Prozesse ermöglichen.
          </p>
          
          <div className="stats-grid" style={{ marginTop: '1.5rem' }}>
            <div className="stat-item">
              <div className="stat-value highlight-tech">IoT</div>
              <div className="stat-label">Vernetzung</div>
            </div>
            <div className="stat-item">
              <div className="stat-value highlight-tech">RFID</div>
              <div className="stat-label">Tracking</div>
            </div>
            <div className="stat-item">
              <div className="stat-value highlight-green">AI</div>
              <div className="stat-label">Optimierung</div>
            </div>
            <div className="stat-item">
              <div className="stat-value highlight-tech">Cloud</div>
              <div className="stat-label">Daten</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SEKTION 6: IoT TECHNOLOGIEN ═══════ */}
      <section className="section" style={{ height: '100vh' }}>
        <div className="content-card content-card--left" style={{ maxWidth: '580px' }}>
          <div className="tag tag--tech">Kapitel 4</div>
          <h2 className="title-lg">Die Technologie <span className="highlight-tech">erwacht</span></h2>
          
          <div style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
            <TechItem icon="📡" title="RFID" desc="Echtzeit-Tracking mit 99,5% Genauigkeit" color="#00d4ff" />
            <TechItem icon="🌡️" title="Sensoren" desc="Temperatur- & Feuchtigkeitskontrolle" color="#ef4444" />
            <TechItem icon="🤖" title="AGVs" desc="Automatisierte Fahrzeuge & Robotik" color="#10b981" />
            <TechItem icon="⚡" title="Edge Computing" desc="Lokale Echtzeitverarbeitung" color="#ffcc00" />
          </div>

          <div className="stats-grid" style={{ marginTop: '1.5rem' }}>
            <div className="stat-item">
              <div className="stat-value highlight-tech">99,5%</div>
              <div className="stat-label">Bestandsgenauigkeit</div>
            </div>
            <div className="stat-item">
              <div className="stat-value highlight-green">81-99%</div>
              <div className="stat-label">Zeiteinsparung</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SEKTION 7: AMAZON ═══════ */}
      <section className="section" style={{ height: '100vh' }}>
        <div className="content-card content-card--left" style={{ 
          maxWidth: '520px',
          background: 'rgba(26, 26, 36, 0.9)',
          borderLeft: '4px solid #ff9900'
        }}>
          <div className="tag tag--amazon">Case Study</div>
          <h2 className="title-lg"><span className="highlight-amazon">Amazon</span></h2>
          <p className="text-body">
            The Climate Pledge: CO₂-neutral bis 2040 durch vernetzte, 
            datengetriebene Logistiksysteme.
          </p>

          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value highlight-amazon">31.400</div>
              <div className="stat-label">E-Fahrzeuge</div>
            </div>
            <div className="stat-item">
              <div className="stat-value highlight-amazon">1,5 Mrd.</div>
              <div className="stat-label">Pakete 2024</div>
            </div>
            <div className="stat-item">
              <div className="stat-value highlight-green">+48%</div>
              <div className="stat-label">Climate Pledge Verkäufe</div>
            </div>
            <div className="stat-item">
              <div className="stat-value highlight-green">100%</div>
              <div className="stat-label">Erneuerbare Energie</div>
            </div>
          </div>

          <p className="text-small" style={{ marginTop: '1rem', color: '#ff9900' }}>
            → "Climate Pledge Friendly" als Marketinginstrument
          </p>
        </div>
      </section>

      {/* ═══════ SEKTION 8: DHL ═══════ */}
      <section className="section" style={{ height: '100vh' }}>
        <div className="content-card content-card--right" style={{ 
          maxWidth: '520px',
          background: 'rgba(26, 26, 36, 0.9)',
          borderLeft: '4px solid #ffcc00'
        }}>
          <div className="tag tag--dhl">Case Study</div>
          <h2 className="title-lg"><span className="highlight-dhl">DHL GoGreen</span></h2>
          <p className="text-body">
            Strategie 2030: "Green Logistics of Choice" – Nachhaltigkeit 
            als Wettbewerbsvorteil und Markendifferenzierer.
          </p>

          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value highlight-dhl">2050</div>
              <div className="stat-label">Netto-Null Ziel</div>
            </div>
            <div className="stat-item">
              <div className="stat-value highlight-green">61%</div>
              <div className="stat-label">Erneuerbare 2024</div>
            </div>
            <div className="stat-item">
              <div className="stat-value highlight-green">1.584 kt</div>
              <div className="stat-label">CO₂e eingespart</div>
            </div>
            <div className="stat-item">
              <div className="stat-value highlight-dhl">85%</div>
              <div className="stat-label">Reduktion mit SAF</div>
            </div>
          </div>

          <p className="text-small" style={{ marginTop: '1rem', color: '#ffcc00' }}>
            → GoGreen Plus: Nachhaltige Produkte für alle Transportmodi
          </p>
        </div>
      </section>

      {/* ═══════ SEKTION 9: NACHHALTIGKEIT / TRIPLE BOTTOM LINE ═══════ */}
      <section className="section" style={{ height: '100vh' }}>
        <div className="content-card content-card--right" style={{ maxWidth: '650px' }}>
          <div className="tag tag--green">Kapitel 6</div>
          <h2 className="title-lg"><span className="highlight-green">Die Balance finden</span></h2>
          <p className="text-body" style={{ textAlign: 'center' }}>
            Triple Bottom Line: Nachhaltigkeit bedeutet das Gleichgewicht 
            zwischen drei Dimensionen.
          </p>
          
          <div style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
            <BalanceItem 
              icon="💰" 
              title="Ökonomisch" 
              desc="Reduzierte Betriebskosten, höhere Produktivität, bessere Kundenzufriedenheit"
              color="#00d4ff"
            />
            <BalanceItem 
              icon="🌱" 
              title="Ökologisch" 
              desc="CO₂-Reduktion, Energieeffizienz, Ressourcenoptimierung"
              color="#10b981"
            />
            <BalanceItem 
              icon="👥" 
              title="Sozial" 
              desc="Verbesserte Arbeitssicherheit, Qualifizierung, faire Bedingungen"
              color="#ff9900"
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          AKT 3: DIE ERKENNTNIS (Sektionen 10-12)
          ══════════════════════════════════════════════════════════════ */}

      {/* ═══════ SEKTION 10: SYSTEM-DIAGNOSE (Forschungslücken) ═══════ */}
      <section className="section" style={{ height: '100vh' }}>
        <div className="content-card content-card--left" style={{
          maxWidth: '650px',
          background: 'rgba(20, 10, 10, 0.98)',
          border: '2px solid rgba(239, 68, 68, 0.5)',
          boxShadow: '0 0 40px rgba(239, 68, 68, 0.15), inset 0 0 60px rgba(0, 0, 0, 0.5)',
          fontFamily: 'monospace'
        }}>
          {/* Warning Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '1.5rem',
            padding: '1rem',
            background: 'rgba(239, 68, 68, 0.15)',
            borderRadius: '8px',
            animation: 'pulse 2s infinite'
          }}>
            <span style={{ fontSize: '1.5rem' }}>⚠️</span>
            <span style={{
              color: '#ef4444',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              SYSTEM-DIAGNOSE: UNVOLLSTÄNDIG
            </span>
            <span style={{ fontSize: '1.5rem' }}>⚠️</span>
          </div>

          <div style={{ color: '#ff9900', marginBottom: '1.5rem', textAlign: 'center' }}>
            <span style={{ opacity: 0.7 }}>&gt;</span> Analysiere Datenlücken...
          </div>

          {/* Error Logs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <SystemError
              code="ERR_001"
              title="VERBINDUNG ZU KMUs FEHLGESCHLAGEN"
              desc="Technologie-Implementierung konzentriert sich auf Großkonzerne (Amazon, DHL). Kleine und mittlere Unternehmen sind unterrepräsentiert."
              severity="critical"
            />

            <SystemError
              code="ERR_002"
              title="SOZIALE SENSOREN OFFLINE"
              desc="Forschungsfokus liegt überwiegend auf ökonomischen und technischen Metriken. Arbeitsbedingungen und soziale Auswirkungen werden vernachlässigt."
              severity="warning"
            />

            <SystemError
              code="ERR_003"
              title="DISKREPANZ ERKANNT"
              desc="Marketing-Versprechen vs. verifizierte Langzeit-Daten: Tatsächliche Nachhaltigkeitseffekte sind oft nicht unabhängig validiert."
              severity="warning"
            />
          </div>

          {/* System Status */}
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: 'rgba(255, 153, 0, 0.1)',
            border: '1px solid rgba(255, 153, 0, 0.3)',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <p style={{ color: '#ff9900', margin: 0, fontSize: '0.9rem' }}>
              Die Simulation läuft, aber <strong>das System ist nicht vollständig</strong>.<br />
              Es gibt blinde Flecken in der Forschung.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════ SEKTION 11: KRITISCHE REFLEXION ═══════ */}
      <section className="section" style={{ height: '100vh' }}>
        <div className="content-card content-card--left" style={{
          maxWidth: '550px',
          background: 'rgba(26, 26, 36, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div className="tag" style={{
            background: 'rgba(148, 163, 184, 0.2)',
            color: '#94a3b8',
            border: '1px solid rgba(148, 163, 184, 0.3)'
          }}>Kritische Diskussion</div>
          <h2 className="title-lg">Ein <span style={{ color: '#94a3b8' }}>ehrlicher Blick</span></h2>

          <div style={{ marginTop: '1.5rem' }}>
            <CriticalPoint
              title="Technologische Reife vs. Praxis"
              desc="RFID & IoT sind ausgereift, aber KMU und Entwicklungsländer zeigen Implementierungslücken."
            />
            <CriticalPoint
              title="Nachhaltigkeits-Ungleichgewicht"
              desc="Fokus auf ökonomische Performance – ökologische und soziale Dimensionen marginalisiert."
            />
            <CriticalPoint
              title="Marketing als selektive Kommunikation"
              desc="Vollständige Umweltbilanz und soziale Auswirkungen oft nicht transparent."
            />
          </div>
        </div>
      </section>

      {/* ═══════ SEKTION 12: EPILOG / FAZIT ═══════ */}
      <section className="section" style={{ height: '100vh' }}>
        <div className="content-card content-card--center" style={{
          textAlign: 'center',
          maxWidth: '700px',
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(0, 212, 255, 0.3)'
        }}>
          <h2 className="title-lg">
            Die <span className="highlight-tech">Zukunft</span> hat begonnen
          </h2>
          
          <p className="text-body" style={{ 
            fontStyle: 'italic',
            padding: '1.5rem',
            margin: '1.5rem 0',
            background: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '12px'
          }}>
            "IoT-gestützte Smart Warehouses leisten einen transformierenden Beitrag 
            zur Nachhaltigkeit und Qualität in der Logistik – doch die Forschung steht 
            noch am Anfang einer integrativen Auseinandersetzung."
          </p>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '1rem',
            marginTop: '2rem',
            flexWrap: 'wrap'
          }}>
            <span className="tag tag--tech">IoT</span>
            <span className="tag tag--green">Nachhaltigkeit</span>
            <span className="tag tag--amazon">Innovation</span>
            <span className="tag tag--dhl">Zukunft</span>
          </div>

          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <p className="text-small">Arved von Witzleben</p>
            <p className="text-small" style={{ opacity: 0.6 }}>
              BSP Business & Law School Berlin · Prof. Dr. Alexander Bretz · 2025
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}

// ═══════ HELPER KOMPONENTEN ═══════

function TechItem({ icon, title, desc, color }) {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '1rem',
      padding: '0.75rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '8px',
      borderLeft: `3px solid ${color}`
    }}>
      <span style={{ fontSize: '1.5rem' }}>{icon}</span>
      <div>
        <strong style={{ color }}>{title}</strong>
        <p className="text-small" style={{ margin: 0 }}>{desc}</p>
      </div>
    </div>
  )
}

function BalanceItem({ icon, title, desc, color }) {
  return (
    <div style={{ 
      padding: '1rem',
      background: `linear-gradient(90deg, ${color}15, transparent)`,
      borderRadius: '8px',
      borderLeft: `3px solid ${color}`
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '1.25rem' }}>{icon}</span>
        <strong style={{ color }}>{title}</strong>
      </div>
      <p className="text-small" style={{ margin: 0, paddingLeft: '2rem' }}>{desc}</p>
    </div>
  )
}

function CriticalPoint({ title, desc }) {
  return (
    <div style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <h4 style={{ color: '#f8fafc', fontSize: '1rem', marginBottom: '0.25rem' }}>{title}</h4>
      <p className="text-small" style={{ margin: 0 }}>{desc}</p>
    </div>
  )
}

function DataSource({ name, status }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem',
      background: 'rgba(0, 0, 0, 0.3)',
      borderRadius: '4px'
    }}>
      <div style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: status === 'online' ? '#10b981' : '#ef4444',
        boxShadow: status === 'online' ? '0 0 6px #10b981' : '0 0 6px #ef4444'
      }} />
      <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{name}</span>
    </div>
  )
}

function SystemError({ code, title, desc, severity }) {
  const colors = {
    critical: { border: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', text: '#ef4444' },
    warning: { border: '#ff9900', bg: 'rgba(255, 153, 0, 0.1)', text: '#ff9900' }
  }
  const c = colors[severity] || colors.warning

  return (
    <div style={{
      padding: '1rem',
      background: c.bg,
      border: `1px solid ${c.border}`,
      borderLeft: `4px solid ${c.border}`,
      borderRadius: '0 8px 8px 0'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '0.5rem'
      }}>
        <span style={{
          color: c.text,
          fontSize: '0.75rem',
          padding: '0.2rem 0.5rem',
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '4px',
          fontFamily: 'monospace'
        }}>{code}</span>
        <span style={{
          color: c.text,
          fontSize: '0.9rem',
          fontWeight: 'bold',
          textTransform: 'uppercase'
        }}>{title}</span>
      </div>
      <p style={{
        color: '#94a3b8',
        margin: 0,
        fontSize: '0.85rem',
        paddingLeft: '0.5rem'
      }}>{desc}</p>
    </div>
  )
}
