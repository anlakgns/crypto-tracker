import {makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  textField:{
    background: "linear-gradient(320deg, rgba(87,95,153,1) 20%, rgba(255,147,213,1) 100%)",
  },
  textResult:{
    paddingTop:"10px",
    paddingBottom:"10px",
    height:"2.4em",
    color: "white",
  },
  
}))

export const QuantityInput= ({onChange, value })=> {
  const classes = useStyles();

  return (
    <TextField 
      id="outlined-basic"                 
      InputProps={{disableUnderline: true, classes: {input : classes.textResult}}}             
      variant="filled" 
      className={classes.textField} 
      onChange={onChange} 
      value={value}  
    />
  )
}