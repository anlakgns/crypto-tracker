import {makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  textField:{
    background: theme.palette.common.textPurple,
    borderRadius:"30px"

  },
  textResult:{
    paddingTop:"10px",
    paddingBottom:"10px",
    color: "white",
    height:"30px",
  },
  
}))

export const QuantityInput= ({onChange, value, height })=> {
  const classes = useStyles();

  return (
    <TextField 
      id="outlined-basic"                 
      InputProps={{disableUnderline: true, classes: {input : classes.textResult}}}             
      variant="filled" 
      className={classes.textField} 
      onChange={onChange} 
      value={value}  
      style={{height: height || "3em"}}
    />
  )
}