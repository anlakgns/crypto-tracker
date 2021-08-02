import React from "react"
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid"
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import ButtonArrow from "../../shared/UI components/ButtonArrow"

const useStyles = makeStyles(theme => ({
  headAll: {
    color: "white",
    padding:"em",
    marginTop:"6em",
  },
  headline:{
    marginBottom: "0.6em",
  },
  subtitle: {
    textAlign: "center",
    color:theme.palette.common.textPurple,
    marginBottom:"2em",
    fontSize: "1.1em"
  },
  exploreButton: {
   background: "linear-gradient(135deg, rgba(249,110,198,1) 0%, rgba(213,50,166,1) 100%)",
   width:"12em",
   height:"3.5em"
  },
  digitalAssets:{
    color: theme.palette.secondary.main,
    fontWeight: "400"
  }

 }))

const Headline = () => {
  const history = useHistory()
  const classes = useStyles()

  return (
    <Grid item className={classes.headAll} style={{textAlign:"center"}} >
      <Typography variant="h3" className={classes.headline}> 
        The <span className={classes.digitalAssets}>Cryptocurrency Tracker</span> for Your Coins
      </Typography>
      <Typography variant="subtitle1" className={classes.subtitle}> 
        Coin tracker offers user friendly charts with real-time prices. <br />
        You can easily manage your portfolio and watchlist.
      </Typography>
      <Button
            variant="contained"
            className={classes.exploreButton}
            onClick={()=> history.push("/coinmarkets")}
          >
            <span style={{ marginRight: 5, color:"white" }}>Explore Coins</span>
            <ButtonArrow
              width={20}
              height={20}
              fill={"white"}
            />
      </Button>
  </Grid>
  )
} 

export default Headline