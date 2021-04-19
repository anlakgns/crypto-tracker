import React, {useState} from "react"
import NewHeroCard from "./NewHeroCard"
import Grid from "@material-ui/core/Grid"
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import Hidden from "@material-ui/core/Hidden"

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    backgroundColor: "white",
    borderRadius:"2em",
    paddingTop:"1em",
    marginBottom:"2em",
    overflow:"hidden",
    [theme.breakpoints.down("xs")]: {
      borderRadius:"0em"
    }
  },
  item:{
    paddingLeft:"1em",
    paddingRight:"1em",
  },
  dotsContainer:{
    backgroundColor: "transparent",
    margin:"auto",
    [theme.breakpoints.down('md')]: {
      justifyContent:"center",
      marginBottom:"1em"
    },
  },
  dots: {
    backgroundColor: theme.palette.common.textPurple,
    opacity: 0.5,
  },
  dotActive: {
    opacity: 1
  }


}))



const NewHeroList = ()=> {
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
      {/* <Grid item ><HeadUnderline headline="Recent News" marginTop="-0.8em" marginBottom="2em"/></Grid> */}
      <SwipeableViews
        index={activePage}
        onChangeIndex={handleStepChange}
        enableMouseEvents>
        {totalNews.map( (newOne, index) => (
            <>
              <Grid item className={classes.item} > <NewHeroCard /></Grid>
            </>
        ))
        }
      </SwipeableViews>   
      <Grid item className={classes.item} justify="center" > 
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

export default NewHeroList