import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import { AssetStructure } from '../components/Portfolio Components/AssetStructure';
import { AssetListContainer } from '../components/Portfolio Components/AssetList/AssetListContainer';
import { PerformanceChart } from '../components/Portfolio Components/PerformanceChart';
import { HistoricChart } from '../components/Portfolio Components/HistoricChart';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import HeaderM from '../components/HeaderComponents/Header';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    backgroundColor: theme.palette.common.blue1,
    minHeight: '100vh',
    padding: '1em',
    maxWidth: '2000px',
    margin: 'auto',
  },

  assetListGrid: {
    '@media (min-width:600px) and (max-width: 1024px)': {
      flex: 1,
      marginRight: '1em',
    },
    '@media (min-width:1025px)': {
      flexGrow:1,
      marginRight: '0em',
    },

  },
  assetStructureGrid: {
    '@media (min-width:600px)': {
      flex: 1,
    },
  },
}));

const PortfolioPage = () => {
  const classes = useStyles();
  const matches1024 = useMediaQuery('(max-width:1024px');

  // Scroll Down to Charts
  useEffect(() => {
    window.scroll({
      top: 120,
      behavior: 'smooth',
    });
  }, []);

  return (
    <>
      {/* Header Section */}
      <Grid item container>
        <HeaderM />
      </Grid>

      <Grid
        container
        direction="row"
        justify="center"
        className={classes.mainGrid}
      >
        {/* Left */}
        <Grid item container xs={matches1024 ? 12 : 9}>
          {/*  Value Graph */}
          <Grid item container>
            <HistoricChart />
          </Grid>

          {/*  Performance Graph */}
          <Grid item container>
            <PerformanceChart />
          </Grid>
        </Grid>

        {/* Right */}
        <Grid item container xs className={classes.rightGrid}>
          {/*  Asset List */}
          <Grid item container className={classes.assetListGrid}>
            <AssetListContainer />
          </Grid>

          {/*  Asset Circle Graph */}
          <Grid item container className={classes.assetStructureGrid}>
            <AssetStructure />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default PortfolioPage;
