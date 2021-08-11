import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Sparkline } from "./Sparkline";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    minHeight: "8.8em",
    marginBottom: "0.4em",
    backgroundColor: "white",
    color: theme.palette.primary.main,
    border: "0.4em solid ",
    borderRadius: "1em",
    cursor: "pointer",
    borderColor: theme.palette.primary.light,
    [theme.breakpoints.down("md")]: {
      minHeight: "7em",
    },
    
  },
  gridContainer: {
    padding: "1em",
    [theme.breakpoints.down("md")]: {
      padding: "0.5em",
    },
  },
  cardLogo: {
    maxHeight: 25,
    borderRadius: "50%",
    [theme.breakpoints.up("lg")]: {
      maxHeight: 35,
    },
  },
  cardGraph: {
    width: "80%",
    display: "block",
    marginLeft: "auto",
  },
  logoGraphContainer: {
    minHeight: "2.5em",
  },
  nameContainer: {
    minHeight: "1.6em",
    [theme.breakpoints.up("md")]: {
      minHeight: "1.3em",
    },
  },
  PricePercentageGrid: {
    minHeight: "2.2em",
  },
}));

export const CoinCard = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const history = useHistory();

  const {
    imgSource,
    alt,
    coinName,
    coinCode,
    percentageChangeByDay,
    price,
    chartData,
    location
  } = props;

  const cardRouter = (coinName) => {
    history.push(`/currencies/${coinName.toLowerCase()}`);
    window.scroll({
      top: 100,
      left: 100,
      behavior: 'smooth'
    });
  };

  const fontSizePrice = (coinName) => {
    if (isMdDown) {
      return coinName.length > 9 ? "1.3em" : "1.4em";
    } else {
      return coinName.length > 9 ? "1.5em" : "1.7em";
    }
  };

  

  return (
    <Card className={classes.cardContainer}>
      <Grid 
        container 
        direction="column" 
        className={classes.gridContainer}
        onClick={() => cardRouter(coinName)}
        >
        
        {/* Coin Logo & Coin Graph */}
        <Grid
          item
          container
          direction="row"
          xs={12}
          alignItems="center"
          justify="space-between"
          className={classes.logoGraphContainer}
        >
          {/* Logo */}
          <Grid item xs>
            <img src={imgSource} alt={alt} className={classes.cardLogo} />
          </Grid>

          {/* Sparkline */}
          <Grid item xs container justify="flex-end">
            <Sparkline chartData={chartData} location={location} />
          </Grid>
        </Grid>

        {/* Coin Name  */}
        <Grid
          item
          container
          alignItems="center"
          direction="row"
          xs={12}
          className={classes.nameContainer}
        >
          <Typography
            align="left"
            style={{ fontSize: coinName.length > 20 ? "0.9em" : "1em" }}
          >
            {coinName} &nbsp;
            <span style={{ opacity: 0.7 }}>{coinCode.length > 10 ? " " : coinCode  }</span>
          </Typography>
        </Grid>

        {/* Coin Price & Percentage  */}
        <Grid
          item
          container
          direction="row"
          xs={12}
          className={classes.PricePercentageGrid}
        >
          {/* Price */}
          <Grid item xs>
            <Typography align="left" style={{ fontSize: fontSizePrice(price) }}>
              {price}
            </Typography>
          </Grid>

          {/* Percentage */}
          <Grid item xs container justify="flex-end" alignItems="center">
            <Typography
              align="right"
              className={classes.percentage}
              style={{ color: percentageChangeByDay > 0 ? "green" : "red" }}
            >
              {percentageChangeByDay > 0 ? "+" : "-"}
              {Math.abs(percentageChangeByDay).toFixed(2)}%
            </Typography>
          </Grid>
        </Grid>
      
      </Grid>
    </Card>
  );
};
