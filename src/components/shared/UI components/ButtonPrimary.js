import React from "react"
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import {useTheme} from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  viewButton: {
    textTransform: "none"
   },
   outlineButton: {
     border: `2px solid ${theme.palette.common.buttonPurple}`,
     '&:hover': {
       backgroundColor: theme.palette.common.buttonPurple,
       color: "white",
     },
   },

}))


const ButtonPrimary = ({contentText, color, width, marginTop, height, onClick, marginRight})=> {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Button 
     onClick={onClick}
     type="submit"
     variant="outlined" 
     style={{
        color: color || theme.palette.common.textPurple, 
        width: width || "24em",
        marginTop: marginTop || "1.5em",
        height: height || "3em",
        marginRight: marginRight
      }}
     className={classes.viewButton} 
     classes={{root: classes.outlineButton}}
     >
     {contentText}
    </Button>
  )
}

export default ButtonPrimary