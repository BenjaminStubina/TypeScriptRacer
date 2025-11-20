import { ThemeToggle } from './ThemeToggle'
import { useState, useEffect } from 'react'
import './Header.css'

export function Header() {
  const fullText = 'Type<Script>Racer'
  const typoText = 'Type<Scropt>Racer' // Typo: "Scropt" instead of "Script"
  const typoPosition = 14 // Position where we stop typing after typo: "Type<Scropt>Ra"
  const correctPosition = 7 // Position to backtrack to: "Type<Sc"
  
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [isPausedAfterErase, setIsPausedAfterErase] = useState(false)
  const [isFixingTypo, setIsFixingTypo] = useState(false)
  const [isPausedAfterTypo, setIsPausedAfterTypo] = useState(false)
  const [isTypingCorrection, setIsTypingCorrection] = useState(false)

  useEffect(() => {
    let timeout: number

    if (isPaused) {
      // Pause for 8 seconds when text is complete
      timeout = setTimeout(() => {
        setIsPaused(false)
        setIsTyping(false)
      }, 8000)
    } else if (isPausedAfterErase) {
      // Pause for 2 seconds after erasing before typing again
      timeout = setTimeout(() => {
        setIsPausedAfterErase(false)
        setIsTyping(true)
      }, 2000)
    } else if (isPausedAfterTypo) {
      // Pause briefly after making typo before fixing it
      timeout = setTimeout(() => {
        setIsPausedAfterTypo(false)
        setIsFixingTypo(true)
      }, 500)
    } else if (isFixingTypo) {
      // Erase back to correct position
      if (displayText.length > correctPosition) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 80) // Faster erase for fixing typo
      } else {
        setIsFixingTypo(false)
        setIsTypingCorrection(true)
      }
    } else if (isTypingCorrection) {
      // Type the correct version
      if (displayText.length < fullText.length) {
        timeout = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length + 1))
        }, 150)
      } else {
        setIsTypingCorrection(false)
        setIsPaused(true)
      }
    } else if (isTyping) {
      // Initial typing animation with typo
      if (displayText.length < typoPosition) {
        timeout = setTimeout(() => {
          setDisplayText(typoText.slice(0, displayText.length + 1))
        }, 150) // Type speed
      } else {
        setIsTyping(false)
        setIsPausedAfterTypo(true)
      }
    } else {
      // Erasing animation (final erase at end)
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 100) // Erase speed
      } else {
        setIsPausedAfterErase(true)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayText, isTyping, isPaused, isPausedAfterErase, isFixingTypo, isPausedAfterTypo, isTypingCorrection, fullText, typoText, typoPosition, correctPosition])

  // Parse the display text to identify the <Script> part and show typo underline
  const renderText = () => {
    // Check if we're in the typo state (after typing typo but before fixing)
    const hasTypo = displayText.includes('<Scropt') && (isPausedAfterTypo || isFixingTypo)
    
    const scriptStart = displayText.indexOf('<Script>')
    const typoStart = displayText.indexOf('<Scropt')
    
    if (hasTypo && typoStart !== -1) {
      // Show typo with red underline
      const beforeTypo = displayText.slice(0, typoStart)
      const typoLength = Math.min(displayText.length - typoStart, 7) // '<Scropt'.length = 7
      const typoPart = displayText.slice(typoStart, typoStart + typoLength)
      const afterTypo = displayText.slice(typoStart + typoLength)
      
      return (
        <>
          {beforeTypo}
          <span className="text-primary font-bold" style={{ textDecoration: 'underline wavy', textDecorationColor: 'red', textDecorationThickness: '2px', textDecorationSkipInk: 'none' }}>
            {typoPart}
          </span>
          {afterTypo}
        </>
      )
    }
    
    if (scriptStart === -1 || displayText.length <= scriptStart) {
      // Haven't reached <Script> yet or already past it
      return <>{displayText}</>
    }

    const beforeScript = displayText.slice(0, scriptStart)
    const scriptPart = displayText.slice(scriptStart, scriptStart + 8) // '<Script>'
    const afterScript = displayText.slice(scriptStart + 8)

    return (
      <>
        {beforeScript}
        <span className="text-primary font-bold">{scriptPart}</span>
        {afterScript}
      </>
    )
  }

  return (
    <header style={{backgroundColor: 'var(--bg)'}} className="border-b-brutal border-text-primary px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center relative">
        <h1 className="text-3xl text-text-primary flex items-center">
          {renderText()}
          <span 
            className="inline-block ml-1 animate-blink"
            style={{
              width: '12px',
              height: '32px',
              backgroundColor: 'var(--color-text-primary)'
            }}
          ></span>
        </h1>
        <div className="absolute right-0">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
