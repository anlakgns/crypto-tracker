import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import { Typography, Tooltip } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import { useFormatter } from "../shared/utils/formatterHook";
import LinearProgress from "@material-ui/core/LinearProgress";
import useMediaQuery from "@material-ui/core/useMediaQuery"

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    marginTop: "2em",
  },
  cardContainer: {
    backgroundColor: theme.palette.common.blue3,
    padding: "1em",
    borderRadius: "1em",
    marginBottom:"1em",
    "@media (max-width:500px)": {
      marginBottom: "1em",
    },
  },
  marketCapText: {
    fontSize: "0.8em",
  },
  FirstLineMC: {
    opacity: "0.7",
    color: theme.palette.common.white,
  },
  tooltip: {
    backgroundColor: theme.palette.secondary.main,
  },
  marketCapNumberChange: {
    color: theme.palette.common.white,
    fontSize: "0.7em",
    backgroundColor: "green",
    borderRadius: "0.5em",
    padding: "0.1em 0.3em",
    marginTop: "0.1em",
  },
  marketCapNumber: {
    color: theme.palette.common.white,
    marginTop: "0.1em",
    fontSize: "0.9em",
  },
  progress: {
    height: "0.8em",
    borderRadius: "1em",
    color: theme.palette.secondary.main,
  },
}));

