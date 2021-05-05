import React from "react"
import {makeStyles} from '@material-ui/styles'
import Grid from "@material-ui/core/Grid"

const useStyles = makeStyles(theme => ({
  mainGrid: {
    backgroundColor: theme.palette.common.blue3,
    marginTop:"1em",
    borderRadius:"0.6em",
  }
}))

export const AssetGraph = ()=> {
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
