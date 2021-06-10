import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { CoinListButton } from "../../shared/UI components/CoinListButton";
import { ResultBox } from "../../shared/UI components/ResultBox";
import { QuantityInput } from "../../shared/UI components/QuantityInput";
import ButtonLightPurple from "../../shared/UI components/ButtonLightPurple";
import { motion } from "framer-motion";
import { PortfolioContext } from "../../shared/contexts/PortfolioContext";
import { useFormatter } from "../../shared/utils/formatterHook";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    background:
      "linear-gradient(20deg, rgba(87,95,153,1) 50%, rgba(255,147,213,1) 100%)",
    width: "20em",
    borderRadius: "2em",
    border: "4px solid",
    borderColor: theme.palette.primary.main,
    padding: "1em",
  },
  mainContainerPaper: {
    borderRadius: "2em",
    backgroundColor: theme.palette.primary.light,
  },
  headlineContainer: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "2em",
    marginBottom: "1em",
    color: "white",
  },
  crossIconButton: {
    padding: "2px",
    color: "white",
  },
  arrowIconButton: {
    padding: "2px",
    color: "white",
  },
  tabs: {
    color: theme.palette.primary.main,
    marginBottom: "1.5em",
    backgroundColor: "white",
    borderRadius: "1.5em",
    height: "3em",
  },
  tab: {
    width: "8.5em",
  },
  tabRoot: {
    minWidth: 0,
  },
  customIndicator: {
    position: "absolute",
    backgroundColor: theme.palette.secondary.main,
    height: "2.5em",
    borderRadius: "30px",
    width: "7em",
    margin: "0.25em",
  },
  inputLabel: {
    color: "white",
  },
  iconsButton: {
    color: "white",
  },
  spentGridContainer: {
    color: "white",
    marginTop: "1em",
    minHeight: "4em",
    backgroundColor: theme.palette.secondary.main,
    borderRadius: "1.25em",
    width: "100%",
  },
  coinListGridContainer: {
    justifyContent: "center",
  },
  buttonGridContainer: {
    justifyContent: "center",
    marginTop: "1em",
    marginBottom: "2em",
  },
  totalSpentInfo: {
    padding: "1em 1em",
    fontWeight: "bold",
    fontSize: "1.2em",
  },
  totalSpentText: {
    opacity: 0.7,
    fontSize: "0.8em",
    fontWeight: 400,
  },
  inputBoxSpacing: {
    paddingRight: "1em",
  },
}));

