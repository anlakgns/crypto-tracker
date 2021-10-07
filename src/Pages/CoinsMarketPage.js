import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import HeaderM from '../components/HeaderComponents/Header';
import wavePattern from '../assets/graph-dark.svg';
import CoinTable from '../components/CoinsMarket Components/CoinTable';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: theme.palette.common.blue1,
  },
  wavePattern: {
    width: '100%',
    position: 'relative',
    marginBottom: '-9em',
    [theme.breakpoints.up('xl')]: {
      marginBottom: '-12em',
    },
    [theme.breakpoints.down('md')]: {
      marginBottom: '-7em',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '-4em',
    },
  },
}));

const CoinMarketPage = () => {
  const classes = useStyles();

  // Scroll Down to Table
  useEffect(() => {
    window.scroll({
      top: 100,
      behavior: 'smooth',
    });
  }, []);

  return (
    <>
      <Grid
        container
        className={classes.mainContainer}
        direction="column"
        justify="center"
        alignItems="center"
      >
        {/* Header Section */}
        <Grid item container>
          <HeaderM />
        </Grid>

        {/* Table */}
        <Grid item container md={11} direction="column">
          <CoinTable />
        </Grid>

        {/* Wave Pattern */}
        <Grid item container xs={12}>
          <img
            src={wavePattern}
            className={classes.wavePattern}
            alt="background pattern"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CoinMarketPage;
