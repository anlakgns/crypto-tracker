import React, {useState, useContext} from "react"
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import ButtonPrimary from "../../shared/UI components/ButtonPrimary"
import {makeStyles} from '@material-ui/styles'
import Grid from "@material-ui/core/Grid"
import {PortfolioContext} from "../../shared/contexts/PortfolioContext"




const useStyles = makeStyles(theme => ({
 "@keyframes showUp" :{
   "0%": {
     opacity:"0",
     transform: "translateY(-200%)",
 
   },
   "100%": {
     opacity:"1",
     transform: "translateY(0%)",
   }
 },
 "@keyframes disappear" :{
   "0%": {
     opacity:"1",
     transform: "translateY(0%)",
   },
   "100%": {
     opacity:"0",
     transform: "translateY(-200%)",
     visibility:"hidden"
   }
 },
 bannerShowUp: {
   padding:"1em",
   backgroundColor: "rgba(213,50,166,1)",
   position: "relative",
   animation:" $showUp 2s",
   marginBottom: "-1em"
 },
 bannerDisappear: {
   padding:"1em",
   backgroundColor: "rgba(213,50,166,1)",
   position: "relative",
   animation:" $disappear 2s",
   animationFillMode:"forwards",
   marginBottom: "-1em"
 },
 alertRoot: {
  backgroundColor: "rgba(213,50,166,1)",
}
 
 }))


const Banner = ()=> {
  const classes = useStyles()
  const [verifyBanner, setVerifyBanner] = useState(true)
  const {handleVerify} = useContext(PortfolioContext)


  return (
    <>
    <AppBar className={ verifyBanner ? classes.bannerShowUp : classes.bannerDisappear }  >
         <Grid container direction="row" justify="space-around" alignItems="center" >
           <Grid item  >
            <Typography align="center">Please verify your acccount to make use of all features we provide.</Typography>
           </Grid>
           <Grid item>
            <ButtonPrimary contentText="Ok" width="1em" marginTop="0" marginRight="1em" height="2em" color="white" onClick={()=> setVerifyBanner(false)}/>
            <ButtonPrimary contentText="Re-send verification mail" width="15em" marginTop="0" marginRight="1em" height="2em" color="white" onClick={()=> {handleVerify(); setVerifyBanner(false)}}/>
           </Grid>
         </Grid>
    </AppBar>
  </>
  )
}

export default Banner