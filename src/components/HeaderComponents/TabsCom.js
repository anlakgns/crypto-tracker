import React, {useState, useEffect, useContext} from "react"
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import {makeStyles} from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import {Link} from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import {AuthContext} from "../shared/contexts/AuthContext"

const useStyles = makeStyles(theme => ({
  tabContainer: {
    marginLeft: "auto",
    marginRight:"10px",
    color: "white"
  },
  tab: {
    ...theme.typography.tab,
    minWidth: "10px",
    marginLeft: "30px",
  
  },
  tabButton: {
    color: theme.palette.secondary.main,
    textTransform: "none",
    marginLeft:"30px"
  },
}))

const TabsCom = () => {

  const {handleLogout, state} = useContext(AuthContext)

  const [tabValue, setTabValue] = useState(1) // tabs state

  const classes = useStyles();   // Local CSS

  // Tab handler
  const handleTabChange = (event, newValue)=> {
    setTabValue(newValue)
  }

  useEffect(()=>{
    switch(window.location.pathname) {
      case "/features" :
        setTabValue(1)
        break;
      case "/tokensale" :
        setTabValue(3)
          break;
      case "/blog" :
      setTabValue(4)
        break;
      case "/contract" :
        setTabValue(5)
        break;
      case "/auth" :
        setTabValue(6)
        break;
      default: 
        setTabValue(1)
        break;
    }

  }, [tabValue])

  return (
    <>
    <Grid container alignItems="center" >
      <Grid item >
      <Tabs 
        onChange={handleTabChange} 
        value={tabValue}
        className={classes.tabContainer}
        indicatorColor="primary">
        <Tab className={classes.tab} value={1} component={Link} to="/coinmarkets" label="Coin Market"/>
        <Tab className={classes.tab} value={2} component={Link} to="/portfolio" label="Portfolio"/>
        
      </Tabs>
      </Grid>
      <Grid item >
      {state.isLoggedIn 
          ?  <Button variant="outlined" className={classes.tabButton} color="secondary" onClick={handleLogout}>
            Log Out
            </Button> 
          : <Button variant="outlined" className={classes.tabButton} color="secondary" component={Link} to="/auth">
            Log In
            </Button>
      } 
      </Grid>
    </Grid>
      
      
  </>
  )
}

export default TabsCom