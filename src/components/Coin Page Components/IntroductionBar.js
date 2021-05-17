import React from "react";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import { Typography, IconButton } from "@material-ui/core";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import LinkRoundedIcon from "@material-ui/icons/LinkRounded";
import LaunchRoundedIcon from "@material-ui/icons/LaunchRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import CodeRoundedIcon from "@material-ui/icons/CodeRounded";
import {useFormatter} from "../shared/utils/formatterHook"
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  mainContainer:{
    padding:"0 1em",
  },
  logo: {
    width: "90%",
  },
  coinName: {
    color: theme.palette.common.white,
    fontSize: "2em",
    marginLeft: "0.2em",
  },
  coinCode: {
    color:theme.palette.secondary.main,
    backgroundColor:theme.palette.common.blue4,
    padding:"0.1em 0.3em",
    borderRadius: "0.3em",
    marginLeft:"0.5em"
  },
  favorite: {
    color: theme.palette.common.white
  },
  icons: {
    color:theme.palette.common.white,
    fontSize:"1em", 
    verticalAlign:"center",
  },
  linkText:{
    color:theme.palette.common.white,
    fontSize:"0.7em",
  },
  linkGrid:{
    backgroundColor:theme.palette.common.blue4,
    borderRadius:"0.5em",
    marginLeft:"0.5em",
    maxWidth:120,
    padding:"0.2em 0.3em",
    marginTop:"0.3em"

  },
  rightCode:{
    color:theme.palette.common.white,
    opacity:0.8,
    fontSize: "0.8em",
    display:"inline-block",
    marginLeft:"1em"
  },
  rightChange:{
    display:"inline-block",
    color:theme.palette.common.white,
    marginLeft:"1em",
    backgroundColor:"green",
    borderRadius:"0.5em",
    padding:"0.2em 0.6em",
  },
  rightPrice:{
    display:"inline-block",
    color:theme.palette.common.white,
    fontSize:"2.5em",
    lineHeight:"1em"
  },
  progressContainer:{
    marginTop:"0.2em"
  },
  progress: {
    height: "0.8em",
    borderRadius: "1em",
    color: theme.palette.secondary.main
  },
  high:{
    color: theme.palette.common.textPurple,
    fontSize:"0.9em"
  },
  low:{
    color: theme.palette.common.textPurple,
    fontSize:"0.9em",
  }
}));

