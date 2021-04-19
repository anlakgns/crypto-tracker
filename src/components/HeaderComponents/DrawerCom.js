import React,{useState} from "react"
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu'
import {makeStyles} from '@material-ui/styles'
import {Link} from "react-router-dom"
import ListItemText from "@material-ui/core/ListItemText"

// Local CSS
const useStyles = makeStyles(theme => ({
  drawerIconContainer: {
    marginLeft: "auto"
  },
  drawerIcon : {
    height: "50px",
    width: "30px",
    color:"white"
  },
  drawer: {
    backgroundColor: theme.palette.primary.main
  },
  drawerItemText: {
    ...theme.typography.tab,
    color:"white",
    opacity: 0.7,
  },
  drawerItemSelected: {
      "& .MuiListItemText-root": {
        opacity : 1
      },
  },
  tollbarMargin: {
    marginBottom: "5.5em",
    [theme.breakpoints.down("md")]: {
      marginBottom:"4.9em"
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom:"4.4em"
    },
  }

  
}))


const DrawerCom = ()=> {
  const classes = useStyles();   // Local CSS

  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent); // optimal usability for IOS

  const [openDrawer, setOpenDrawer] = useState(false) // Drawer Open/Close State

  const routes = [
    {name: "Features" , link: "/features", activeIndex: "0"},
    {name: "Use Cases" , link: "/usecases", activeIndex: "1"},
    {name: "Token Sale" , link: "/tokensale", activeIndex: "2"},
    {name: "Blog" , link: "/blog", activeIndex: "3"},
    {name: "Contact", link: "/contact", activeIndex: "4"},
  ]

  return (
    <>
      <SwipeableDrawer 
        disableBackdropTransition={!iOS} 
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={()=> setOpenDrawer(false)} 
        onOpen={()=> setOpenDrawer(true)}
        classes={{paper: classes.drawer}}>
          <div className={classes.tollbarMargin} />
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
      </SwipeableDrawer >
      <IconButton className={classes.drawerIconContainer} onClick={()=> setOpenDrawer(!openDrawer)}>
        <MenuIcon className={classes.drawerIcon}/>
      </IconButton>
    </>
  )
}

export default DrawerCom