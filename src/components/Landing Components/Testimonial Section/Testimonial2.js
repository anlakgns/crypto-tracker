import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Avatar from "@material-ui/core/Avatar"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: 'HELEN WADE • UNITED STATES',
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
    message: "I am very happy with all the servies you have provided regarding the miners. Just wanted to say that"
  },
  {
    label: 'HELEN WADE  • UNITED STATES',
    imgPath:
    'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
    message: "I am very happy with all the servies you have provided regarding the miners. Just wanted to say that"
  },
  {
    label: 'HELEN WADE • UNITED STATES',
    imgPath:
    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
    message: "I am very happy with all the servies you have provided regarding the miners. Just wanted to say that"
  },
  {
    label: 'HELEN WADE • UNITED STATES',
    imgPath:
    'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
    message: "I am very happy with all the servies you have provided regarding the miners. Just wanted to say that"
  },
];

const useStyles = makeStyles((theme) => ({
  root: {

    flexGrow: 1,
    margin:"auto",
    position:"relative"

  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },

  back: {
    color:"white",
    position: "absolute",
    top:"27em",
    left:"27em"

  },
  next: {
    color:"white",
    position: "absolute",
    right:"27em",
    top:"27em"
  },
  arrows:{
    width:"2em",
    height:"4em"
  },
  avatar: {
    width:"7em",
    height:"7em",
    margin:"auto",
    overflow:"hidden",
    marginBottom:"-4em",
    marginTop:"10em"
  },
  card:{
    backgroundColor:theme.palette.common.darkPurple,
    margin:"auto",
    padding:"2em",
    marginBottom:"15em",
    marginTop:"-5em",
    overflow:"hidden",
    width:"50%",
  },

  name:{
    textAlign:"center",
    marginTop:"5em",
    color: theme.palette.secondary.main,
    fontWeight:"500",
    fontSize:"0.9em",
    marginBottom:"1em",


  },
  message:{
    textAlign:"center",
    color: "white",
    fontSize:"1.5em",


  },
  swipeapleViews:{
    overflow:"hidden"
  },

  container:{
    width:"100%"
  }
}));



const Testimonial2 = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
       
        <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        className={classes.swipeapleViews}
      >
        {tutorialSteps.map((step, index) => (
          <div key={step.imgPath} className={classes.container}>
            {Math.abs(activeStep - index) <= 2 ? (
              <>
                <Avatar className={classes.avatar} alt="Remy Sharp" src={step.imgPath} classes={{img: classes.image}} />
                <Card className={classes.card}>
                  <CardContent>
                    <Typography  className={classes.name}> 
                      {step.label}
                    </Typography>
                    <Typography className={classes.message}> 
                      {step.message}
                    </Typography>
                  </CardContent>
                </Card>  
              </>       
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>  
        {/* <Button 
          disableRipple
          size="small" 
          className={classes.next} 
          onClick={handleNext} 
          disabled={activeStep === maxSteps - 1}>
              {theme.direction === 'rtl' ? <KeyboardArrowLeft className={classes.arrows} /> : <KeyboardArrowRight className={classes.arrows} />}
        </Button>
        <Button 
          size="small" 
          className={classes.back} 
          onClick={handleBack} 
          disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight className={classes.arrows} /> : <KeyboardArrowLeft className={classes.arrows} />}
          </Button> */}
    </div>
      )
}

export default Testimonial2