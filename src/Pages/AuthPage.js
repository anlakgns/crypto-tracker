import React from "react"
import {makeStyles} from '@material-ui/styles'
import Grid from "@material-ui/core/Grid"
import LoginForm from "../components/Auth Components/LoginForm"
import waves from "../assets/graph-dark.svg"
import Header from "../components/HeaderComponents/Header"


const useStyles = makeStyles(theme => ({
 main: {
   backgroundColor: theme.palette.common.blue1
 },
 loginContainer:{
   height: "90vh",
   marginTop:"3em",
 },
 waves: { 
    width:"100%", 
    position:"relative", 
    zIndex:"100"
  }
}))

const Auth = ({logStatus})=> {

  const classes = useStyles()
  return (
    <>
      <Grid 
        container 
        direction="column" 
        className={classes.main} 
      >
        
        {/* Header Section */}
        <Grid item container >
          <Header />
        </Grid>

        {/* Auth Section */}    
        <Grid item container 
          direction="row" 
          className={classes.loginContainer} 
          justify="center" 
          alignItems="center" 
        >
          {/** Login Form **/}
          <Grid item  md={3}  >
            <LoginForm logStatus={logStatus} />
          </Grid>

          {/** Pattern **/}
          <Grid item md={12} >
            <img 
              src={waves} 
              className={classes.waves} 
              alt="background pattern" />
          </Grid>

        </Grid>
      
      </Grid>
    </>
  )
}

export default Auth