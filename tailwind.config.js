module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        '2sm': '599px',
        '3sm': '399px',
        '2md': '864px',
        '4xl': '1282px',
        '4sm':"580px"
      },
         scale: {
        '102': '1.02', // Custom scale value for 102%
        '101': '1.01', // Optional: add others if needed
        '98': '0.98',  // Optional: scale down
      },
      colors: {
        primary: '#1967D2',
        secondary: '#e5e7eb',
        IntColor: '#f9fafb',
        textColor:'#314259',
        
        accent: '#10b981',
        borderColor: '#dc2626',
        fontColor: '#35393e',
        danger: '#ef4444',
        customgray: '#f3f4f6',
      },
      padding: {
        '5p': '5%',
        '10p': '10%',
        '18': '4.5rem',
      },
      margin: {
        '5p': '5%',
        '10p': '10%',
        '18': '4.5rem',
      },

      boxShadow: {
        custom: '0 4px 8px rgba(0, 0, 0, 0.1), 0 -4px 8px rgba(0, 0, 0, 0.1), 4px 0 8px rgba(0, 0, 0, 0.1), -4px 0 8px rgba(0, 0, 0, 0.1)',
        small: '0 2px 2px rgba(0, 0, 0, 0.1), 0 -2px 2px rgba(0, 0, 0, 0.1), 2px 0 2px rgba(0, 0, 0, 0.1), -2px 0 2px rgba(0, 0, 0, 0.1)',
        shadowsmall: '0px 0px 30px 0px rgba(19, 105, 235, 0.1)'
      }
    },
  },
  plugins: [],
}
