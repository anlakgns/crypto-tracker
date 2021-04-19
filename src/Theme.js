import { createMuiTheme } from '@material-ui/core/styles';

const purple = "#2E3880";
const darkPurple = "#293171"
const lightPurple = "rgb(180,189,255)"
const textPurple = "#B4BDFF"
const buttonColor = "#6d70ff"

const pink = "#FF78CB"
const white= "#FFFFFF"

export default createMuiTheme({
  palette: {
    common: {
      purple: `${purple}`,
      pink: `${pink}`,
      lightPurple: `${lightPurple}`, 
      darkPurple: `${darkPurple}`, 
      textPurple: `${textPurple}`, 
      buttonPurple : `${buttonColor}`,
      white: `${white}`
    },
    primary: {
      main: `${purple}`
    },
    secondary: {
      main: `${pink}`
    },
    tertiary: {
      main: `${white}`
    }
  },
  typography: {
    fontsize: "16px",
    tab:{
      textTransform: "none",
      fontFamily: "roboto",
      fontSize: "0.95rem",
      fontWeight: "400",
    }
  },
})