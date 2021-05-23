import React from "react";
import Grid from "@material-ui/core/Grid";
import LogoButton from "../../shared/UI components/LogoButton";
import TabsCom from "../../HeaderComponents/TabsCom";
import DrawerCom from "../../HeaderComponents/DrawerCom";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const HeaderM = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md")); // Responsive Listener

  return (
    <Grid
      item
      container
      direction="row"
      justify="center"
      style={{ padding: "2em 0em" }}
    >
      <Grid item container xs={11} justify="space-between">
        <Grid item>
          <LogoButton />
        </Grid>

        <Grid item>{matches ? <TabsCom /> : <DrawerCom />}</Grid>
      </Grid>
    </Grid>
  );
};

export default HeaderM;
