import { useState, useEffect } from 'react'
import './BootSequence.css'

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([])
  const [isComplete, setIsComplete] = useState(false)

  const bootMessages = [
    'TypeScript Racer BIOS v1.0',
    'Copyright (C) 2024, TypeScript Racer Inc.',
    '',
    'Initializing system...',
    'CPU: TypeScript Engine v5.0',
    'Memory Test: 640K OK',
    'Extended Memory: 15360K OK',
    '',
    'Detecting IDE drives...',
    'Primary Master: CODE-SNIPPETS-HDD',
    'Primary Slave: TYPING-SPEED-CACHE',
    '',
    'Loading operating system...',
    'Starting TypeScript Racer...',
    '',
    'Ready.',
  ]

  useEffect(() => {
    // Check if boot sequence has been shown before
    const hasBooted = sessionStorage.getItem('hasBooted')
    
    if (hasBooted) {
      setIsComplete(true)
      onComplete()
      return
    }

    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex < bootMessages.length) {
        setLines(prev => [...prev, bootMessages[currentIndex]])
        currentIndex++
      } else {
        clearInterval(interval)
        setTimeout(() => {
          sessionStorage.setItem('hasBooted', 'true')
          // Add fade out class
          const overlay = document.querySelector('.boot-sequence-overlay')
          if (overlay) {
            overlay.classList.add('fade-out')
          }
          // Wait for fade animation then complete
          setTimeout(() => {
            setIsComplete(true)
            onComplete()
          }, 800)
        }, 500)
      }
    }, 150) // Speed of boot messages

    return () => clearInterval(interval)
  }, [onComplete])

  if (isComplete) {
    return null
  }

  return (
    <div className="boot-sequence-overlay">
      <div className="boot-sequence-content">
        {lines.map((line, index) => (
          <div key={index} className="boot-line">
            {line || '\u00A0'}
          </div>
        ))}
        <span className="boot-cursor">_</span>
      </div>
    </div>
  )
}
