import React from "react"
import {makeStyles} from '@material-ui/styles'
import Grid from "@material-ui/core/Grid"
import LogIn from "../components/Auth Components/LogIn"
import waves from "../assets/graph-dark.svg"
import Waves from "../components/Landing Components/Introduction Section/Waves"


const useStyles = makeStyles(theme => ({
  allPage: {
   backgroundColor: theme.palette.common.darkPurple
 },
 LoginContainer:{
   height: "90vh",
   marginTop:"6em",

 },
 waves: { 
    width:"100%", 
    position:"relative", 
    zIndex:"100"
  }
}))

const LandingPage = ({logStatus})=> {
  const classes = useStyles()
  return (
    <>
    <Grid container direction="column" className={classes.allPage} >
      

      {/* Auth Section */}    
      <Grid item container direction="row" className={classes.LoginContainer} justify="center" alignItems="center" >
        <Grid item  md={3}  >
          <LogIn logStatus={logStatus} />
        </Grid>
        <Grid item md={12} >
          <img src={waves} className={classes.waves} alt="background pattern" />
        </Grid>
     
      </Grid>
    </Grid>
    </>
  )
}

export default LandingPage