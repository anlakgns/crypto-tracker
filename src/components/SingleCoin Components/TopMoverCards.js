import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { PortfolioContext } from "../shared/contexts/PortfolioContext";
import { CoinCard } from "../CoinsMarket Components/CoinCard";
import { useFormatter } from "../shared/utils/formatterHook";

const useStyles = makeStyles((theme) => ({
  cardsGrid: {
    padding: "1em",
  },
  headline: {
    fontSize: "1.5em",
    color: theme.palette.secondary.main,
    marginLeft: "1em",
  },
}));

export const TopMoverCards = () => {
  const classes = useStyles();
  const { coinListResponse } = useContext(PortfolioContext);
  const [cardCoinsInfo, setCardCoinsInfo] = useState([]);
  const { currencyFormatter } = useFormatter();

  // Coin Cards Logic
  useEffect(() => {
    const topMoversByDay = (sortData) => {
      if (sortData) {
        const bestTwo = sortData
          .sort((a, b) => b.priceChangeDayPerc - a.priceChangeDayPerc)
          .slice(0, 2);
        const worstTwo = sortData
          .sort((a, b) => a.priceChangeDayPerc - b.priceChangeDayPerc)
          .slice(0, 2);
        return [...bestTwo, ...worstTwo];
      }
    };
    const coinsForCards = topMoversByDay(coinListResponse);

    setCardCoinsInfo(coinsForCards);
  }, [coinListResponse]);

  return (
    <>
      {/* Headline */}
      <Grid item container>
        <Typography className={classes.headline}>Top Movers </Typography>
      </Grid>
      
      {/* Cards */}
      <Grid
        item
        container
        className={classes.cardsGrid}
        justify="center"
        alignItems="center"
        spacing={2}
      >
        {cardCoinsInfo?.map((coin) => {
          return (
            <Grid item md key={coin.id}>
              <CoinCard
                imgSource={coin.logo}
                alt={coin.id}
                coinName={coin.name}
                coinCode={coin.id}
                percentageChangeByDay={coin.priceChangeDayPerc}
                price={currencyFormatter(coin.price)}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
