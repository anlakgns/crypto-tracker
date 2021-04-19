import React from "react"
import Grid from "@material-ui/core/Grid"
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import checkout from "../../../assets/checkout-illustration.jpeg"

const useStyles = makeStyles(theme => ({
  headAll: {
    marginTop:"10em"
  },
  image: {
    display:"block",
    overflow:"hidden",
    marginBottom:"15em",
    width:"100%",
    [theme.breakpoints.down("md")]: {
      width:"90%",
      margin:"auto",
      marginBottom:"15em",
    },
    [theme.breakpoints.down("sm")]: {
      width:"90%",
      margin:"auto",
      marginBottom:"0em",
    }
  },
  whycoin: {
    color: theme.palette.secondary.main,
    fontWeight: "600",
    fontSize: "1em",
    marginTop:"2em",
    marginBottom:"1.6em",
    [theme.breakpoints.down("sm")]: {
      textAlign:"center",
      marginTop:"0em"
    }
  },
  headline:{
    fontSize:"2.8em",
    color:"white",
    fontWeight:"300",
    marginBottom:"0.8em",
    [theme.breakpoints.down("sm")]: {
      textAlign:"center"
    }
  },
  subtitle: {
    color: theme.palette.common.textPurple,
    textAlign: "left",
    lineHeight:"1.6em",
    [theme.breakpoints.down("sm")]: {
      textAlign:"center",
      width:"80%",
      margin:"auto"
    }
  },
  missionButton: {
    background: "linear-gradient(135deg, rgba(249,110,198,1) 0%, rgba(213,50,166,1) 100%)",
    width:"12em",
    height:"3.5em",
    color:"white",
    textTransform: "none",
    fontSize:"0.9em",
    marginTop:"3em",
    marginBottom:"20em",
    [theme.breakpoints.down("sm")]: {
      display:"block",
      margin:"auto",
      marginBottom:"12em",
      marginTop:"3em",


    }
   },


 }))

const HeadImage = () => {
  const classes = useStyles()

  return (
    <>
      <Grid item className={classes.headAll}  >
        <Grid container direction="row" justify="center" alignItems="center" >
          <Grid item md={6} lg={5} xl={4}  >
            <img src={checkout} className={classes.image}  alt="background pattern" />
          </Grid>
          <Grid item md={5} lg={4} xl={4} >
               <Typography  className={classes.whycoin}> 
                  WHY COINONE
               </Typography>
               <Typography className={classes.headline}> 
                  Together, We’re Modernizing <br/> Global Payments
               </Typography>
               <Typography className={classes.subtitle}> 
                  It’s the fastest and most scalable digital asset, enabling real-time global payments anywhere in the world.<br/><br/>

                  Today the world sends more than $155 trillion* across borders. Yet, the underlying infrastructure is dated and flawed. Coindash connects banks, payment providers and digital asset exchanges via RippleNet to provide one frictionless experience to send money globally.
               </Typography>
               <Button
                 variant="contained"
                 className={classes.missionButton}>
                 Read our Mission
               </Button>
            </Grid>
        </Grid>
      </Grid>

      <Grid item className={classes.trusters}  >      
      </Grid>
    </>
  )
} 

export default HeadImage