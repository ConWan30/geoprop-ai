/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        iotex: {
          primary: '#00D4AA',
          secondary: '#1A1A2E',
          dark: '#16213E',
          accent: '#0F3460'
        },
        cyber: {
          neon: '#00FFFF',
          pink: '#FF10F0',
          purple: '#8A2BE2',
          green: '#39FF14'
        }
      },
      animation: {
        'pulse-cyber': 'pulse-cyber 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'neural': 'neural 3s linear infinite',
      },
      keyframes: {
        'pulse-cyber': {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '.7',
            transform: 'scale(1.05)',
          },
        },
        'glow': {
          'from': {
            'text-shadow': '0 0 20px #00D4AA, 0 0 30px #00D4AA, 0 0 40px #00D4AA',
          },
          'to': {
            'text-shadow': '0 0 10px #00D4AA, 0 0 20px #00D4AA, 0 0 30px #00D4AA',
          },
        },
        'neural': {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0px)' },
        },
      },
    },
  },
  plugins: [],
}