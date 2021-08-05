import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  logo: {
    fontSize: "2rem",
    fontFamily: "roboto",
    textTransform: "none",
    textDecoration: "none",
  },
  innerLogo: {
    color: "white",
    fontWeight: "400",
  },
}));

const LogoButton = () => {
  const classes = useStyles();

  return (
    <Button>
      <Typography
        color="secondary"
        className={classes.logo}
        component={Link}
        to="/"
      >
        <span className={classes.innerLogo}>Coin</span>Tracker
      </Typography>
    </Button>
  );
};

export default LogoButton;
