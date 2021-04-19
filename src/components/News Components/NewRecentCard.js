import React from "react"
import Grid from "@material-ui/core/Grid"
import { Typography } from "@material-ui/core"
import {makeStyles} from '@material-ui/styles'
import Hidden from "@material-ui/core/Hidden"

const useStyles = makeStyles((theme) => ({
  card:{
    backgroundColor: theme.palette.common.buttonPurple,
    borderRadius: "1.5em",
  
  },
  headlineContainer: {
    color:"white",
    paddingLeft:"1em",
    [theme.breakpoints.down("sm")]: {
      paddingLeft:"0em"
    },
    [theme.breakpoints.down("xs")]: {
      padding:"1em"
    },
  },
  headline: {
    fontSize:"0.7em",
    [theme.breakpoints.down("md")]: {
      padding:"0.7em"
    },
  },
  date:{
    fontSize:"0.6em",
    opacity:"0.7"
  },
  image: {
    backgroundImage: `url("https://images.unsplash.com/photo-1518544648563-3d99717dbe95?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1498&q=80")`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height:"4em",
    borderRadius:"1.5em",
    [theme.breakpoints.down("xs")]: {
      borderRadius: "1.5em",
    }
  },
}))


const NewRecentCard = ()=> {
  const classes = useStyles()
  return (
    <Grid container direction="row" justify="center" alignItems="center" className={classes.card}>
      <Grid item md={10} lg={8}  xs={8} className={classes.headlineContainer} >
        <Typography className={classes.headline} align="left" >
            Cyberpunk 2077 cosplay event in novermber 25
        </Typography >
        <Hidden mdDown>
          <Typography className={classes.date}>
            12.11.2020
          </Typography>
        </Hidden>
      </Grid>
      <Hidden only={["sm", "md"]} >  
          <Grid item xs={4} className={classes.image}></Grid>
      </Hidden>
    </Grid>
  )
}

export default NewRecentCard