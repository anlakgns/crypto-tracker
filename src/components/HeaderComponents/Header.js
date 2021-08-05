import React from "react";

import { useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import LogoButton from "../shared/UI components/LogoButton";
import TabsCom from "./TabsCom";
import DrawerCom from "./DrawerCom";

const Header = () => {
  const theme = useTheme();
  const matchesMDup = useMediaQuery(theme.breakpoints.up("md"))

  return (
    <Grid
      item
      container
      direction="row"
      justify="center"
      style={{ padding: "2em 0em" }}
    >
      <Grid item container xs={11} justify="space-between">
        
        {/* Left: Logo */}
        <Grid item>
          <LogoButton />
        </Grid>

        {/* Right: Tabs or Drawer */}
        <Grid item>
          {matchesMDup ? <TabsCom /> : <DrawerCom />}
        </Grid>
      
      </Grid>
    </Grid>
  );
};

export default Header;
