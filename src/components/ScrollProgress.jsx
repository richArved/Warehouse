import React from 'react'

export default function ScrollProgress() {
  return (
    <div className="scroll-progress">
      <div 
        id="scroll-progress-bar" 
        className="scroll-progress-bar" 
        style={{ width: '0%' }}
      />
    </div>
  )
}