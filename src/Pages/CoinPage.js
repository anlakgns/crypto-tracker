import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import {IntroductionBar} from "../components/Coin Page Components/IntroductionBar"
import {StatisticBar} from "../components/Coin Page Components/StatisticBar"
import {MainArea} from "../components/Coin Page Components/MainArea"
import {TopMoverCards} from "../components/Coin Page Components/TopMoverCards"
import {Transactions} from "../components/Coin Page Components/Transactions"
import { useParams } from "react-router-dom";
import {useFetchData} from "../components/shared/hooks/fetchDataHook"
import HeaderM from "../components/Landing Components/Introduction Section/HeaderM"

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    backgroundColor: theme.palette.common.blue2,
    padding: "1em"
  },
}));

const PortfolioPage = () => {
  const classes = useStyles();
  const [coinSingleResponse, setCoinSingleResponse] = useState()
  let { id } = useParams();

  console.log(id)
  const {fetchCoinSingle} = useFetchData()

  useEffect(()=> {
    const fetch = async ()=> {
      const response = await fetchCoinSingle(id)
      setCoinSingleResponse(response)
    }
    fetch()
  }, [fetchCoinSingle, id])
  
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
      <Grid item container >
          <HeaderM />
      </Grid>

        {/* Introduction Bar */}
        <Grid item container >
          <IntroductionBar coinSingleResponse={coinSingleResponse}/>
        </Grid>

        {/* Statistic Bar */}
        <Grid item container>
          <StatisticBar coinSingleResponse={coinSingleResponse}/>
        </Grid>

        {/* Main Area  */}
        <Grid item container>
          <MainArea coinSingleResponse={coinSingleResponse}/>
        </Grid>

        {/* Info Area  */}
        <Grid item container>
          <Transactions coinSingleResponse={coinSingleResponse}/>
        </Grid>

         {/* Cards */}
         <Grid item container>
          <TopMoverCards coinSingleResponse={coinSingleResponse}/>
        </Grid>
    
      
      </Grid>
    </>
  );
};

export default PortfolioPage;