export const IntroductionBar = ({ coinSingleResponse }) => {
  const {currencyFormatter} = useFormatter()
  const classes = useStyles();

  const priceCurrent =currencyFormatter(coinSingleResponse?.data.market_data.current_price.usd)
  const priceChange = coinSingleResponse?.data.market_data.price_change_percentage_24h.toFixed(2) + "%"
  const coinCode = coinSingleResponse?.data.symbol.toUpperCase()
  const coinName = coinSingleResponse?.data.name
  const high24 = coinSingleResponse?.data.market_data.high_24h.usd
  const low24 = coinSingleResponse?.data.market_data.low_24h.usd
  const progresValue = (coinSingleResponse?.data.market_data.current_price.usd - low24) / (high24-low24) * 100  

  return (
    <>
      <Grid container className={classes.mainContainer} justify="center" >

        {/* Left */}
        <Grid item xs container> 
          {/* First Line */}
          <Grid item container justify="flex-start" alignItems="center">
            <Grid item>
              <img
                src={coinSingleResponse?.data.image.small}
                alt="coin logo"
                className={classes.logo}
              />
            </Grid>
            <Grid item>
              <Typography className={classes.coinName}>
                {coinSingleResponse?.data.name}
              </Typography>
            </Grid>
            <Grid item className={classes.coinCode}>
              <Typography>
                {coinSingleResponse?.data.symbol.toUpperCase()}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton>
                <StarBorderRoundedIcon className={classes.favorite} />
              </IconButton>
            </Grid>
          </Grid>
          {/* Second Line */}
          <Grid item container >

            {/* Link 1 */}
            <Grid item container  justify="center" alignItems="center" className={classes.linkGrid}>
              <Grid item container xs={3} justify="center" alignItems="center">
              <LinkRoundedIcon className={classes.icons} />
              </Grid>
              <Grid item xs={6} >
                <Typography className={classes.linkText} align="center">
                  bitcoin.org
                </Typography>
              </Grid>
              <Grid item container xs={3} justify="center" alignItems="center">
              <LaunchRoundedIcon className={classes.icons} />
              </Grid>
            </Grid>

            {/* Link 2 */}
            <Grid item container  justify="center" alignItems="center" className={classes.linkGrid}>
              <Grid item container xs={3} justify="center" alignItems="center">
              <SearchRoundedIcon className={classes.icons} />
              </Grid>
              <Grid item xs={6} >
                <Typography className={classes.linkText} align="center">
                  Explorer
                </Typography>
              </Grid>
              <Grid item container xs={3} justify="center" alignItems="center">
              <ExpandMoreRoundedIcon className={classes.icons} />
              </Grid>
            </Grid>

            {/* Link 3 */}
            <Grid item container  justify="center" alignItems="center" className={classes.linkGrid}>
              <Grid item container xs={3} justify="center" alignItems="center">
              <PersonRoundedIcon className={classes.icons} />
              </Grid>
              <Grid item xs={6} >
                <Typography className={classes.linkText} align="center">
                  Community
                </Typography>
              </Grid>
              <Grid item container xs={3} justify="center" alignItems="center">
              <ExpandMoreRoundedIcon className={classes.icons} />
              </Grid>
            </Grid>

            {/* Link 4 */}
            <Grid item container  justify="center" alignItems="center" className={classes.linkGrid}>
              <Grid item container xs={2} justify="center" alignItems="center">
              <CodeRoundedIcon className={classes.icons} />
              </Grid>
              <Grid item xs={8} >
                <Typography className={classes.linkText} align="center">
                  Source Code
                </Typography>
              </Grid>
              <Grid item container xs={2} justify="center" alignItems="center">
              <ExpandMoreRoundedIcon className={classes.icons} />
              </Grid>
            </Grid>

            





          </Grid>
        </Grid>

        {/* Right */}
        <Grid item xs container direction="column">
          {/* Coin Code */}
          <Grid item container directiton="column" justify="flex-end">
            <Grid item>
              <Typography align="right" className={classes.rightCode}>
                {coinName} ({coinCode})
              </Typography>
            </Grid>
          </Grid>
          {/* Price & Change Info */}
          <Grid item container directiton="column" justify="flex-end" alignItems="center">
            <Grid item>
              <Typography align="right" className={classes.rightPrice}>
                {priceCurrent}
              </Typography>
            </Grid>
            <Grid item>
              <Typography align="right" className={classes.rightChange}>
                {priceChange}
              </Typography>
            </Grid>
          </Grid>
          {/* Low & High Info */}
            <Grid item container justify="flex-end" alignItems="center" spacing={2} className={classes.progressContainer}>
            <Grid item container justify="center" xs={2}>
                <span className={classes.low}>
                  Low:&nbsp;
                  <span style={{color:"white", fontWeight:"bold", opacity:1}}>
                    {currencyFormatter(low24)}
                  </span>
                </span>
              </Grid>
              <Grid item xs={4}  className={classes.progressGrid}>
                <LinearProgress
                  color="secondary"
                  className={classes.progress}
                  variant="determinate"
                  value={progresValue}
                />
              </Grid>
              <Grid item xs={2} container justify="center">
                <span className={classes.high}>
                  High:&nbsp;
                  <span style={{color:"white", fontWeight:"bold", opacity:1}}>
                    {currencyFormatter(high24)}
                  </span>
                </span>
              </Grid>
              
            </Grid>
        </Grid>
     
      </Grid>
    </>
  );
};
