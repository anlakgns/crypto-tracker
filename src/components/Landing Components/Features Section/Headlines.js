import React from "react"
import Grid from "@material-ui/core/Grid"
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import HeadUnderline from "../../shared/UI components/HeadUnderline"

const useStyles = makeStyles(theme => ({
  headAll: {
    marginTop: "-8em",
    [theme.breakpoints.down("md")]: {
      marginTop: "-4em",
    },
    [theme.breakpoints.down("md")]: {
      marginTop: "-2em",
    }
  },
  subtitle: {
    textAlign: "center",
    color:theme.palette.common.textPurple,
    marginBottom:"2em",
    fontSize: "1.4em",
  },
  viewButton: {
   width:"12em",
   height:"3.5em",
   color:theme.palette.common.textPurple,
  },
  outlineButton: {
    border: `2px solid ${theme.palette.common.buttonPurple}`,
    '&:hover': {
      backgroundColor: theme.palette.common.buttonPurple,
      color: "white",
    },
  },
  coinEverywhere: {
    marginTop: "10em",
    color:"white",
    fontSize: "1.5em",
  },
  underline: {
    borderBottom: `3px solid ${theme.palette.secondary.main}`,
    borderRadius: "2px",
    width: "10em",
    margin:"auto",
    marginBottom: "6em",
  }
 }))

const Headlines = () => {
  const classes = useStyles()

  return (
    <Grid item className={classes.headAll} style={{textAlign:"center"}} >
      <Typography variant="subtitle1" className={classes.subtitle}> 
        Built for enterprise use, Coin offers banks and payment <br/> providers a reliable, on-demand option to source liquidity for <br/>cross-border payments.
      </Typography>
      <Button variant="outlined" className={classes.viewButton} classes={{root: classes.outlineButton}}>
        View Features
      </Button>
      <HeadUnderline headline="Coin Everywhere" fontSize="1.5em" marginTop="6em" marginBottom="4em" />

  </Grid>
  )
} 

export default Headlines