export const StatisticBar = ({ singleCoinResponse }) => {
  const classes = useStyles();
  const { currencyFormatter, numberFormatter } = useFormatter();
  const [formattedData, setFormattedData] = useState({});
  const matchesIphoneX = useMediaQuery('(max-width:500px)');

  // Data Formatted & Editted
  useEffect(() => {
    setFormattedData({
      marketCap: currencyFormatter(
        singleCoinResponse?.data.market_data.market_cap.usd
      ),
      marketCapChange:
        singleCoinResponse?.data.market_data.market_cap_change_percentage_24h.toFixed(
          2
        ) + "%",
      coinCode: singleCoinResponse?.data.symbol.toUpperCase(),
      dilutedMarketCap: currencyFormatter(
        singleCoinResponse?.data.market_data.fully_diluted_valuation.usd
      ),
      allTimeHighPrice: currencyFormatter(
        singleCoinResponse?.data.market_data.ath.usd
      ),
      allTimeHighDate: singleCoinResponse?.data.market_data.ath_date.usd,
      circulatingSupply: numberFormatter(
        singleCoinResponse?.data.market_data.circulating_supply
      ),
      totalSupply: numberFormatter(
        singleCoinResponse?.data.market_data.total_supply
      ),
      progressValue:
        (singleCoinResponse?.data.market_data.circulating_supply /
          singleCoinResponse?.data.market_data.total_supply) *
        100,
    });
  }, [singleCoinResponse, currencyFormatter, numberFormatter]);

  return (
    <>
      <Grid container direction="row" className={classes.mainContainer}>
        
        {/* Group 1 for reponsiveness */}
        <Grid item container md >
          
          {/** Market Cap **/}
          <Grid item container xs={matchesIphoneX ? 12 :6 } justify="center">
            <Grid
              item
              container
              xs={11}
              direction="column"
              justify="center"
              alignItems="center"
              className={classes.cardContainer}
            >
              <Grid item container className={classes.FirstLineMC}>
                <Grid item>
                  <Typography className={classes.marketCapText}>
                    Market Cap
                  </Typography>
                </Grid>
                <Grid item>
                  <Tooltip
                    title="The total market value of a cryptocurrency's circulating supply. It is analogous to the free-float capitalization in the stock market.
                  Market Cap = Current Price x Circulating Supply."
                    interactive
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <InfoIcon
                      style={{ fontSize: "0.9em", marginLeft: "0.2em" }}
                    />
                  </Tooltip>
                </Grid>
              </Grid>

              <Grid item container className={classes.SecondaLineMC}>
                <Grid item>
                  <Typography className={classes.marketCapNumber}>
                    {formattedData.marketCap}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item container className={classes.SecondaLineMC}>
                <Grid item>
                  <Typography className={classes.marketCapNumberChange}>
                    {formattedData.marketCapChange}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/** Fully Diluted Market Cap **/}
          <Grid item container xs={matchesIphoneX ? 12 :6 } justify="center">
          <Grid
            item
            container
            xs={11}
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.cardContainer}
          >
            <Grid item container className={classes.FirstLineMC}>
              <Grid item>
                <Typography className={classes.marketCapText}>
                  Fully Diluted Market Cap
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip
                  title="The market cap if the max supply was in circulation.
                    Fully-diluted market cap (FDMC) = price x max supply. If max supply is null, FDMC = price x total supply. if max supply and total supply are infinite or not available."
                  interactive
                  classes={{ tooltip: classes.tooltip }}
                >
                  <InfoIcon
                    style={{ fontSize: "0.9em", marginLeft: "0.2em" }}
                  />
                </Tooltip>
              </Grid>
            </Grid>

            <Grid item container className={classes.SecondaLineMC}>
              <Grid item>
                <Typography className={classes.marketCapNumber}>
                  {formattedData.dilutedMarketCap}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        
        </Grid>

        {/* Group 2 for responsiveness */}
        <Grid item container md>
          {/** All Time High  **/}
          <Grid item container xs={matchesIphoneX ? 12 : 6 } justify="center">
            <Grid
              item
              container
              xs={11}
              direction="column"
              justify="center"
              alignItems="center"
              className={classes.cardContainer}
            >
              <Grid item container className={classes.FirstLineMC}>
                <Grid item>
                  <Typography className={classes.marketCapText}>
                    All Time High Price
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                item
                container
                className={classes.SecondaLineMC}
                style={{ marginBottom: "1em" }}
              >
                <Grid item>
                  <Typography className={classes.marketCapNumber}>
                    {formattedData.allTimeHighPrice}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item container className={classes.FirstLineMC}>
                <Grid item>
                  <Typography className={classes.marketCapText}>
                    All Time High Date
                  </Typography>
                </Grid>
                <Grid item></Grid>
              </Grid>

              <Grid item container className={classes.SecondaLineMC}>
                <Grid item>
                  <Typography className={classes.marketCapNumber}>
                    {formattedData.allTimeHighDate}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/** Circulating Supply **/}
          <Grid item container xs={matchesIphoneX ? 12 : 6 } justify="center">
          <Grid
            item
            container
            xs={11}
            direction="column"
            alignItems="center"
            className={classes.cardContainer}
          >
            <Grid item container className={classes.FirstLineMC}>
              <Grid item>
                <Typography className={classes.marketCapText}>
                  Circulating Supply
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip
                  title="The market cap if the max supply was in circulation.
                      Fully-diluted market cap (FDMC) = price x max supply. If max supply is null, FDMC = price x total supply. if max supply and total supply are infinite or not available."
                  interactive
                  classes={{ tooltip: classes.tooltip }}
                >
                  <InfoIcon
                    style={{ fontSize: "0.9em", marginLeft: "0.2em" }}
                  />
                </Tooltip>
              </Grid>
            </Grid>

            <Grid
              item
              container
              justify="space-between"
              className={classes.SecondaLineMC}
            >
              <Grid item>
                <Typography className={classes.marketCapNumber}>
                  {formattedData.circulatingSupply +
                    " " +
                    formattedData.coinCode}
                </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.marketCapNumber}>
                  {formattedData.progressValue?.toFixed(0) + "%"}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              item
              className={classes.SecondaLineMC}
              style={{ width: "100%", marginTop: "0.8em" }}
            >
              <LinearProgress
                color="secondary"
                className={classes.progress}
                variant="determinate"
                value={formattedData.progressValue}
              />
            </Grid>

            <Grid
              item
              container
              justify="space-between"
              style={{ marginTop: "1em" }}
            >
              <Grid item container xs className={classes.FirstLineMC}>
                <Grid item>
                  <Typography
                    className={classes.marketCapText}
                    style={{ fontSize: "0.7em" }}
                  >
                    Max Supply
                  </Typography>
                </Grid>
                <Grid item>
                  <Tooltip
                    title="The total market value of a cryptocurrency's circulating supply. It is analogous to the free-float capitalization in the stock market.
                      Market Cap = Current Price x Circulating Supply."
                    interactive
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <InfoIcon
                      style={{ fontSize: "0.9em", marginLeft: "0.2em" }}
                    />
                  </Tooltip>
                </Grid>
              </Grid>
              <Grid item container xs justify="flex-end">
                <Typography
                  className={classes.marketCapNumber}
                  style={{ fontSize: "0.7em" }}
                >
                  {formattedData.totalSupply}
                </Typography>
              </Grid>
            </Grid>

            <Grid item container justify="space-between">
              <Grid item container xs className={classes.FirstLineMC}>
                <Grid item>
                  <Typography
                    className={classes.marketCapText}
                    style={{ fontSize: "0.7em" }}
                  >
                    Circulating Supply
                  </Typography>
                </Grid>
                <Grid item>
                  <Tooltip
                    title="The total market value of a cryptocurrency's circulating supply. It is analogous to the free-float capitalization in the stock market.
                      Market Cap = Current Price x Circulating Supply."
                    interactive
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <InfoIcon
                      style={{ fontSize: "0.9em", marginLeft: "0.2em" }}
                    />
                  </Tooltip>
                </Grid>
              </Grid>
              <Grid item container xs justify="flex-end">
                <Typography
                  className={classes.marketCapNumber}
                  style={{ fontSize: "0.7em" }}
                >
                  {formattedData.circulatingSupply}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        </Grid>
      
      </Grid>
    </>
  );
};
