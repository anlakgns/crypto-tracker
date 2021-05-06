import React, {useState} from "react"
import {makeStyles} from '@material-ui/styles'
import Grid from "@material-ui/core/Grid"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import { Typography } from "@material-ui/core";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';


const useStyles = makeStyles(theme => ({
  headline:{
    fontSize:"0.8em"
  },
  headIconContainer: {
    paddingTop:"0.7em",
    paddingLeft:"1em",
    paddingRight:"1em",
    paddingBottom:"0.5em",
  },
  controlIcon:{
    marginLeft:"0.6em",
    fontSize:"1em"
  },
  tab:{
    fontSize:"0.7em", 
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
    height:"1.5em",
  },
  iconGridContainer:{
    display:"flex",
    justifyContent:"flex-end"
  },
  
}))

export const ControlBar = ()=> {
  const classes = useStyles()
  const [tabValue, setTabValue] = useState(0);

  const tabHandler = (_, newValue) => {
    setTabValue(newValue)
  } 



  return (
    <>  
        {/* Headline & Icons */}
        <Grid item container direction="row" alignItems="center" justify="flex-end" className={classes.headIconContainer}>
          <Grid item md>
            <Typography className={classes.headline}>
              My Assets
            </Typography>
          </Grid>
          <Grid item md className={classes.iconGridContainer} >
            <ArrowDownwardIcon className={classes.controlIcon} />
            <SearchIcon className={classes.controlIcon} />
            <AddCircleOutlineOutlinedIcon className={classes.controlIcon} />
          </Grid>
        </Grid>

        {/* Tabs */}
        <Grid item container justify="center" >
          <Tabs className={classes.tabs} classes={{root: classes.tabsRoot}} value={tabValue} onChange={tabHandler}>
            <Tab classes={{root: classes.tabRoot}} className={classes.tab} label="All" />
            <Tab classes={{root: classes.tabRoot}} className={classes.tab} label="Stocks" />
            <Tab classes={{root: classes.tabRoot}} className={classes.tab} label="EFTs" />
            <Tab classes={{root: classes.tabRoot}} className={classes.tab} label="Bonds" />    
          </Tabs>
        </Grid>
        <div className={classes.bottomLine}/>    
    </>
  )
}
