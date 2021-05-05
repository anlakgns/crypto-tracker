import React, {useState} from "react"
import {makeStyles} from '@material-ui/styles'
import Grid from "@material-ui/core/Grid"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import { Typography } from "@material-ui/core";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';


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

export const AssetList = ()=> {
  const classes = useStyles()
  const [tabValue, setTabValue] = useState(0);

  const tabHandler = (_, newValue) => {
    setTabValue(newValue)
  } 



  return (
    <>
    <Grid 
      container 
      direction="column"
      className={classes.mainGrid} 
      >
      
      {/* Control Bar */}
      <Grid item container direction="column" className={classes.controlBar}>
        
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

      </Grid>

      {/* Asset List */}
      <Grid item container>
        <List>
          <ListItem button> 
            <ListItemText primary={""} />
            <ListItemIcon classes={{root: classes.iconContainer}} >
              Icon
            </ListItemIcon>
          </ListItem>
        </List>

      </Grid>
  
    </Grid>

    </>
  )
}
