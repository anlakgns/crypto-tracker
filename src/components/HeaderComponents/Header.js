import React from "react";

import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import LogoButton from "../shared/UI components/LogoButton";
import TabsCom from "./TabsCom";
import DrawerCom from "./DrawerCom";

const Header = () => {
  const matchesMDup = useMediaQuery('@media (min-width:1020px)')

  return (
    <Grid
      item
      container
      direction="row"
      justify="center"
      style={{ padding: "1em 0em" }}
    >
      <Grid item container xs={11} justify="space-between">
        
        {/* Left: Logo */}
        <Grid item container xs alignItems="center">
          <LogoButton />
        </Grid>

        {/* Right: Tabs or Drawer */}
        <Grid item xs container>
          {matchesMDup ? <TabsCom /> : <DrawerCom />}
        </Grid>
      
      </Grid>
    </Grid>
  );
};

export default Header;
