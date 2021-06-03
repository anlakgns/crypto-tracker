import React, { useContext } from "react";

import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Typography } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";

import { PortfolioContext } from "../contexts/PortfolioContext";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "12em",
    color: "white",
    marginBottom: "1em",
  },
  inputLabel: {
    color: "white",
    marginTop: "0.3em",
  },
  labelRoot: {
    color: "white",
    opacity: "0.8",
    marginLeft: "1em",
  },
  menuItemGuttersRoot: {
    paddingRight: "0px",
  },
  menuItemGridContainer: {
    width: "17em",
  },
  menuItemLogo: {
    width: "1em",
    display: "flex",
    alignItems: "center",
  },
  coinCodeMenuItem: {
    opacity: 0.7,
    fontSize: "0.8em",
  },
}));

export const CoinListButton = ({ onChange, selected, width, height }) => {
  const classes = useStyles();
  const { coinListResponse } = useContext(PortfolioContext);

  // Custamizable Input Styles
  const BootstrapInput = withStyles((theme) => ({
    input: {
      borderRadius: 20,
      position: "relative",
      backgroundColor: theme.palette.common.textPurple,
      color: theme.palette.common.white,
      border: "1px solid",
      borderColor: theme.palette.common.textPurple,
      fontSize: 16,
      height: height || "1.5em",
      padding: "0.7em",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      "&:focus": {
        borderRadius: 20,
        borderColor: theme.palette.secondary.main,
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  }))(InputBase);

  return (
    <FormControl
      className={classes.formControl}
      style={{ width: width || "100%" }} // Customizable width
    >
      <Select
        value={selected}
        onChange={onChange}
        input={<BootstrapInput className={classes.selectInput} />}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>

        {/* Select List */}
        {coinListResponse.map((coin) => {
          return (
            <MenuItem
              value={coin}
              classes={{ gutters: classes.menuItemGuttersRoot }}
              key={coin.id}
            >
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="space-between"
                className={classes.menuItemGridContainer}
              >
                {/* Coin Name + Logo */}
                <Grid item container alignItems="center" md={9}>
                  {/* Logo */}
                  <Grid item md={2}>
                    <img
                      className={classes.menuItemLogo}
                      src={coin.logo}
                      alt={coin.id}
                    />
                  </Grid>

                  {/* Coin Name */}
                  <Grid item md={10}>
                    <Typography align="left">{coin.name}</Typography>
                  </Grid>
                </Grid>

                {/* Coin ID */}
                <Grid item md={3}>
                  <Typography
                    align="right"
                    className={classes.coinCodeMenuItem}
                  >
                    {coin.code.toUpperCase()}
                  </Typography>
                </Grid>
              </Grid>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
