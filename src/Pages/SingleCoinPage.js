import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { IntroductionBar } from '../components/SingleCoin Components/IntroductionBar';
import { StatisticBar } from '../components/SingleCoin Components/StatisticBar';
import { MainArea } from '../components/SingleCoin Components/MainArea';
import { TopMoverCards } from '../components/SingleCoin Components/TopMoverCards';
import { Transactions } from '../components/SingleCoin Components/Transactions';
import { useFetchData } from '../components/shared/hooks/fetchDataHook';
import Header from '../components/HeaderComponents/Header';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    backgroundColor: theme.palette.common.blue1,
    padding: '1em',
    maxWidth:"2000px",
    margin:"auto"
  },
  spinnerGrid: {
    height: '70vh',
  },
}));

const SingleCoinPage = () => {
  const classes = useStyles();
  const [singleCoinResponse, setSingleCoinResponse] = useState();
  const [spinner, setSpinner] = useState(false);
  let { id } = useParams();
  const { fetchSingleCoin } = useFetchData();

  // Data Fetching & Spinner Logic
  useEffect(() => {
    const fetch = async () => {
      setSpinner(true);
      const response = await fetchSingleCoin(id);
      setSpinner(false);
      setSingleCoinResponse(response);
    };
    fetch();
  }, [fetchSingleCoin, id]);

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
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.mainGrid}
      >
        {/* Header Section */}
        <Grid item container>
          <Header />
        </Grid>

        {spinner ? (
          <Grid
            item
            container
            className={classes.spinnerGrid}
            justify="center"
            alignItems="center"
          >
            <CircularProgress color="secondary" />
          </Grid>
        ) : (
          <Grid item container>
            {/* Introduction Bar */}
            <Grid item container>
              <IntroductionBar singleCoinResponse={singleCoinResponse} />
            </Grid>

            {/* Statistic Bar */}
            <Grid item container>
              <StatisticBar singleCoinResponse={singleCoinResponse} />
            </Grid>

            {/* Main Area  */}
            <Grid item container>
              <MainArea singleCoinResponse={singleCoinResponse} />
            </Grid>

            {/* Info Area  */}
            <Grid item container>
              <Transactions singleCoinResponse={singleCoinResponse} />
            </Grid>

            {/* Cards */}
            <Grid item container>
              <TopMoverCards singleCoinResponse={singleCoinResponse} />
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default SingleCoinPage;
