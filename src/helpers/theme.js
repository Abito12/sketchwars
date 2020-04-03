import { createMuiTheme } from "@material-ui/core/styles";

export const lightTheme = createMuiTheme({
    palette: {
       common: {
          text: '#d2d4db',
          white: '#d2d4db',
          grey: '#7e86ae'
        },
        primary: {        
          main: '#202849',
          dark: '#121936',
          light: '#4C5477'
        },
        secondary: { 
          main: '#077fec',
          dark: '#035EAF',
          light: '#4A9EE9'
        },
      background: {
        default: "#202849"
      }
    },
    typography: {
      fontFamily: ['Montserrat', 'sans-serif'].join()
     }
  });

  export const darkTheme = createMuiTheme({
    palette: {
       common: {
          text: '#d2d4db',
          white: '#d2d4db',
          grey: '#7e86ae'
        },
        primary: {        
          main: '#1B0B35',
          dark: '#121936',
          light: '#4C5477'
        },
        secondary: { 
          main: '#077fec',
          dark: '#035EAF',
          light: '#4A9EE9'
        },
      background: {
        default: "#1B0B35"
      }
    },
    typography: {
      fontFamily: ['Montserrat', 'sans-serif'].join()
     }
  });