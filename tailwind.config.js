/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,html}', './src/html/**/*.html'],
  safelist: [
    'max-[400px]:mr-[7px]',
    'max-[400px]:ml-[7px]',
    '-tracking-[0.1]',
    'ml-[8px]',
    'mr-[9px]',
    'text-ui-backgroundFigure2',
    'bg-ui-green',
    'bg-ui-backgroundFigure',
    'bg-ui-backgroundFigure2',
    'underline',
    'font-semibold',
    'border-4',
    'hover:scale-110',
    'border-transparent',
    'hover:border-white',
  ],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        proxima: ['"Proxima Nova"', 'sans-serif'],
      },
      colors: {
        ui: {
          primary: '#fcffff',
          secondary: '#c8d2dc',
          colorBlue: '#68c9ff',
          colorPurple: '#d1b5ff',
          backgroundLanguage: '#212426',
          backgroundBody: '#1d1f21',
          backgroundFigure: '#7e51ff',
          backgroundFigure2: '#86a8ff',
          backgroundFigureMob: '#3626ea',
          green: '#c5ff98',
          backgroundBiography: '#376fff',
          backgroundBiography2: '#5684f8',
          backgroundBiographySecond: '#961de2',
          backgroundPremiumBlue: '#6880ff',
          backgroundPremiumBlue2: '#3ca7f4',
          backgroundPremiumPurple: '#8c45ff',
          backgroundCardHomeNft: '#212426',
          backgroundFigureMobArts: '#1300e8',
          backgroundPricingBlue: '#00ADC5',
          backgroundPricingPurple: '#AD7AFF',
          backgroundBlogInput: '#2C2F33',
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.mask-circle-first': {
          '-webkit-mask': 'radial-gradient(circle, transparent 140px, #000 64px)',
        },
        '.mask-circle-second': {
          '-webkit-mask': 'radial-gradient(circle, transparent 205px, #000 64px)',
        },
        '.mask-circle-first-mob': {
          '-webkit-mask': 'radial-gradient(circle, transparent 101px, #000 64px)',
        },
        '.mask-circle-second-mob': {
          '-webkit-mask': 'radial-gradient(circle, transparent 148px, #000 64px)',
        },
        '.arts-circle-first': {
          '-webkit-mask': 'radial-gradient(circle, transparent 315px, #000 64px)',
        },
        '.arts-circle-second': {
          '-webkit-mask': 'radial-gradient(circle, transparent 215px, #000 64px)',
        },

        '.arts-circle-first--mob': {
          '-webkit-mask': 'radial-gradient(circle, transparent 202px, #000 64px)',
        },

        '.arts-circle-second--mob': {
          '-webkit-mask': 'radial-gradient(circle, transparent 137px, #000 64px)',
        },
        '.get-premium-decor': {
          '-webkit-mask': 'radial-gradient(circle, transparent 192px, #000 64px)',
        },
        '.get-premium-decor-tablet': {
          '-webkit-mask': 'radial-gradient(circle, transparent 145px, #000 64px)',
        },
        '.get-premium-decor-mob': {
          '-webkit-mask': 'radial-gradient(circle, transparent 152px, #000 64px)',
        },
        '.hover': {
          zIndex: '999',
        },
      });
    },
  ],
};
