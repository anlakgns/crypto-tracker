import {makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  textField:{
    background: theme.palette.common.textPurple,
    width: "100%",
    borderRadius:"30px"
  },
  textResult:{
    paddingTop:"10px",
    paddingBottom:"10px",
    height:"30px",
    color: "white",
  },
  
}))

export const ResultBox= ({value, width, label, height})=> {
  const classes = useStyles();

  return (
    <TextField  
      variant="filled"   
      className={classes.textField} style={{width : width || "100%", height: height || "3em" }}
      InputProps={{disableUnderline: true, classes: {input : classes.textResult}}}             
      value={value}
      label={label ? "Total Spent": ""}
      >
      {value} 
    </TextField>
  )
}