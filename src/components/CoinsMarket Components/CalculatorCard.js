import React, { useState, useEffect, useCallback } from "react";

import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import openExchangeAPI from "../shared/apis/openExchangeAPI";
import { CoinListButton } from "../shared/UI components/CoinListButton";
import { CurrencyListButton } from "../shared/UI components/CurrencyListButton";
import { QuantityInput } from "../shared/UI components/QuantityInput";
import { ResultBox } from "../shared/UI components/ResultBox";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  calcContainer: {
    fontSize: "1em",
    // background: "linear-gradient(20deg, rgba(87,95,153,1) 0%, rgba(255,147,213,1) 100%)",
    backgroundColor: theme.palette.primary.light,
    borderRadius: "2em",
    padding: "0.5em",
    border: "5px solid",
    borderColor: theme.palette.primary.main,
  },
  tabContainer: {
    padding: "0.1em",
    height: "2em",
    color: theme.palette.primary.main,
    backgroundColor: "white",
    borderRadius: "2em",
    marginTop: "2em",
    marginBottom: "1em",
  },
  indicator: {
    height: "90%",
    borderRadius: "2em",
    color: theme.palette.primary.main,
    margin: "0.15em",
  },
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
  },
  select: {
    minHeight: "4em",
    color: "white",
    background:
      "linear-gradient(160deg, rgba(87,95,153,1) 20%, rgba(255,147,213,1) 100%)",
  },
  selectRoot: {
    outline: "none",
    border: "none",
  },
  selectFilledRoot: {
    paddingLeft: "20px",
    paddingTop: "20px",
    paddingRight: "10px",
    paddingBottom: "20px",
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
  currencyListItem: {
    width: "18em",
  },
  calcPriceInfo: {
    width: "80%",
    margin: "auto",
    color: theme.palette.common.white,
  },
}));

