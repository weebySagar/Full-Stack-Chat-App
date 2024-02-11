/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // colors:{
    //   'primary':'#262626',
    //   'secondary':'#44d7b6',
    //   'white':'#fff'
    // },
    fontFamily:{
      'Lato':['Lato', 'sans-serif']
    },
    extend: {},
  },
  plugins: [
    function ({addUtilities}){
      const newUtilities ={
        ".scrollbar-thin":{
          scrollbarWidth:"thin",
          scollbarColor: "#134e4a"
        },
        ".scrollbar-webkit":{
          "&::-webkit-scrollbar" : {
            width:"8px"
          },
          "&::-webkit-scrollbar-track":{
            background:"transparent"
          },
          "&::-webkit-scrollbar-thumb" :{
            background:"rgb(163 163 163)",
            borderRadius : "20px"
          }
        }
      }

      addUtilities(newUtilities,["responsive","hover"])
    }
  ],
}

