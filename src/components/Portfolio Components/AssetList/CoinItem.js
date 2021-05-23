import React, { useState, useContext, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { useFormatter } from "../../shared/utils/formatterHook";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { GlobalContext } from "../../shared/global state/globalContext";

const useStyles = makeStyles((theme) => ({
  underline: {
    borderBottom: "2px solid",
    color: theme.palette.common.blue4,
  },
  logo: {
    width: "35%",
  },
  name: {
    fontSize: "0.8em",
  },
  id: {
    opacity: 0.7,
    fontSize: "0.8em",
  },
  quantity: {
    fontSize: "0.5em",
  },
  quantitySpan: {
    opacity: 0.7,
    marginRight: "0.2em",
  },
  starIcon: {
    color: theme.palette.common.white,
    marginLeft: "0.5em",
    fontSize: "0.7em",
  },
  price: {
    fontSize: "0.8em",
  },
  change: {
    fontSize: "0.6em",
  },
  iconButtonBookRoot: {
    padding: "0",
    color: theme.palette.common.white,
    marginRight: "2em",
  },
  iconButtonDot: {
    fontSize: "0.2em",
  },
  menuItem: {
    fontSize: "0.8em",
  },
}));

export const CoinItem = (props) => {
  const { tabValue, setPortfolioModal, setSelectedCoin, setPage, coin } = props;
  const { name, priceBought, quantity, value } = coin;
  const { code, logo, priceChangeDayPerc } = coin.allInfo;

  const theme = useTheme();
  const { setCoinToDelete, sourceAPI, coinListResponse } =
    useContext(GlobalContext);
  const { currencyFormatter, percentageFormatter } = useFormatter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [primaryField, setPrimaryField] = useState();
  const [secondaryField, setSecondaryField] = useState();
  const classes = useStyles();
  const open = Boolean(anchorEl);

  // Tab Switch
  useEffect(() => {
    const findCoin = coinListResponse.filter((c) => c.name === name);
    const profit = (+findCoin[0]?.price - priceBought) * quantity;
    const profitPerc = (+findCoin[0]?.price - priceBought) / priceBought;

    switch (tabValue) {
      case 0:
        setPrimaryField(currencyFormatter(priceBought));
        setSecondaryField(percentageFormatter(priceChangeDayPerc, sourceAPI));
        break;
      case 1:
        setPrimaryField(currencyFormatter(value));
        setSecondaryField();
        break;
      case 2:
        setPrimaryField(currencyFormatter(profit));
        setSecondaryField(percentageFormatter(profitPerc, sourceAPI));
        break;
      default:
        setPrimaryField(currencyFormatter(priceBought));
        setSecondaryField(percentageFormatter(priceChangeDayPerc, sourceAPI));
    }
  }, [
    tabValue,
    currencyFormatter,
    sourceAPI,
    priceChangeDayPerc,
    priceBought,
    percentageFormatter,
    value,
    coinListResponse,
    name,
    quantity,
  ]);

  // Dom Handlers
  const itemClick = (event, option) => {
    if (option === "Remove Asset") {
      setCoinToDelete(name);
    }

    if (option === "Buy More") {
      setPortfolioModal(true);
      setSelectedCoin(coin.allInfo);
      setPage(2);
    }

    // if(option === "Sell") {
    //   setPortfolioModal(true)
    //   setSelectedCoin(coin.allInfo)
    //   setPage(2)
    // }
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const options = ["Remove Asset", "Buy More", "Sell"];
  const ITEM_HEIGHT = 48;

  return (
    <>
      <Grid
        item
        container
        className={classes.itemContainer}
        justify="center"
        alignItems="center"
      >
        {/* Logo & Coin Name */}
        <Grid item container md={6} alignItems="center">
          {/* Logo */}
          <Grid item container justify="center" xs={4}>
            <img src={logo} alt="coin logo" className={classes.logo} />
          </Grid>

          {/* Coin Name */}
          <Grid item xs={8} container direction="column">
            <Grid item>
              <Typography className={classes.name}>
                {name} <span className={classes.id}>{code.toUpperCase()}</span>
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.quantity}>
                <span className={classes.quantitySpan}>Qty:</span> {quantity}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* Price & Icon */}
        <Grid item container md={5} justify="center" alignItems="center">
          <Grid item container direction="column" xs={8}>
            <Grid item>
              <Typography className={classes.price} align="right">
                {primaryField}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                className={classes.change}
                style={{
                  color:
                    parseFloat(secondaryField) >= 0 ? "#7CFC00" : "#FF5733 ",
                }}
                align="right"
              >
                {secondaryField}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <IconButton>
              <BookmarkBorderIcon className={classes.starIcon} />
            </IconButton>
          </Grid>
        </Grid>

        {/* 3 Dot */}
        <Grid item container md={1} justify="center" alignItems="center">
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
            classes={{ root: classes.iconButtonBookRoot }}
            className={classes.iconButtonDot}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
                backgroundColor: theme.palette.secondary.light,
                color: theme.palette.common.white,
              },
            }}
          >
            {options.map((option, i) => (
              <MenuItem
                key={option}
                onClick={(event) => {
                  itemClick(event, option);
                }}
                className={classes.menuItem}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Grid>
      </Grid>
      <div className={classes.underline} />
    </>
  );
};
