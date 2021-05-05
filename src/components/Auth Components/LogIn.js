import React, {useState, useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { Typography } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid"
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { useHistory } from "react-router-dom";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {GlobalContext} from "../shared/global state/globalContext"
import ModalCard from "../shared/UI components/ModalCard"
import ButtonPrimary from "../shared/UI components/ButtonPrimary"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    backgroundColor: "transparent",
  },
  inputs:{
    color:theme.palette.common.textPurple,
    fontSize:"1.1em",
    padding:"0.2em",
    width:"100%"
  },
  inputRoot:{
    textAlign:"left",
    marginLeft: "0.5em",
  },
  headline:{
    color: theme.palette.common.textPurple,
    marginBottom:"1em",
  },
  viewButton: {
    width:"24em",
    height:"3em",
    color:theme.palette.common.textPurple,
    marginTop: "1.5em"
   },
   outlineButton: {
     border: `2px solid ${theme.palette.common.buttonPurple}`,
     '&:hover': {
       backgroundColor: theme.palette.primary.buttonPurple,
       color: "white",
     },
   },
   forgetText:{
    color: theme.palette.common.textPurple,
    fontSize:"0.9em",
    opacity:"0.7"
   },
   underline: {
    '&:after': {
      borderBottom: `2px solid ${theme.palette.common.buttonPurple}`,
    },
    '&:before': {
      borderBottom: `1px solid ${theme.palette.common.buttonPurple}`,
    },
    marginBottom:"0.5em"

  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  error: {
    '&$error:after': {
      borderBottomColor: theme.palette.secondary.main,
    },
  },
}))

const LogIn = ({logStatus})=> {

  const {
      handleLogin, 
      handleSignUp,
      state,
      dispatch,
      ACTIONS, 
      } = useContext(GlobalContext)
  const { spinner, errorMessage, newUser, isLoggedIn, snackOpen } = state  

  const history = useHistory();
  const classes = useStyles();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [hasAccount, setHasAccount] = useState(false)
  const [modalOpen, setModalOpen ] = useState(false)

  const modalHandleClose = () => {
    setModalOpen(false);
    dispatch({type: ACTIONS.SETERRORMESSAGE, payload: false})
  };

  useEffect(()=> {
    if(isLoggedIn && !newUser) history.push("/")
  })

  useEffect(()=> {
    if(errorMessage) setModalOpen(true)
  }, [errorMessage])

  const onLogin = ()=> {
     handleLogin(email, password)
}

  const submitHandler = (e) => {
    e.preventDefault();
  }

  return (
    <>
     
    <Typography variant="h3" align="center" className={classes.headline}>Login</Typography>
    <form className={classes.formContainer} onSubmit={(e)=> submitHandler(e)} >
        <Grid container direction="column">
          { hasAccount === true ? 
             <Grid item >
             <Input
             classes={{underline: classes.underline, input: classes.inputRoot, error: classes.error}}
            //  value={email}
             className={classes.inputs}
             placeholder="Name"
             autoComplete="true"
             error={false}
            //  onChange={(e)=> setEmail(e.target.value)}
             startAdornment={
               <InputAdornment>
                 <AccountCircleIcon />
               </InputAdornment>
             }
           />
           </Grid> : null
           
          }
          <Grid item >
            <Input
            classes={{underline: classes.underline, input: classes.inputRoot, error: classes.error}}
            value={email}
            className={classes.inputs}
            placeholder="Email"
            autoComplete="true"
            error={false}
            onChange={(e)=> setEmail(e.target.value)}
            startAdornment={
              <InputAdornment>
                <MailOutlineIcon />
              </InputAdornment>
            }
          />
          </Grid>
          <Grid item>
            <Input
              classes={{underline: classes.underline, input: classes.inputRoot, error: classes.error }}
              className={classes.inputs}
              value={password}
              autoComplete="current-password"
              placeholder="Password"
              error={false}
              type="password"
              onChange={(e)=> setPassword(e.target.value)}
              startAdornment={
                <InputAdornment>
                  <LockOpenIcon  />
                </InputAdornment>
              }
            />
          </Grid> 
          
         
         { hasAccount === true ? 
          <ButtonPrimary 
            contentText="Sign Up"
            onClick={()=> handleSignUp(email,password)}
          />
          :
          <ButtonPrimary
            contentText="Sign In"
            onClick={onLogin}
          />
           
        }
             
        <Typography align="right" className={classes.forgetText}>{hasAccount === true ? "Have an account?" : "Don't have an account?"} <Button onClick={()=> setHasAccount((prev)=> !prev)} color="secondary" className={classes.btnSignIn}>{hasAccount === true ? "Sign in" : "Sign up"}</Button></Typography>
        
        </Grid>
      </form>
    
    <Backdrop className={classes.backdrop} open={spinner}>
      <CircularProgress color="inherit" />
    </Backdrop>

    <ModalCard
        open= {modalOpen}
        onClose={modalHandleClose}
        headline="Something went wrong"
        btnContext="Ok"
        context={` ${errorMessage}`}
         />
      
    <ModalCard
      open= {snackOpen}
      headline="Verify your Account"
      btnContext="Ok"
      onBtnClick={()=> {dispatch({type: ACTIONS.SETSNACK, payload: false}); history.push("/")}}
      context="Thanks for joining coinOne. We just send a verification link to your mail. Please check your inbox and verify your account." />
    </>
  )
}

export default LogIn