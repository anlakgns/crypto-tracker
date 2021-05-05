import React, {useContext} from "react"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/styles'
import {GlobalContext} from "../../shared/global state/globalContext"


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  alertRootSucces: {
   backgroundColor: "rgba(213,50,166,1)",
 },
  }))


const VerifySnackbar = () => {
  const classes = useStyles()
  const {emailSent, emailSentError, snackOpen, setSnackOpen} = useContext(GlobalContext)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackOpen(false);
  };


  return (
    <>
    {emailSentError && !emailSent ?  
       <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleClose}>
         <Alert onClose={handleClose}  severity="error">
         The email couldn't send. Please later try again.
         </Alert>
       </Snackbar> : 
       <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} classes={{root: classes.alertRootSucces}} severity="success">
        The email send succesfully.
        </Alert>
      </Snackbar>
    }
    </>
  )   
}

export default VerifySnackbar