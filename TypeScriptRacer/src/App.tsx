import './App.css'
import { ThemeToggle } from './Components/ThemeToggle'

function App() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-200">
      {/* Header */}
      <header className="bg-background-elevated border-b border-text-muted/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-text-primary font-mono">
            TypeScriptRacer
          </h1>
          <ThemeToggle />
        </div>
      </header>

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

          {/* Theme Demo Card */}
          <div className="bg-background-elevated rounded-lg p-8 border border-text-muted/20">
            <h3 className="text-xl font-semibold text-text-primary mb-4">
              Theme System Demo
            </h3>
            
            {/* Color Palette */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="space-y-2">
                <div className="h-16 bg-primary rounded flex items-center justify-center">
                  <span className="text-white text-xs font-mono">Primary</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-16 bg-accent-success rounded flex items-center justify-center">
                  <span className="text-white text-xs font-mono">Success</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-16 bg-accent-error rounded flex items-center justify-center">
                  <span className="text-white text-xs font-mono">Error</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-16 bg-accent-warning rounded flex items-center justify-center">
                  <span className="text-black text-xs font-mono">Warning</span>
                </div>
              </div>
            </div>

            {/* Code Sample */}
            <div className="bg-background-input rounded-lg p-4 font-mono text-sm">
              <div className="space-y-1">
                <div>
                  <span className="text-syntax-keyword">function</span>{' '}
                  <span className="text-syntax-function">calculateWPM</span>
                  <span className="text-text-primary">(</span>
                  <span className="text-text-primary">chars</span>
                  <span className="text-text-primary">: </span>
                  <span className="text-syntax-keyword">number</span>
                  <span className="text-text-primary">, time</span>
                  <span className="text-text-primary">: </span>
                  <span className="text-syntax-keyword">number</span>
                  <span className="text-text-primary">) {'{'}</span>
                </div>
                <div className="pl-4">
                  <span className="text-syntax-keyword">const</span>{' '}
                  <span className="text-text-primary">words</span>
                  <span className="text-text-primary"> = chars / </span>
                  <span className="text-syntax-number">5</span>
                  <span className="text-text-primary">;</span>
                </div>
                <div className="pl-4">
                  <span className="text-syntax-keyword">return</span>{' '}
                  <span className="text-text-primary">(words / time) * </span>
                  <span className="text-syntax-number">60</span>
                  <span className="text-text-primary">;</span>
                </div>
                <div>
                  <span className="text-text-primary">{'}'}</span>
                </div>
              </div>
            </div>

            {/* Button Demo */}
            <div className="flex gap-4 mt-6">
              <button className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg font-semibold transition-colors">
                Start Race
              </button>
              <button className="px-6 py-2 bg-background-input hover:bg-background-elevated text-text-primary rounded-lg font-semibold border border-text-muted/20 transition-colors">
                View Leaderboard
              </button>
            </div>
          </div>

          {/* Typography Demo */}
          <div className="bg-background-elevated rounded-lg p-8 border border-text-muted/20">
            <h3 className="text-xl font-semibold text-text-primary mb-4">
              Typography
            </h3>
            <div className="space-y-3">
              <p className="text-text-primary">Primary text color - Used for main content</p>
              <p className="text-text-secondary">Secondary text color - Used for supporting text</p>
              <p className="text-text-muted">Muted text color - Used for less important text</p>
              <p className="font-mono text-text-primary">Monospace font - Used for code</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
