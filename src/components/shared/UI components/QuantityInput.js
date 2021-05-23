import {makeStyles, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
  
}))

export const QuantityInput= ({onChange, value, height })=> {
  const classes = useStyles();

  const BootstrapInput = withStyles((theme) => ({
    input: {
      borderRadius: 20,
      position: 'relative',
      backgroundColor: theme.palette.common.textPurple,
      color: theme.palette.common.white,
      border: '1px solid #ced4da',
      fontSize: 16,
      height: height || "1.5em", 
      padding: '0.7em',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderRadius: 20,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);

  return (
    <div>
      <FormControl className={classes.margin}>
        <BootstrapInput 
          value={value} 
          onChange={onChange}
          autoFocus 
          />
      </FormControl>
    </div>
  );
}