import { createMuiTheme } from '@material-ui/core/styles';

const blue1 = "#2E3880";
const blue2 = "#293171";
const blue3 = "#232A60";
const blue4 = "#1D234E";

const pinkblue = "#9758A6"
const pink1 = "#FF78CB"
const pink2= "#FFA2DC"



const white ="#FFFFFF"
const textPurple = "#B4BDFF"
const buttonPurple = "#6d70ff"


export default createMuiTheme({
  palette: {
    common: {
      blue2: `${blue2}`,
      blue3: `${blue3}`,
      blue4: `${blue4}`,

      pinkblue: `${pinkblue}`,
      pink2: `${pink2}`,

      textPurple: `${textPurple}`, 
      buttonPurple : `${buttonPurple}`,
      white: `${white}`
    },
    primary: {
      main: `${blue1}`
    },
    secondary: {
      main: `${pink1}`
    },
  },
  typography: {
    color:"white",
    fontsize: "16px",
    tab:{
      textTransform: "none",
      fontFamily: "roboto",
      fontSize: "0.95rem",
      fontWeight: "400",
    }
  },
})