export const PortfolioModalSecond = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const matches450Down = useMediaQuery('(max-width:450px)');
  const { currencyFormatter } = useFormatter();
  const {
    setPage,
    handleClose,
    selectedCoin,
    setSelectedCoin,
    setPortfolioModal,
    handleBack,
  } = props;
  const { setPortfolioBuyOrderList, coinListResponse } =
    useContext(PortfolioContext);
  const [transactionType, setTransactionType] = useState(0);
  const [coinQuantity, setCoinQuantity] = useState("");
  const [totalSpent, setTotalSpent] = useState(0);

  // Total Spend Calculator
  useEffect(() => {
    const totalSpentCalc = () => {
      const allspent = selectedCoin.price * +coinQuantity;
      setTotalSpent(allspent);
    };
    totalSpentCalc();
  }, [selectedCoin, coinQuantity]);

  // Portfolio Page Management
  useEffect(() => {
    return () => {
      setPage(1);
    };
  }, [setPage]);

  // Dom Handlers
  const handleTabChange = (e, newValue) => {
    setTransactionType(newValue);
  };
  const handleChangeCrypto = (event) => { 
    const selectedFind = coinListResponse.find(
      (c) => c.name === event.target.value
    );
    setSelectedCoin(selectedFind);
  };
  const coinQuantityHandler = (event) => {
    setCoinQuantity(event.target.value);
  };
  const addTransactionHandler = () => {
    setPortfolioBuyOrderList((prev) => {
      return [
        ...prev,
        {
          name: selectedCoin.name,
          id: selectedCoin.id,
          quantity: coinQuantity,
          priceBought: selectedCoin.price,
          allInfo: selectedCoin,
        },
      ];
    });
    setPortfolioModal(false);
    history.push("/portfolio");
  };

  // Switcher Indicator Style Logic
  const indicatorStyle = () => {
    let marginLeft;
    switch (transactionType) {
      case 0:
        marginLeft = "0.25em";
        break;
      case 1:
        marginLeft = "7.50em";
        break;
      case 2:
        marginLeft = "15em";
        break;
      default:
        marginLeft = "0.25em";
    }
    return marginLeft;
  };

  console.log(selectedCoin)
  return (
    <Grid 
      container 
      className={classes.gridContainer} 
      style={{width : matches450Down ? "20em" : "27em" }}
      direction="column">
      {/* Headline & Cross */}
      <Grid
        item
        container
        justify="space-between"
        className={classes.headlineContainer}
      >
        <Grid item>
          <IconButton
            onClick={handleBack}
            classes={{ root: classes.arrowIconButton }}
          >
            <ArrowBackIosIcon style={{ fontSize: "0.9em", marginTop: "2px" }} />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant="h5">Add Transaction</Typography>
        </Grid>
        <Grid item>
          <IconButton
            onClick={handleClose}
            classes={{ root: classes.crossIconButton }}
          >
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>

      {/* Switcher -  Among Transaction Types */}
      <Grid item container justify="center">
        <Tabs
          value={transactionType}
          onChange={handleTabChange}
          className={classes.tabs}
          component={motion.div}
          TabIndicatorProps={{ style: { display: "none" } }}
        >
          <motion.div
            className={classes.customIndicator}
            animate={{ marginLeft: indicatorStyle() }}
            transition={{ duration: 0.6 }}
            initial={false}
          />
          <Tab
            disableRipple
            value={0}
            label="Buy"
            className={classes.tab}
            classes={{ root: classes.tabRoot }}
          />
          <Tab
            disableRipple
            value={1}
            label="Sell"
            className={classes.tab}
            classes={{ root: classes.tabRoot }}
          />
          {/* <Tab
            disableRipple
            value={2}
            label="Transfer"
            className={classes.tab}
            classes={{ root: classes.tabRoot }}
          /> */}
        </Tabs>
      </Grid>

      {/* Select Coin List */}
      <Grid item container justify="center">
        <CoinListButton
          coinListResponse={coinListResponse}
          onChange={handleChangeCrypto}
          selected={selectedCoin}
          width="90%"
        />
      </Grid>

      {/* Quantity and Price Input&Box */}
      <Grid item container justify="center">
        <Grid item container xs={11}>
          <Grid item xs className={classes.inputBoxSpacing}>
            <Typography className={classes.inputLabel}>Quantity</Typography>
            <QuantityInput
              onChange={coinQuantityHandler}
              value={coinQuantity}
            />
          </Grid>
          <Grid item xs>
            <Typography className={classes.inputLabel}>
              Price Per Coin
            </Typography>
            <ResultBox
              value={parseFloat(selectedCoin?.price).toFixed(2) + " $"}
            />
          </Grid>
        </Grid>
      </Grid>

      {/*  Fee & Notes Buttons */}
      <Grid item container justify="space-around" alignItems="center" xs={12}>
        {/* Fee */}
        {/* <Grid item md={5} className={classes.fee}>
              <Button className={classes.iconsButton} >
                <MonetizationOnIcon />
                <Typography>Fee</Typography>
              </Button>
          </Grid> */}

        {/* Notes */}
        {/* <Grid item md={5} className={classes.notes}>
            <Button className={classes.iconsButton} >
                <NotesIcon />
              <Typography>Notes</Typography>
            </Button>
          </Grid> */}
      </Grid>

      {/* Total Spend Info Box */}
      <Grid item container justify="center">
        <Grid item className={classes.spentGridContainer} xs={11}>
          <Typography className={classes.totalSpentInfo}>
            <span className={classes.totalSpentText}>Total Spent</span>
            <br></br>
            {isNaN(totalSpent) ? "" : currencyFormatter(totalSpent)}
          </Typography>
        </Grid>
      </Grid>

      {/* Add Transaction Button */}
      <Grid item container className={classes.buttonGridContainer}>
        <ButtonLightPurple
          contentText="Add Transaction"
          width="90%"
          onClick={addTransactionHandler}
        />
      </Grid>
    </Grid>
  );
};
