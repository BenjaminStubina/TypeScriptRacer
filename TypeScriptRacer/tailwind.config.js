/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // IDE-inspired color palette
        background: {
          DEFAULT: 'var(--color-background)',
          elevated: 'var(--color-background-elevated)',
          input: 'var(--color-background-input)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
        },
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
        },
        accent: {
          success: 'var(--color-accent-success)',
          error: 'var(--color-accent-error)',
          warning: 'var(--color-accent-warning)',
        },
        syntax: {
          keyword: 'var(--color-syntax-keyword)',
          string: 'var(--color-syntax-string)',
          function: 'var(--color-syntax-function)',
          comment: 'var(--color-syntax-comment)',
          number: 'var(--color-syntax-number)',
        }
      },
      fontFamily: {
        mono: ['Fira Code', 'JetBrains Mono', 'Consolas', 'Monaco', 'monospace'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        }
      },
      animation: {
        'cursor-blink': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
