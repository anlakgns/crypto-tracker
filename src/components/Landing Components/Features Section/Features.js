import React from "react"
import Grid from "@material-ui/core/Grid"
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/styles'
import IconOne from "../../../assets/feature-one.svg"
import IconTwo from "../../../assets/feature-two.svg"
import IconThree from "../../../assets/feature-three.svg"

const useStyles = makeStyles(theme => ({
  heads: {
    fontSize: "1.5em",
    fontWeight: "400",
    color:"white"
  },
  subtitle: {
    color:  theme.palette.common.textPurple,
    textAlign: "center",
    width:"90%",
    margin:"auto",
    marginBottom: "8em"
  },
 }))

const Features = () => {
  const classes = useStyles()

  return (
    <Grid item className={classes.features} style={{textAlign:"center"}} >
      <Grid container direction="row" justify="center">
        <Grid item md={3}>
        <img src={IconOne}  alt="banking icon" />
          <Typography className={classes.heads}>Banking Software</Typography>
          <Typography className={classes.subtitle}>
              Using Coin, banks can source liquidity on demand in real time without having to pre-fund nostro accounts.
          </Typography>
        </Grid>
        <Grid md={3} item>
        <img src={IconTwo}  alt="payment icon" />
          <Typography className={classes.heads} >Banking Software</Typography>
          <Typography className={classes.subtitle}>
              Using Coin, banks can source liquidity on demand in real time without having to pre-fund nostro accounts.
          </Typography>
        </Grid>
        <Grid md={3} item>
        <img src={IconThree}  alt="digital icon" />
          <Typography className={classes.heads} >Banking Software</Typography>
          <Typography className={classes.subtitle}>
              Using Coin, banks can source liquidity on demand in real time without having to pre-fund nostro accounts.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
} 

export default Features