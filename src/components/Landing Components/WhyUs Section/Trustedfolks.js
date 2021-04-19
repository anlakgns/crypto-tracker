import React from "react"
import Grid from "@material-ui/core/Grid"
import {makeStyles} from '@material-ui/styles'

import logo1 from "../../../assets/logo_1_light.png"
import logo2 from "../../../assets/logo_2_light.png"
import logo3 from "../../../assets/logo_3_light.png"
import logo4 from "../../../assets/logo_4_light.png"
import logo5 from "../../../assets/logo_5_light.png"
import HeadUnderline from "../../shared/UI components/HeadUnderline"

const useStyles = makeStyles(theme => ({
  headAll: {
    marginTop: "-10em"
  },
  folksLogo: {
    color:"white",
    fontSize: "1.5em",
    textAlign:"center",
    marginTop:"-8em"
  },
  logos:{
    marginRight: "5em",
    marginBottom:"7em",
    marginTop:"-5em",
    opacity:"0.7",
    '&:hover' : {
      opacity: "1",
      color:"white",
    },
  },
  logoContainer: {
    marginLeft:"6em"
  }
 }))

const Trustedfolks = () => {
  const classes = useStyles()

  return (
    <>
      <Grid item className={classes.headAll}  >
        <Grid container direction="column" alignItems="center">
          <Grid item >
            <HeadUnderline headline="Trusted by these folks" fontSize="1.5em" marginBottom="8em" />
          </Grid>
          <Grid item md={10}  className={classes.logoContainer} >
            <img src={logo1} className={classes.logos}  alt="background pattern" />
            <img src={logo2} className={classes.logos}  alt="background pattern" />
            <img src={logo3} className={classes.logos}  alt="background pattern" />
            <img src={logo4} className={classes.logos}  alt="background pattern" />
            <img src={logo5} className={classes.logos}  alt="background pattern" />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
} 

export default Trustedfolks