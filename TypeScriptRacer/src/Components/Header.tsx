import { ThemeToggle } from './ThemeToggle'
import { AboutModal } from './AboutModal'
import { useState, useEffect } from 'react'
import './Header.css'

// Array of possible typos
const typos = [
  { text: 'Type<Scropt>Racer', position: 14, correctPos: 7 }, // "Scropt"
  { text: 'Type<Sceript>Racer', position: 15, correctPos: 7 }, // "Sceript"
  { text: 'Type<Scriptt>Racer', position: 15, correctPos: 7 }, // "Scriptt"
  { text: 'Type<Skript>Racer', position: 14, correctPos: 6 }, // "Skript" - backtrack to "Type<S"
  { text: 'Type<Scrupt>Racer', position: 14, correctPos: 7 }, // "Scrupt"
]

export function Header() {
  const fullText = 'Type<Script>Racer'
  
  const [currentTypo, setCurrentTypo] = useState(() => typos[Math.floor(Math.random() * typos.length)])
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [isPausedAfterErase, setIsPausedAfterErase] = useState(false)
  const [isFixingTypo, setIsFixingTypo] = useState(false)
  const [isPausedAfterTypo, setIsPausedAfterTypo] = useState(false)
  const [isPausedAfterFixing, setIsPausedAfterFixing] = useState(false)
  const [isTypingCorrection, setIsTypingCorrection] = useState(false)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)

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
        // Select a new random typo for the next loop
        setCurrentTypo(typos[Math.floor(Math.random() * typos.length)])
      }, 2000)
    } else if (isPausedAfterTypo) {
      // Pause briefly after making typo before fixing it
      timeout = setTimeout(() => {
        setIsPausedAfterTypo(false)
        setIsFixingTypo(true)
      }, 1000)
    } else if (isFixingTypo) {
      // Erase back to correct position
      if (displayText.length > currentTypo.correctPos) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 80) // Faster erase for fixing typo
      } else {
        setIsFixingTypo(false)
        setIsPausedAfterFixing(true)
      }
    } else if (isPausedAfterFixing) {
      // Pause briefly after erasing typo before typing correction
      timeout = setTimeout(() => {
        setIsPausedAfterFixing(false)
        setIsTypingCorrection(true)
      }, 500)
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
      if (displayText.length < currentTypo.position) {
        timeout = setTimeout(() => {
          setDisplayText(currentTypo.text.slice(0, displayText.length + 1))
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
  }, [displayText, isTyping, isPaused, isPausedAfterErase, isFixingTypo, isPausedAfterTypo, isPausedAfterFixing, isTypingCorrection, fullText, currentTypo])

  // Parse the display text to identify the <Script> part and show typo underline
  const renderText = () => {
    // Check if we're in the typo state (after typing typo but before fixing)
    // Extract the typo word from currentTypo.text (e.g., "Scropt" from "Type<Scropt>Racer")
    const typoMatch = currentTypo.text.match(/<([^>]+)>/)
    const typoWord = typoMatch ? typoMatch[1] : ''
    const hasTypo = displayText.includes(`<${typoWord}`) && (isPausedAfterTypo || isFixingTypo)
    
    const scriptStart = displayText.indexOf('<Script>')
    const typoStart = displayText.indexOf(`<${typoWord}`)
    
    if (hasTypo && typoStart !== -1) {
      // Show typo with red underline
      const beforeTypo = displayText.slice(0, typoStart)
      const typoLength = Math.min(displayText.length - typoStart, typoWord.length + 2) // '<typoWord>'.length
      const typoPart = displayText.slice(typoStart, typoStart + typoLength)
      const afterTypo = displayText.slice(typoStart + typoLength)
      
      return (
        <>
          {beforeTypo}
          <span className="title-primary-text" style={{ textDecoration: 'underline wavy', textDecorationColor: 'red', textDecorationThickness: '2px', textDecorationSkipInk: 'none' }}>
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
        <span className="title-primary-text">{scriptPart}</span>
        {afterScript}
      </>
    )
  }

  return (
    <>
      <header className="header-container">
        <div className="header-content">
          <button 
            className="header-about-button"
            onClick={() => setIsAboutModalOpen(true)}
          >
            About the Dev
          </button>
          <h1 className="header-title">
            {renderText()}
            <span className="animate-blink"></span>
          </h1>
          <div className="header-theme-toggle">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <AboutModal 
        isOpen={isAboutModalOpen} 
        onClose={() => setIsAboutModalOpen(false)} 
      />
    </>
  )
}
