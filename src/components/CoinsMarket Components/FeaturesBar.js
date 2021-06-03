import React, { useState, useRef } from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import IsoIcon from "@material-ui/icons/Iso";
import Popover from "@material-ui/core/Popover";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { SearchBar } from "../shared/UI components/SearchBar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { PortfolioModal } from "./portfolioModal/PortfolioModal";
import { CalculatorCard } from "./CalculatorCard";

const useStyles = makeStyles((theme) => ({
  favoritesCheckbox: {
    margin: "auto",
  },
  labelCheckboxSwitch: {
    fontSize: "0.9em",
    fontWeight: "400",
  },
  popoverPaper: {
    borderRadius: "2em",
  },
  btnCalc: {
    color: "white",
    textTransform: "none",
    fontSize: "0.9em",
    fontWeight: "400",
  },
}));

export const FeatureBar = (props) => {
  const classes = useStyles();
  const {
    coinListResponse,
    setSearchSubmitTerm,
    setLivePriceSwitch,
    livePriceSwitch,
    setFavoriteCheck,
    favoriteCheck,
  } = props;

  const searchBox = useRef()
  const [calcAnchor, setCalcAnchor] = useState(null);
  const [calculatorModalSwitch, setCalculatorModalSwitch] = useState(false);
  const [openPortfolioModal, setPortfolioModal] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedCoin, setSelectedCoin] = useState("");
  const [dotMenuAnchorEl, setDotMenuAnchorEl] = useState(null);
  const dotMenuOpen = Boolean(dotMenuAnchorEl);

  // Responsive Thresholds
  const dotMenuPortfolio = useMediaQuery("(max-width:1035px)");
  const dotMenuCalculator = useMediaQuery("(max-width:870px)");
  const dotMenuFavorite = useMediaQuery("(max-width:577px)");
  
  // Dom Handlers
  const searchBoxSubmitHandler = (e) => {
    e.preventDefault();
    const lowerChanger = searchBox.current.value.toLowerCase();
    setSearchSubmitTerm(lowerChanger);
  };
  const switchHandler = () => {
    setLivePriceSwitch(!livePriceSwitch);
  };
  const calcHandlerClose = () => {
    setCalcAnchor(null);
    setCalculatorModalSwitch(false);
  };
  const calcHandlerOpen = (e) => {
    setCalcAnchor(e.currentTarget);
    setCalculatorModalSwitch(true);

    // Responsive Case
    if (dotMenuOpen) {
      setDotMenuAnchorEl(null);
    }
  };
  const createPortfolioHandler = () => {
    setPortfolioModal(true);

    // Responsive Case
    if (dotMenuOpen) {
      setDotMenuAnchorEl(null);
    }
  };
  const handleDotMenuClose = () => {
    setDotMenuAnchorEl(null);
  };
  const handleDotMenuClick = (event) => {
    setDotMenuAnchorEl(event.currentTarget);
  };

  const ITEM_HEIGHT = 48;

  return (
    <>
      {/* Search Box */}
      <Grid item xs={dotMenuFavorite ? 6 : 4} container justify="flex-end">
        <SearchBar
          onSubmit={searchBoxSubmitHandler}
          ref={searchBox}
        />
      </Grid>

      {/* Favorite Checkbox */}
      <Grid
        item
        container
        justify="center"
        style={{ display: dotMenuFavorite ? "none" : "flex" }}
        xs={dotMenuCalculator ? 3 : 2}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={favoriteCheck}
              onChange={() => setFavoriteCheck(!favoriteCheck)}
              color="secondary"
              icon={<CheckBoxOutlineBlankIcon style={{ color: "white" }} />}
            />
          }
          label="Favorites"
          className={classes.favoritesCheckbox}
          classes={{ label: classes.labelCheckboxSwitch }}
        />
      </Grid>

      {/* Live Price Switch */}
      <Grid item container justify="center" xs={dotMenuCalculator ? 3 : 2}>
        <FormControlLabel
          control={
            <Switch
              checked={livePriceSwitch}
              onChange={switchHandler}
              color="primary"
            />
          }
          label="Live Prices"
          classes={{ label: classes.labelCheckboxSwitch }}
        />
      </Grid>

      {/* Calculator Button */}
      <Grid
        item
        container
        justify="center"
        xs={2}
        style={{ display: dotMenuCalculator ? "none" : "flex" }}
      >
        <Button className={classes.btnCalc} onClick={calcHandlerOpen}>
          <IsoIcon color="primary" style={{ marginRight: "0.3em" }} />
          Calculator
        </Button>
        <Popover
          classes={{ paper: classes.popoverPaper }}
          open={calculatorModalSwitch}
          anchorEl={calcAnchor}
          onClose={calcHandlerClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <CalculatorCard coinListResponse={coinListResponse} />
        </Popover>
      </Grid>

      {/* Create Portfolio Button */}
      <Grid
        item
        container
        justify="center"
        xs={2}
        style={{ display: dotMenuPortfolio ? "none" : "flex" }}
      >
        <Button
          variant="contained"
          className={classes.btnCalc}
          color="primary"
          onClick={createPortfolioHandler}
        >
          Create a Portfolio
        </Button>
        <PortfolioModal
          openPortfolioModal={openPortfolioModal}
          setPortfolioModal={setPortfolioModal}
          page={page}
          setPage={setPage}
          selectedCoin={selectedCoin}
          setSelectedCoin={setSelectedCoin}
        />
      </Grid>

      {/* Responsive Menu Dots */}
      <Grid item container xs={1} justify="center">
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleDotMenuClick}
          style={{
            display: dotMenuPortfolio ? "inline-block" : "none",
            color: "white",
            fontSize: "1.3em",
          }}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={dotMenuAnchorEl}
          keepMounted
          open={dotMenuOpen}
          onClose={handleDotMenuClose}
          classes={{ root: classes.dotMenuRoot }}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
              backgroundColor: "rgba(255,147,213,1)",
              color: "white",
            },
          }}
        >
          {/** Portfolio DotMenu Item **/}
          <MenuItem onClick={createPortfolioHandler}>
            Create a Portfolio
          </MenuItem>
          <MenuItem
            onClick={calcHandlerOpen}
            style={{
              display: dotMenuCalculator ? "flex" : "none",
            }}
          >
            Calculator
          </MenuItem>
          <MenuItem onClick={() => setFavoriteCheck(!favoriteCheck)}>
            Favorites
          </MenuItem>
        </Menu>
      </Grid>
    </>
  );
};
