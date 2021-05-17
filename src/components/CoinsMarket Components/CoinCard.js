import Card from '@material-ui/core/Card';
import Grid from "@material-ui/core/Grid"
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core"

import {Sparkline} from "./Sparkline"

const useStyles = makeStyles(theme => ({
  cardContainer: {
    maxHeight: "8em",
    minHeight: "9em",
    marginBottom:"0.4em",
    backgroundColor: "white",
    color: theme.palette.primary.main,
    border:"0.4em solid ",
    borderRadius:"1em",
    borderColor: theme.palette.primary.light
  },
  gridContainer: {
    padding:"1em",
  },
  cardLogo: {
    maxHeight: 25,
    borderRadius:"50%",
  },
  cardGraph: {
    width: "80%",
    display:"block",
    marginLeft:"auto"
  },
  logoGraphContainer: {
    minHeight:"2.3em",
  }

}))

export const CoinCard = ({imgSource, alt, coinName, coinCode, percentageChangeByDay, price, chartData}) => {
  const classes = useStyles()

  return (
    <Card className={classes.cardContainer}>
      <Grid container 
        direction="column"
        className={classes.gridContainer}>

        {/* Coin Logo & Coin Graph */}
        <Grid item container direction="row" xs={12} alignItems="center" justify="space-between" className={classes.logoGraphContainer}  >
          <Grid item md> 
            <img src={imgSource} alt={alt} className={classes.cardLogo} /> 
          </Grid>
          <Grid item md container justify="flex-end"> 
            <Sparkline chartData={chartData} />
          </Grid>
        </Grid>

        {/* Coin Name  */}
        <Grid item container direction="row" md={12} >
            <Typography  align="left">
               {coinName} <span style={{opacity:0.7}}>{coinCode}</span>
            </Typography>
        </Grid>

        {/* Coin Price & Percentage  */}
        <Grid item container direction="row" md={12}>
          <Grid item md>
            <Typography align="left" style={{fontSize:"1.5em"}}>
               {price}
            </Typography>
          </Grid>
    
          <Grid item md container justify="flex-end" alignItems="center" >
            <Typography align="right" className={classes.percentage} style={{color : percentageChangeByDay > 0 ? "green" : "red"}}>
                {percentageChangeByDay > 0 ? "+" : "-"}{Math.abs(percentageChangeByDay).toFixed(2)}%
            </Typography>
          </Grid>

        </Grid>

      </Grid>
    </Card>

  )
}