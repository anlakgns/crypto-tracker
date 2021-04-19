import React from "react"
import Grid from "@material-ui/core/Grid"
import { Typography } from "@material-ui/core"
import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  card:{
    height:"19.5em",
    backgroundColor:theme.palette.common.buttonPurple,
    borderRadius:"2em",
    overflow:"hidden",
    [theme.breakpoints.down("xs")]: {
      borderRadius: "1em"
    }
  },
  image: {
    backgroundImage: `url("https://images.unsplash.com/photo-1518544648563-3d99717dbe95?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1498&q=80")`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    borderRadius:"2em",
    height:"15em",
    [theme.breakpoints.down("xs")]: {
      height: "16em"
    }
  },
  headlineContainer: {
     color: "white",
    padding:"0.5em"
  },  
  headline:{
    [theme.breakpoints.down("sm")]: {
      fontSize:"0.9em",
      padding:"1em"
    }
  }
}))


const NewCard = ()=> {
  const classes = useStyles()
  return (
    <Grid container direction="column" alignItems="center" className={classes.card}>
      <Grid item className={classes.image}/>
      <Grid item className={classes.headlineContainer} >
        <Typography className={classes.headline} align="center" >
            Cyberpunk 2077 cosplay event in novermber 25
        </Typography >
      </Grid>
      
    </Grid>
  )
}

export default NewCard