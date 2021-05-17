import React from "react"
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  viewButton: {
    textTransform: "none"
   },
   outlineButton: {
     border: `2px solid ${theme.palette.common.textPurple}`,
     '&:hover': {
       backgroundColor: theme.palette.common.textPurple,
       color: "white",
     },
   },

}))


const ButtonLightPurple = ({contentText, color, width, marginTop, height, onClick, marginRight, marginBottom})=> {
  const classes = useStyles();

  return (
    <Button 
     onClick={onClick}
     type="submit"
     variant="outlined" 
     style={{
        color: color || "white",
        width: width || "24em",
        marginTop: marginTop || "1.5em",
        height: height || "3em",
        marginRight: marginRight,
        marginBottom: marginBottom
      }}
     className={classes.viewButton} 
     classes={{root: classes.outlineButton}}
     >
     {contentText}
    </Button>
  )
}

export default ButtonLightPurple