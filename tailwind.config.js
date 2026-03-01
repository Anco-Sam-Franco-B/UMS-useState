/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 20px rgba(255,69,0,0.5)',
        'glow-lg': '0 0 40px rgba(255,69,0,0.7)',
        'glow-xl': '0 0 60px rgba(255,69,0,0.9)',
        neon: `
          0 0 5px rgba(255,69,0,0.8),
          0 0 10px rgba(255,69,0,0.8),
          0 0 20px rgba(255,69,0,0.8),
          0 0 40px rgba(255,69,0,0.6)
        `,
      },
      backgroundColor: {
        primary: '#FF4500',
        primaryHover: '#FF6B35',
        backgroundPrimary: '#000000',
        backgroundSecondary: '#0a0a0a',
        backgroundTertiary: '#171717',
        card: '#0a0a0a'
      },
       backgroundImage: {
        gradient: 'linear-gradient(135deg, #FF4500, #FF00FF)',
      },
      textColor: {
        primary: '#ffffff',
        secondary: '#a3a3a3',
        accent: '#FF4500',
        neon: '#FF4500',
      }
    },
  },
  plugins: [],
}