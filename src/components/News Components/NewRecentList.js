import React, {useState} from "react"
import NewRecentCard from "./NewRecentCard"
import Grid from "@material-ui/core/Grid"
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import Hidden from "@material-ui/core/Hidden"
import { Typography } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    backgroundColor: theme.palette.common.darkPurple,
    borderRadius:"2em",
    paddingLeft:"1em",
    paddingTop:"1em",
    paddingRight:"1em",
    marginBottom:"1em",
    [theme.breakpoints.down("xs")]: {
      borderRadius: "0em"
    }
  },

  item:{
    paddingBottom:"1em",
  },

  headline:{
    color: "white",
    paddingLeft:"0.5em"
  },
  underline: {
    borderBottom: `2px solid ${theme.palette.secondary.main}`,
    borderRadius: "2px",
    maxWidth:"",
    marginLeft:"0.5em",
    marginBottom:"1em"
  },
  dotsContainer:{
    backgroundColor: "transparent",
    justifyContent:"center",
    marginTop:"-0.6em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "0.5em"
    }
    
  },
  dots: {
    backgroundColor: theme.palette.common.textPurple,
    opacity: 0.5,
  },
  dotActive: {
    opacity: 1
  }
}))



const NewRecentList = ()=> {
  const totalNews= [1,1,1,1,1,1,1]
  const [activePage, setActivePage] = useState(0)
  const theme = useTheme();

  const handleNext = () => {
    setActivePage((prevActivePage) => prevActivePage + 1);
  };
  const handleBack = () => {
    setActivePage((prevActivePage) => prevActivePage - 1);
  };

  const handleStepChange = (page) => {
    setActivePage(page);
  };

  const classes = useStyles();
  return (
    <>
    <Grid container direction="column" className={classes.cardContainer} wrap="nowrap">
      <Grid item >
        <Typography align="left" className={classes.headline}>Recent News</Typography>
        <div className={classes.underline} />
      </Grid>
      <SwipeableViews
        index={activePage}
        onChangeIndex={handleStepChange}
        enableMouseEvents>
        {totalNews.map( (newOne, index) => (
            <>
              <Grid item className={classes.item} > <NewRecentCard /></Grid>
              <Grid item className={classes.item} > <NewRecentCard /></Grid>
              <Grid item className={classes.item} > <NewRecentCard /></Grid>     
              <Grid item className={classes.item} > <NewRecentCard /></Grid>     
            </>
        ))
        }
      </SwipeableViews>   
      <Grid item justify="center" > 
        <MobileStepper 
          classes={{root : classes.dotsContainer, dot: classes.dots, dotActive: classes.dotActive}}
          position="static"
          steps={totalNews.length}
          activeStep={activePage}
          nextButton={
            <Hidden mdDown> <Button
              size="small"
              onClick={handleNext}
              disabled={activePage === totalNews.length - 1}
              >
                <KeyboardArrowRight style={{color: theme.palette.common.textPurple}} />
            </Button>
            </Hidden>}
          backButton={
            <Hidden mdDown>
              <Button size="small" onClick={handleBack} disabled={activePage === 0} >
                <KeyboardArrowLeft style={{color: theme.palette.common.textPurple}}  />
              </Button>
            </Hidden>
          }
          />
      </Grid>
    </Grid>
    </>
  )
}

export default NewRecentList