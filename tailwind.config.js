/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        racing : ["Racing Sans One", 'sans-serif'] ,
        ga : ["Ga Maamli", "sans-serif"]
      } ,
      backgroundImage: {
        'custom-gradient': ' linear-gradient(0deg, rgba(195,189,189,0.3981967787114846) 0%, rgba(167,159,159,0.8239670868347339) 34%, rgba(162,154,154,0.8911939775910365) 49%, rgba(153,145,145,0.9248074229691877) 100%)',
      },
    },
  },
  plugins: [],
};
