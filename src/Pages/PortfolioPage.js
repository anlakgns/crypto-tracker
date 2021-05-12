import React from "react";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import { AssetGraph } from "../components/Portfolio Components/AssetGraph";
import { AssetListContainer } from "../components/Portfolio Components/AssetList/AssetListContainer";
import { PerformanceGraph } from "../components/Portfolio Components/PerformanceGraph";
import { ValueGraph } from "../components/Portfolio Components/ValueGraph";


const useStyles = makeStyles((theme) => ({
  mainGrid: {
    backgroundColor: theme.palette.common.blue4,
    height: "100vh",
    padding: "1em",
  },
}));

const PortfolioPage = () => {
  
  const classes = useStyles();
  return (
    <>
      <Grid
        container
        direction="row"
        justify="center"
        className={classes.mainGrid}
      >
        {/* Left */}
        <Grid item container xs={9}>
          {/* Portfolio Value Graph */}
          <Grid item container>
            <ValueGraph />
          </Grid>

          {/* Portfolio Performance Graph */}
          <Grid item container>
            <PerformanceGraph />
          </Grid>
        </Grid>

        {/* Right */}
        <Grid item container xs={3} direction="column">
          {/* Portfolio Asset List */}
          <Grid item container xs className={classes.assetListContainer}>
            <AssetListContainer  />
          </Grid>

          {/* Portfolio Asset Circle Graph */}
          <Grid item container xs>
            <AssetGraph />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default PortfolioPage;
