import {makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  textField:{
    background: "linear-gradient(320deg, rgba(87,95,153,1) 20%, rgba(255,147,213,1) 100%)",
    width: "100%",
  },
  textResult:{
    paddingTop:"10px",
    paddingBottom:"10px",
    height:"2.4em",
    color: "white",
  },
  
}))

export const ResultBox= ({value, width, label})=> {
  const classes = useStyles();

  return (
    <TextField  
      variant="filled"   
      className={classes.textField} style={{width : width || "100%" }}
      InputProps={{disableUnderline: true, classes: {input : classes.textResult}}}             
      value={value}
      label={label ? "Total Spent": ""}>
      {value} 
    </TextField>
  )
}