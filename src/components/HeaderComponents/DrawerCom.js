import React,{useState} from "react"
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu'
import {makeStyles} from '@material-ui/styles'
import {Link} from "react-router-dom"
import ListItemText from "@material-ui/core/ListItemText"
import Typography from "@material-ui/core/Typography";
import waves from "../../assets/graph-dark.svg"

const useStyles = makeStyles(theme => ({
  
  // Drawer Menu 
  drawer: {
    backgroundColor: theme.palette.primary.main,
    width: "15em",
    height:"40em",
    borderBottomRightRadius:"2em"
  },
  logo: {
    fontSize: "1.8rem",
    fontFamily: "roboto",
    textTransform: "none",
    textDecoration: "none",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "2em",
    [theme.breakpoints.down("md")]: {
      marginBottom:"2.5em"
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom:"2.5em"
    },
  },
  innerLogo: {
    color: "white",
    fontWeight: "400",
  },
  drawerItemSelected: {
    "& .MuiListItemText-root": {
      opacity : 1
    },
  },
  drawerItemText: {
    ...theme.typography.tab,
    color:"white",
    opacity: 0.7,
  },
  wavePattern: {
    width: "100%",
    height:"100%"
  },
  descriptionText: {
    lineHeight: "1.4rem",
    marginBottom: "1.2rem",
    fontWeight: 400,
    color: theme.palette.common.textPurple,
    padding: "1em"
  },

  // Hamburger Menu Icon
  drawerIconContainer: {
    marginLeft: "auto"
  },
  drawerIcon : {
    height: "50px",
    width: "30px",
    color:"white"
  },  
}))

const DrawerCom = ()=> {
  const classes = useStyles();   // Local CSS
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent); // optimal usability for IOS
  const [openDrawer, setOpenDrawer] = useState(false) 

  const routes = [
    {name: "Home" , link: "/", activeIndex: "0"},
    {name: "Coin Market" , link: "/coinmarket", activeIndex: "1"},
    {name: "Portfolio" , link: "/portfolio", activeIndex: "2"},
  ]

  return (
    <>
      {/* Drawer */}
      <SwipeableDrawer 
        disableBackdropTransition={!iOS} 
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={()=> setOpenDrawer(false)} 
        onOpen={()=> setOpenDrawer(true)}
        classes={{paper: classes.drawer}}>

          {/** Logo  **/}
          <Typography
            color="secondary"
            className={classes.logo}
          >
            <span className={classes.innerLogo}>Coin</span>Tracker
          </Typography>

          {/** Nav List **/}
          <List disablePadding>
            {routes.map((route)=> (
              <ListItem 
                key={route.activeIndex}
                button 
                divider 
                component={Link} 
                to={route.link} 
                onClick={()=> setOpenDrawer(false)}
                selected={window.location.pathname === route.link}
                classes={{selected: classes.drawerItemSelected}}
                >
                <ListItemText 
                  className={classes.drawerItemText} 
                  disableTypography>
                    {route.name}
                </ListItemText>
              </ListItem>
            ))}
          </List>

          {/** Wave Pattern **/}
          <img 
            src={waves} 
            className={classes.wavePattern} 
            alt="background pattern" 
          />

          {/** Website Description Text **/}
          <Typography className={classes.descriptionText}>
            CoinTracker offers user friendly charts with real-time prices. You
            can easily manage your portfolio and watchlist.
          </Typography>

      </SwipeableDrawer >
      
      {/* Hamburger Menu Icon */}
      <IconButton className={classes.drawerIconContainer} onClick={()=> setOpenDrawer(!openDrawer)}>
        <MenuIcon className={classes.drawerIcon}/>
      </IconButton>
    </>
  )
}

export default DrawerCom