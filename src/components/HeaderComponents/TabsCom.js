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
  const classes = useStyles();   
  const {handleLogout, state} = useContext(AuthContext)
  const [tabValue, setTabValue] = useState(1) 


  // Tab handler
  const handleTabChange = (_, newValue)=> {
    setTabValue(newValue)
  }

  // Bug fix : always synchronizationed tabs.
  useEffect(()=>{
    switch(window.location.pathname) {
      case "/" :
        setTabValue(1)
        break;
      case "/coinmarkets" :
        setTabValue(2)
          break;
      case "/portfolio" :
      setTabValue(3)
        break;
      default: 
        setTabValue(1)
        break;
    }
  }, [tabValue])

  return (
    <>
      <Grid container alignItems="center" >
        
        {/* Tabs */}
        <Grid item >
          <Tabs 
            onChange={handleTabChange} 
            value={tabValue}
            className={classes.tabContainer}
            indicatorColor="primary"
          >
            <Tab 
              className={classes.tab} 
              value={1} 
              component={Link} 
              to="/" 
              label="Home"
            />
            <Tab 
              className={classes.tab} 
              value={2} 
              component={Link} 
              to="/coinmarket" 
              label="Coin Market"
            />
            <Tab 
              className={classes.tab} 
              value={3} 
              component={Link} 
              to="/portfolio" 
              label="Portfolio"
            />
            
          </Tabs>
        </Grid>

        {/* Login & Logout */}
        <Grid item >
          {state.isLoggedIn 
              ?  <Button 
                    variant="outlined" 
                    className={classes.tabButton} 
                    color="secondary" 
                    onClick={handleLogout}
                  >
                    Log Out
                 </Button> 
              : 
                 <Button 
                    variant="outlined" 
                    className={classes.tabButton} 
                    color="secondary" 
                    component={Link} 
                    to="/auth"
                 >
                    Log In
                </Button>
          } 
        </Grid>
      </Grid>
    </>
  )
}

export default TabsCom