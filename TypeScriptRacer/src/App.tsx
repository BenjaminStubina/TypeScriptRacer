import './App.css'
import { Header } from './Components/Header'

function App() {
  return (
      <div style={{backgroundColor: 'var(--bg-dark)'}} className="min-h-screen transition-colors duration-200">
      <Header />

      {/* Main Content - Demo */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Title Section */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-text-primary">
              Race to Type Code
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Improve your coding speed and accuracy by racing to type real code snippets
            </p>
          </div>

          {/* Color Palette Cards */}
          <div style={{backgroundColor: 'var(--bg-light)'}} className="p-8 border-brutal border-text-primary shadow-brutal">
            <h3 className="text-xl font-bold text-text-primary mb-6">
              OKLCH Color Palette
            </h3>
            
            {/* Color Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Primary Card */}
              <div className="bg-primary border-brutal border-text-primary shadow-brutal p-6">
                <div className="space-y-3">
                  <h4 className="text-white font-bold text-lg uppercase">Primary</h4>
                  <div style={{backgroundColor: 'var(--bg)'}} className="border-2 border-text-primary p-3">
                    <p className="text-text-primary text-xs font-mono font-bold">oklch(0.4 0.19 264)</p>
                  </div>
                  <p className="text-white text-sm">Main brand color for buttons and key UI elements</p>
                </div>
              </div>

              {/* Secondary Card */}
              <div className="bg-secondary border-brutal border-text-primary shadow-brutal p-6">
                <div className="space-y-3">
                  <h4 className="text-black font-bold text-lg uppercase">Secondary</h4>
                  <div style={{backgroundColor: 'var(--bg)'}} className="border-2 border-text-primary p-3">
                    <p className="text-text-primary text-xs font-mono font-bold">oklch(0.4 0.19 84)</p>
                  </div>
                  <p className="text-black text-sm">Accent color for secondary actions and highlights</p>
                </div>
              </div>

              {/* Success Card */}
              <div className="bg-success border-brutal border-text-primary shadow-brutal p-6">
                <div className="space-y-3">
                  <h4 className="text-white font-bold text-lg uppercase">Success</h4>
                  <div style={{backgroundColor: 'var(--bg)'}} className="border-2 border-text-primary p-3">
                    <p className="text-text-primary text-xs font-mono font-bold">oklch(0.5 0.19 160)</p>
                  </div>
                  <p className="text-white text-sm">Success states, confirmations, and positive feedback</p>
                </div>
              </div>

              {/* Danger Card */}
              <div className="bg-danger border-brutal border-text-primary shadow-brutal p-6">
                <div className="space-y-3">
                  <h4 className="text-white font-bold text-lg uppercase">Danger</h4>
                  <div style={{backgroundColor: 'var(--bg)'}} className="border-2 border-text-primary p-3">
                    <p className="text-text-primary text-xs font-mono font-bold">oklch(0.5 0.19 30)</p>
                  </div>
                  <p className="text-white text-sm">Error states, destructive actions, and warnings</p>
                </div>
              </div>

              {/* Warning Card */}
              <div className="bg-warning border-brutal border-text-primary shadow-brutal p-6">
                <div className="space-y-3">
                  <h4 className="text-black font-bold text-lg uppercase">Warning</h4>
                  <div style={{backgroundColor: 'var(--bg)'}} className="border-2 border-text-primary p-3">
                    <p className="text-text-primary text-xs font-mono font-bold">oklch(0.5 0.19 100)</p>
                  </div>
                  <p className="text-black text-sm">Caution states and important notifications</p>
                </div>
              </div>

              {/* Info Card */}
              <div className="bg-info border-brutal border-text-primary shadow-brutal p-6">
                <div className="space-y-3">
                  <h4 className="text-white font-bold text-lg uppercase">Info</h4>
                  <div style={{backgroundColor: 'var(--bg)'}} className="border-2 border-text-primary p-3">
                    <p className="text-text-primary text-xs font-mono font-bold">oklch(0.5 0.19 260)</p>
                  </div>
                  <p className="text-white text-sm">Informational messages and helpful tips</p>
                </div>
              </div>
            </div>
          </div>

          {/* Background Colors Demo */}
          <div style={{backgroundColor: 'var(--bg-light)'}} className="p-8 border-brutal border-text-primary shadow-brutal">
            <h3 className="text-xl font-bold text-text-primary mb-6">
              Background Colors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* BG Dark */}
              <div className="bg-surface-dark border-brutal border-text-primary shadow-brutal p-6">
                <div className="space-y-2">
                  <h4 className="text-text-primary font-bold uppercase">BG Dark</h4>
                  <p className="text-text-secondary text-xs font-mono">oklch(0.92 0.095 264)</p>
                  <p className="text-text-primary text-sm">Base background color</p>
                </div>
              </div>

              {/* BG */}
              <div style={{backgroundColor: 'var(--bg)'}} className="border-brutal border-text-primary shadow-brutal p-6">
                <div className="space-y-2">
                  <h4 className="text-text-primary font-bold uppercase">BG</h4>
                  <p className="text-text-secondary text-xs font-mono">oklch(0.96 0.095 264)</p>
                  <p className="text-text-primary text-sm">Elevated surfaces and cards</p>
                </div>
              </div>

              {/* BG Light */}
              <div style={{backgroundColor: 'var(--bg-light)'}} className="border-brutal border-text-primary shadow-brutal p-6">
                <div className="space-y-2">
                  <h4 className="text-text-primary font-bold uppercase">BG Light</h4>
                  <p className="text-text-secondary text-xs font-mono">oklch(1 0.095 264)</p>
                  <p className="text-text-primary text-sm">Input fields and lighter areas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Code Sample Card */}
          <div style={{backgroundColor: 'var(--bg-light)'}} className="p-8 border-brutal border-text-primary shadow-brutal">
            <h3 className="text-xl font-bold text-text-primary mb-6">
              Code Sample
            </h3>
            
            {/* Code Sample */}
            <div style={{backgroundColor: 'var(--bg-light)'}} className="p-4 border-brutal border-text-primary shadow-brutal-sm font-mono text-sm">
              <div className="space-y-1">
                <div>
                  <span className="text-syntax-keyword font-bold">function</span>{' '}
                  <span className="text-syntax-function font-bold">calculateWPM</span>
                  <span className="text-text-primary">(</span>
                  <span className="text-text-primary">chars</span>
                  <span className="text-text-primary">: </span>
                  <span className="text-syntax-keyword font-bold">number</span>
                  <span className="text-text-primary">, time</span>
                  <span className="text-text-primary">: </span>
                  <span className="text-syntax-keyword font-bold">number</span>
                  <span className="text-text-primary">) {'{'}</span>
                </div>
                <div className="pl-4">
                  <span className="text-syntax-keyword font-bold">const</span>{' '}
                  <span className="text-text-primary">words</span>
                  <span className="text-text-primary"> = chars / </span>
                  <span className="text-syntax-number font-bold">5</span>
                  <span className="text-text-primary">;</span>
                </div>
                <div className="pl-4">
                  <span className="text-syntax-keyword font-bold">return</span>{' '}
                  <span className="text-text-primary">(words / time) * </span>
                  <span className="text-syntax-number font-bold">60</span>
                  <span className="text-text-primary">;</span>
                </div>
                <div>
                  <span className="text-text-primary">{'}'}</span>
                </div>
              </div>
            </div>

            {/* Button Demo */}
            <div className="flex flex-wrap gap-4 mt-6">
              <button className="px-6 py-3 bg-primary text-white border-brutal border-text-primary shadow-brutal font-bold uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all active:translate-x-1 active:translate-y-1 active:shadow-none">
                Start Race
              </button>
              <button className="px-6 py-3 bg-surface-light text-text-primary border-brutal border-text-primary shadow-brutal font-bold uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all active:translate-x-1 active:translate-y-1 active:shadow-none">
                View Leaderboard
              </button>
            </div>
          </div>

          {/* Typography Demo */}
          <div style={{backgroundColor: 'var(--bg-light)'}} className="p-8 border-brutal border-text-primary shadow-brutal">
            <h3 className="text-xl font-bold text-text-primary mb-6">
              Typography & Text Colors
            </h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-text-primary text-lg font-bold">Primary Text</p>
                <p className="text-text-primary text-sm">Used for headings and main content. This should be the most prominent.</p>
              </div>
              <div className="space-y-1">
                <p className="text-text-secondary text-lg font-bold">Secondary Text</p>
                <p className="text-text-secondary text-sm">Used for supporting text and descriptions. Medium prominence.</p>
              </div>
              <div className="space-y-1">
                <p className="text-text-muted text-lg font-bold">Muted Text</p>
                <p className="text-text-muted text-sm">Used for less important text, hints, and placeholders. Lowest prominence.</p>
              </div>
              <div className="space-y-1">
                <p className="font-mono text-text-primary font-bold text-lg">Monospace Font</p>
                <p className="font-mono text-text-primary text-sm">const code = "Used for code snippets";</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
