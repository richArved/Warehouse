import React from 'react'

export default function NavigationDots({ sections, currentSection, totalPages }) {
  
  const scrollToSection = (index) => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    const targetScroll = (index / (sections.length - 1)) * scrollHeight
    window.scrollTo({ top: targetScroll, behavior: 'smooth' })
  }

  return (
    <nav className="nav-dots" aria-label="Sektionen Navigation">
      {sections.map((section, index) => (
        <button
          key={section.id}
          className={`nav-dot ${index === currentSection ? 'active' : ''}`}
          onClick={() => scrollToSection(index)}
          title={section.label}
          aria-label={`Gehe zu ${section.label}`}
          aria-current={index === currentSection ? 'true' : 'false'}
        />
      ))}
    </nav>
  )
}
