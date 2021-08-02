import React from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import { AssetStructure } from "../components/Portfolio Components/AssetStructure";
import { AssetListContainer } from "../components/Portfolio Components/AssetList/AssetListContainer";
import { PerformanceChart } from "../components/Portfolio Components/PerformanceChart";
import { HistoricChart } from "../components/Portfolio Components/HistoricChart";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    backgroundColor: theme.palette.common.blue1,
    height: "100vh",
    "@media (max-width:1024px)": {
      height: "160vh",
    },
    padding: "1em",
  },
}));

const PortfolioPage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches1024 = useMediaQuery("(max-width:1024px");
  console.log(theme.breakpoints.down("sm"));

  return (
    <>
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
        <Grid
          item
          container
          xs={matches1024 ? 12 : 3}
          direction={matches1024 ? "row" : "column"}
        >
          {/*  Asset List */}
          <Grid item container xs>
            <AssetListContainer />
          </Grid>

          {/*  Asset Circle Graph */}
          <Grid item container xs>
            <AssetStructure />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default PortfolioPage;
