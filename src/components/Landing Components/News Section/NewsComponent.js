import React from "react"
import Grid from "@material-ui/core/Grid"
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/styles'
import HeadUnderline from "../../shared/UI components/HeadUnderline"
import {Link} from "react-router-dom"

const useStyles = makeStyles(theme => ({

  viewButton: {
    width:"12em",
    height:"3.5em",
    color:theme.palette.common.textPurple,
    marginBottom:"10em",
    marginTop:"5em",
    textAlign:"center",

    
   },
   writeDate: {
    color: theme.palette.secondary.main,
    fontWeight: "600",
    fontSize: "1em",
    marginTop:"2em",
    marginBottom:"1.6em",
    [theme.breakpoints.down("sm")]: {
      textAlign:"center",
      marginTop:"0em"
    }
  },
  headline:{
    fontSize:"1.5em",
    color:"white",
    fontWeight:"300",
    marginBottom:"0.8em",
    [theme.breakpoints.down("sm")]: {
      textAlign:"center"
    }
  },
  outlineButton: {
    border: `2px solid ${theme.palette.common.buttonPurple}`,
    '&:hover': {
      backgroundColor: theme.palette.common.buttonPurple,
      color: "white",
    },
  },

 }))

const News = ()=> {
  const classes = useStyles();
  return (
    <>
    <Grid item>
      <HeadUnderline 
        headline="Latest Crypto News" 
        marginTop="5em" 
        marginBottom="6em" 
        fontSize="1.8em"  />
    </Grid>
    
    <Grid item>
      <Grid container>
        <Grid item container justify="space-evenly">
          <Grid item md={4} >
            <Typography  className={classes.writeDate}> 
              BY LUBOMIR TASSEV • 28 MAR 2018
            </Typography>
            <Typography className={classes.headline}> 
              Nvidia Mining GPU to Be Launched Sooner Than Expected, Reports
            </Typography>
          </Grid>
          <Grid item md={4} >
            <Typography  className={classes.writeDate}> 
              BY ALYSSA HERTIG • 17 MAR 2018
              </Typography>
              <Typography className={classes.headline}> 
              Soft, Hard or Velvet? New Fork Promises Crypto Upgrades Without Controversy
              </Typography>
          </Grid>
        </Grid>
        <Grid item container justify="space-evenly" >
          <Grid item md={4}>
            <Typography  className={classes.writeDate}> 
              BY JAMIE REDMAN • 20 MAR 2018
              </Typography>
              <Typography className={classes.headline}> 
              Bitcoin Classes Are All the Rage for University Students in Chicago
              </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography  className={classes.writeDate}> 
              BY WOLFIE ZHAO • 15 FEB 2018
              </Typography>
              <Typography className={classes.headline}> 
              Anheuser-Busch Owner Pilots Blockchain for Shipping
              </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    <Grid item container justify="center" >
      <Button 
        variant="outlined" 
        className={classes.viewButton} 
        classes={{root: classes.outlineButton}} 
        component={Link} 
        to="/news"
        >
        Latest News
      </Button>
    </Grid>
    </>
  )
}

export default News