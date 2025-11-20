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
        // Neo-Brutalism color palette with OKLCH
        background: 'var(--color-background)',
        'surface-dark': 'var(--bg-dark)',
        'surface-main': 'var(--bg)',
        'surface-light': 'var(--bg-light)',
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
        },
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
        },
        secondary: 'var(--secondary)',
        accent: {
          success: 'var(--color-accent-success)',
          error: 'var(--color-accent-error)',
          warning: 'var(--color-accent-warning)',
        },
        danger: 'var(--danger)',
        warning: 'var(--warning)',
        success: 'var(--success)',
        info: 'var(--info)',
        highlight: 'var(--highlight)',
        border: {
          DEFAULT: 'var(--border)',
          muted: 'var(--border-muted)',
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
        mono: ['VT323', 'monospace'],
        sans: ['VT323', 'monospace'],
      },
      borderWidth: {
        'brutal': 'var(--border-thickness)',
      },
      boxShadow: {
        'brutal': 'var(--shadow-offset) var(--shadow-offset) 0px 0px #000000',
        'brutal-sm': '2px 2px 0px 0px #000000',
        'brutal-lg': '6px 6px 0px 0px #000000',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        }
      },
      animation: {
        'cursor-blink': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blink': 'blink 1s step-end infinite',
      }
    },
  },
  plugins: [],
}
