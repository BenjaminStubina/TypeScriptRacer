import './App.css'
import { useState } from 'react'
import { Header } from './Components/Header'
import { ViewportGuard } from './Components/ViewportGuard'
import { BootSequence } from './Components/BootSequence'

function App() {
  const [bootComplete, setBootComplete] = useState(false)

  return (
      <div className="app-container">
      <BootSequence onComplete={() => setBootComplete(true)} />
      {bootComplete && (
        <div className="app-content">
          <ViewportGuard />
          <Header />

      {/* Main Content - Demo */}
      <main className="main-content">
        <div className="content-wrapper">
          {/* Title Section */}
          <div className="title-section">
            <h2>
              Race to Type Code
            </h2>
            <p>
              Improve your coding speed and accuracy by racing to type real code snippets
            </p>
          </div>

          {/* Color Palette Cards */}
          <div className="card">
            <h3 className="card-title">
              OKLCH Color Palette
            </h3>
            
            {/* Color Cards Grid */}
            <div className="grid-3col">
              {/* Primary Card */}
              <div className="color-card bg-primary">
                <div className="color-card-content">
                  <h4>Primary</h4>
                  <div className="color-swatch">
                    <p>oklch(0.4 0.19 264)</p>
                  </div>
                  <p>Main brand color for buttons and key UI elements</p>
                </div>
              </div>

              {/* Secondary Card */}
              <div className="color-card bg-secondary">
                <div className="color-card-content">
                  <h4>Secondary</h4>
                  <div className="color-swatch">
                    <p>oklch(0.4 0.19 84)</p>
                  </div>
                  <p>Accent color for secondary actions and highlights</p>
                </div>
              </div>

              {/* Success Card */}
              <div className="color-card bg-success">
                <div className="color-card-content">
                  <h4>Success</h4>
                  <div className="color-swatch">
                    <p>oklch(0.5 0.19 160)</p>
                  </div>
                  <p>Success states, confirmations, and positive feedback</p>
                </div>
              </div>

              {/* Danger Card */}
              <div className="color-card bg-danger">
                <div className="color-card-content">
                  <h4>Danger</h4>
                  <div className="color-swatch">
                    <p>oklch(0.5 0.19 30)</p>
                  </div>
                  <p>Error states, destructive actions, and warnings</p>
                </div>
              </div>

              {/* Warning Card */}
              <div className="color-card bg-warning">
                <div className="color-card-content">
                  <h4>Warning</h4>
                  <div className="color-swatch">
                    <p>oklch(0.5 0.19 100)</p>
                  </div>
                  <p>Caution states and important notifications</p>
                </div>
              </div>

              {/* Info Card */}
              <div className="color-card bg-info">
                <div className="color-card-content">
                  <h4>Info</h4>
                  <div className="color-swatch">
                    <p>oklch(0.5 0.19 260)</p>
                  </div>
                  <p>Informational messages and helpful tips</p>
                </div>
              </div>
            </div>
          </div>

          {/* Background Colors Demo */}
          <div className="card">
            <h3 className="card-title">
              Background Colors
            </h3>
            <div className="grid-3col">
              {/* BG Dark */}
              <div className="color-card bg-surface-dark">
                <div className="card-text">
                  <h4>BG Dark</h4>
                  <p className="color-code">oklch(0.92 0.095 264)</p>
                  <p>Base background color</p>
                </div>
              </div>

              {/* BG */}
              <div className="color-card bg-surface-dark" style={{backgroundColor: 'var(--bg)'}}>
                <div className="card-text">
                  <h4>BG</h4>
                  <p className="color-code">oklch(0.96 0.095 264)</p>
                  <p>Elevated surfaces and cards</p>
                </div>
              </div>

              {/* BG Light */}
              <div className="color-card bg-surface-dark" style={{backgroundColor: 'var(--bg-light)'}}>
                <div className="card-text">
                  <h4>BG Light</h4>
                  <p className="color-code">oklch(1 0.095 264)</p>
                  <p>Input fields and lighter areas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Code Sample Card */}
          <div className="card">
            <h3 className="card-title">
              Code Sample
            </h3>
            
            {/* Code Sample */}
            <div className="code-sample">
              <div className="code-lines">
                <div className="code-line">
                  <span className="syntax-keyword">function</span>{' '}
                  <span className="syntax-function">calculateWPM</span>
                  <span className="text-primary-color">(</span>
                  <span className="text-primary-color">chars</span>
                  <span className="text-primary-color">: </span>
                  <span className="syntax-keyword">number</span>
                  <span className="text-primary-color">, time</span>
                  <span className="text-primary-color">: </span>
                  <span className="syntax-keyword">number</span>
                  <span className="text-primary-color">) {'{'}</span>
                </div>
                <div className="code-line code-indent">
                  <span className="syntax-keyword">const</span>{' '}
                  <span className="text-primary-color">words</span>
                  <span className="text-primary-color"> = chars / </span>
                  <span className="syntax-number">5</span>
                  <span className="text-primary-color">;</span>
                </div>
                <div className="code-line code-indent">
                  <span className="syntax-keyword">return</span>{' '}
                  <span className="text-primary-color">(words / time) * </span>
                  <span className="syntax-number">60</span>
                  <span className="text-primary-color">;</span>
                </div>
                <div className="code-line">
                  <span className="text-primary-color">{'}'}</span>
                </div>
              </div>
            </div>

            {/* Button Demo */}
            <div className="button-group">
              <button className="btn btn-primary">
                Start Race
              </button>
              <button className="btn btn-secondary">
                View Leaderboard
              </button>
            </div>
          </div>

          {/* Typography Demo */}
          <div className="card">
            <h3 className="card-title">
              Typography & Text Colors
            </h3>
            <div className="typography-section">
              <div className="typography-item">
                <p className="text-primary demo-title">Primary Text</p>
                <p className="text-primary demo-text">Used for headings and main content. This should be the most prominent.</p>
              </div>
              <div className="typography-item">
                <p className="text-secondary demo-title">Secondary Text</p>
                <p className="text-secondary demo-text">Used for supporting text and descriptions. Medium prominence.</p>
              </div>
              <div className="typography-item">
                <p className="text-muted demo-title">Muted Text</p>
                <p className="text-muted demo-text">Used for less important text, hints, and placeholders. Lowest prominence.</p>
              </div>
              <div className="typography-item">
                <p className="font-mono text-primary demo-title">Monospace Font</p>
                <p className="font-mono text-primary demo-text">const code = "Used for code snippets";</p>
              </div>
            </div>
          </div>
        </div>
      </main>
        </div>
      )}
    </div>
  )
}

export default App
