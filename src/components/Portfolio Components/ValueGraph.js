import React from "react"
import {makeStyles} from '@material-ui/styles'
import Grid from "@material-ui/core/Grid"

const useStyles = makeStyles(theme => ({
  mainGrid: {
    backgroundColor: theme.palette.common.blue3,
    marginBottom:"1em",
    marginRight:"1em",
    borderRadius:"0.6em",
  }
}))

export const ValueGraph = ()=> {
  const classes = useStyles()
  return (
    <>

    <Grid 
      container 
      className={classes.mainGrid} 
      xs={12} >
      
  
    </Grid>

    </>
  )
}

