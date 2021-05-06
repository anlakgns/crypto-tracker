import React from "react"
import {makeStyles} from '@material-ui/styles'
import Grid from "@material-ui/core/Grid"
import {CoinList} from "./CoinList"
import {ControlBar} from "./ControlBar"

const useStyles = makeStyles(theme => ({
  mainGrid: {
    backgroundColor: theme.palette.common.blue3,
    borderRadius:"0.6em",
    color: theme.palette.common.white,
  },
  controlBar:{
    borderTopRightRadius:"0.6em",
    borderTopLeftRadius:"0.6em",
    backgroundColor: theme.palette.common.blue2,
  },
  headline:{
    fontSize:"0.9em"
  },
  headIconContainer: {
    padding:"1em",
  },
  controlIcon:{
    marginLeft:"0.6em",
    fontSize:"1.2em"
  },
  tab:{
    fontSize:"0.75em", 
  },
  tabs:{
  },
  tabRoot: {
    minWidth: "100px",
    padding:"0",
    textTransform:"none",
    minHeight:"0"
  },
  tabsRoot:{
    padding:"0",
    minHeight:"0",
    height:"2em",
  },
  iconGridContainer:{
    display:"flex",
    justifyContent:"flex-end"
  },
  
}))

export const AssetListContainer = ()=> {
  const classes = useStyles()



  return (
    <>
    <Grid 
      container 
      direction="column"
      className={classes.mainGrid} 
      >
      
      {/* Control Bar */}
      <Grid item container direction="column" className={classes.controlBar}>   
        <ControlBar /> 
      </Grid>

      {/* Asset List */}
      <Grid item container>
        <CoinList />
      </Grid>
  
    </Grid>

    </>
  )
}