export const CalculatorCard = ({ coinListResponse }) => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);
  const [selectedCoin, setSelectedCoin] = useState("");
  const [selectedCoin2, setSelectedCoin2] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [renderCurrencyList, setRenderCurrencyList] = useState([]);
  const [calcResult, setCalcResult] = useState();
  const [coinQuantity, setCoinQuantity] = useState("");
  const [isValid, setIsValid] = useState(false);


  const matches550Down = useMediaQuery('(max-width:550px)');

  // Validation for numbers
  useEffect(() => {
    if (+coinQuantity >= 0 || coinQuantity === "") {
      setIsValid(true);
    } else {
      setCalcResult("Positive Numbers Only ");
      setIsValid(false);
    }
  }, [coinQuantity, isValid]);

  // Calculators
  const calculatorForFiat = useCallback(() => {
    const result =
      coinQuantity * selectedCoin.price * selectedCurrency.currencyRate;
    if (isValid) {
      setCalcResult(currencyFormatter(result, selectedCurrency.currencyCode));
    }
  }, [coinQuantity, selectedCoin, selectedCurrency, isValid]);

  const calculatorForCrypto = useCallback(() => {
    const result = (coinQuantity * selectedCoin.price) / selectedCoin2.price;
    if (isValid) {
      setCalcResult(result.toFixed(2) + " " + selectedCoin2.code);
    }
  }, [coinQuantity, selectedCoin, selectedCoin2, isValid]);

  // Data Fetching and Editting
  useEffect(() => {
    const fetchData = async () => {
      const currencyRatesResponse = await openExchangeAPI.get("/latest.json");
      const currencyNameListResponse = await openExchangeAPI.get(
        "/currencies.json"
      );
      const rates = currencyRatesResponse.data.rates;
      const currencyListEditted = [];
      Object.entries(currencyNameListResponse.data).map((currency) => {
        return currencyListEditted.push({
          currencyName: currency[1],
          currencyCode: currency[0],
          currencyRate: rates[currency[0]],
        });
      });
      setRenderCurrencyList(currencyListEditted);
    };
    fetchData();

    return function cleanup() {
      setRenderCurrencyList([]);
    };
  }, []);

  // Switch Logic for Calculator.
  useEffect(() => {
    if (
      selectedCoin !== "" &&
      selectedCurrency !== "" &&
      coinQuantity !== "" &&
      tabValue === 1
    ) {
      calculatorForFiat();
    }
    if (
      selectedCoin !== "" &&
      selectedCoin2 !== "" &&
      coinQuantity !== "" &&
      tabValue === 0
    ) {
      calculatorForCrypto();
    }
  }, [
    selectedCoin,
    selectedCurrency,
    coinQuantity,
    selectedCoin2,
    tabValue,
    calculatorForFiat,
    calculatorForCrypto,
  ]);

  // Cleanup for result
  useEffect(() => {
    setCalcResult("");
  }, [tabValue]);

  // Formatters
  const currencyFormatter = (num, currencyCode) => {
    const numb = Number(num);
    return new Intl.NumberFormat("en-EN", {
      style: "currency",
      currency: currencyCode || "USD",
    }).format(numb);
  };

  // Dom Handler
  const tabHandleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const handleChangeCrypto = (event) => {
    const selectedFind = coinListResponse.find(
      (c) => c.name === event.target.value
    );
    setSelectedCoin(selectedFind);
  };
  const handleChangeCrypto2 = (event) => {
    const selectedFind = coinListResponse.find(
      (c) => c.name === event.target.value
    );

    setSelectedCoin2(selectedFind);
  };
  const handleChangeCurrency = (event) => {
    setSelectedCurrency(event.target.value);
  };
  const coinQuantityHandler = (event) => {
    setCalcResult("");
    setCoinQuantity(event.target.value);
  };

  // Buttons JSX
  const fiatCryptoSwitch =
    tabValue === 1 ? (
      <CurrencyListButton
        currencyList={renderCurrencyList}
        onChange={handleChangeCurrency}
        selectedCurrency={selectedCurrency}
        width="12em"
      />
    ) : (
      <CoinListButton
        coinListResponse={coinListResponse}
        onChange={handleChangeCrypto2}
        selected={selectedCoin2}
        width="12em"
      />
    );

  return (
    <>
      <Grid 
        container 
        className={classes.calcContainer}
        style={{
          height: matches550Down ? "30em" : "20em",
          width:  matches550Down ? "20em" : "30em",
        }}>
        
        {/* Calculator Switch Fiat & Crypto */}
        <Grid item container justify="center">
          <Tabs
            indicatorColor="secondary"
            value={tabValue}
            onChange={tabHandleChange}
            className={classes.tabContainer}
            classes={{ 
              indicator: classes.indicator }}
            style={{
              width: matches550Down ? "15.3em" : "20.3em",
            }}
            TabIndicatorProps={{
              style: {
                width: matches550Down ? "145px" : "160px",
              },
            }}
          >
            <Tab value={0} label="Crypto to Fiat" />
            <Tab value={1}  label="Crypto to Crypto" />
          </Tabs>
        </Grid>

        {/* Mini Form for Converting */}
        <Grid 
          item container 
          justify="space-evenly" 
          direction={matches550Down ? "column" : "row"}
          spacing={matches550Down ? 2 : 0}>
          
          {/** Left **/}
          <Grid item container direction="column" alignItems="center" xs>
            {/***  Left Coin List ***/}
            <Grid item>
              <CoinListButton
                coinListResponse={coinListResponse}
                onChange={handleChangeCrypto}
                selected={selectedCoin}
                width="12em"
              />
            </Grid>

            {/*** Quantity Coin Input ***/}
            <Grid item>
              <QuantityInput
                onChange={coinQuantityHandler}
                value={coinQuantity}
              />
            </Grid>
          </Grid>

          {/** Right **/}
          <Grid item container alignItems="center" direction="column" xs>
            {/*** Fiat&Crypto List ***/}
            <Grid item>{fiatCryptoSwitch}</Grid>

            {/*** Result Input ***/}
            <Grid item>
              <ResultBox value={calcResult} />
            </Grid>
          </Grid>
        
        </Grid>

        {/* Coin Info Text */}
        <Grid item xs={12} className={classes.calcPriceInfoContainer}>
          {selectedCoin ? (
            <Typography className={classes.calcPriceInfo} align="center">
              1 {selectedCoin.name} ({selectedCoin.code.toUpperCase()}) ={" "}
              {currencyFormatter(selectedCoin.price)}
            </Typography>
          ) : null}
        </Grid>
      
      </Grid>
    </>
  );
};
