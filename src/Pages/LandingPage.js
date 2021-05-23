import React, {useContext} from "react"
import {makeStyles} from '@material-ui/styles'
import Grid from "@material-ui/core/Grid"
import HeaderM from "../components/Landing Components/Introduction Section/HeaderM"
import Headline from "../components/Landing Components/Introduction Section/Headline"
import Waves from "../components/Landing Components/Introduction Section/Waves"
import Headlines from "../components/Landing Components/Features Section/Headlines"
import Features from "../components/Landing Components/Features Section/Features"
import HeadImage from "../components/Landing Components/WhyUs Section/HeadImage"
import Trustedfolks from "../components/Landing Components/WhyUs Section/Trustedfolks"
import News from "../components/Landing Components/News Section/NewsComponent"
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {AuthContext} from "../components/shared/contexts/AuthContext"
import Banner from "../components/Landing Components/Verification Banner /Banner"
import VerifySnackbar from "../components/Landing Components/Verification Banner /VerifySnackbar"


const useStyles = makeStyles(theme => ({
 headpage: {
   backgroundColor: theme.palette.primary.main,
 },
 new: {
    backgroundColor: theme.palette.common.darkPurple
 },
 backdrop: {
  zIndex: theme.zIndex.drawer + 1,
  color: '#fff',
},
}))

const LandingPage = ()=> {
  const {state} = useContext(AuthContext)
  const {spinner, userInfo, isLoggedIn, emailSent} = state
  const classes = useStyles()
  return (
    <>
    <Grid container direction="column" className={classes.headpage} >
       {isLoggedIn && !userInfo.emailVerified && !emailSent ? <Banner />  : null }
       <VerifySnackbar />

      {/* Introduction Page */}
      <Grid item >
        <Grid container direction="column" className={classes.headpage}>
          <HeaderM />
          <Headline />
          <Waves />
        </Grid>
      </Grid>

      {/* Features Page */}
      <Grid item >
        <Grid container direction="column" className={classes.headpage}>
          <Headlines />
          <Features />
        </Grid>
      </Grid>

      {/* WhyUs Page */}
      <Grid item >
        <Grid container direction="column" className={classes.headpage}>
          <HeadImage />
          <Trustedfolks />
        </Grid>
      </Grid>

       {/* News */}
       <Grid item >
        <Grid container direction="column" className={classes.new}>
          <News/>
        </Grid>
      </Grid>

       {/* Testimonials */}
      <Grid item >
        <Grid container direction="column" className={classes.headpage}>
          {/* <Testimonial2/> */}
        </Grid>
      </Grid>
      
    </Grid>
    <Backdrop className={classes.backdrop} open={spinner}>
      <CircularProgress color="inherit" />
    </Backdrop>
    </>
  )
}

export default LandingPage