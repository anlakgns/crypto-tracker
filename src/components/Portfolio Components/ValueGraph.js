import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";

import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import { useTheme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Tabs } from "@material-ui/core";
import { Tab } from "@material-ui/core";

import { useFetchData } from "../shared/hooks/fetchDataHook";
import { useFormatter } from "../shared/utils/formatterHook";
import { PortfolioContext } from "../shared/contexts/PortfolioContext";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    backgroundColor: theme.palette.common.blue3,
    marginBottom: "1em",
    marginRight: "1em",
    borderRadius: "0.6em",
  },
  controlBar: {
    paddingLeft: "1em",
    paddingRight: "1em",
    backgroundColor: theme.palette.common.blue2,
    borderTopLeftRadius: "0.6em",
    borderTopRightRadius: "0.6em",
    maxHeight: "2.5em",
    minHeight: "3.8em",
    marginBottom: "1em",
    [theme.breakpoints.up("xl")]: {
      fontSize:"1.2em"
    }
  },
  headline: {
    fontSize: "0.80em",
    color: theme.palette.common.white,
  },
  tabTimeRoot: {
    minWidth: "10px",
    textTransform: "none",
    minHeight: "0",
    padding: "0",
    paddingLeft: "0.5em",
    paddingRight: "0.5em",
    marginLeft: "0.4em",
  },
  tabsTimeRoot: {
    minHeight: "0",
  },
  tabsTime: {
    color: theme.palette.common.white,
  },
  tabTime: {
    fontSize: "0.7em",
    color: theme.palette.common.white,
  },
  customTimeIndicator: {
    position: "absolute",
    backgroundColor: theme.palette.secondary.main,
    height: "1.2em",
    borderRadius: "3px",
    width: "1.5em",
  },
  tooltipContainer: {
    background:
      "linear-gradient(20deg, rgba(87,95,153,1) 50%, rgba(255,147,213,1) 100%)",
    border: "4px solid",
    borderColor: theme.palette.primary.main,
    borderRadius: "1em",
    padding: "0.5em",
    color: theme.palette.common.white,
  },
  tabsData: {
    color: theme.palette.primary.main,
    backgroundColor: "white",
    borderRadius: "1.5em",
    minHeight: "0",
    height: "1.5em",
  },
  tabData: {
    width: "7em",
    fontSize: "0.7em",
    textTransform: "none",
  },
  tabDataRoot: {
    minWidth: 0,
    minHeight: "0",
    padding: "0.2em",
  },
  customDataIndicator: {
    position: "absolute",
    backgroundColor: theme.palette.secondary.light,
    height: "1em",
    borderRadius: "30px",
    width: "4.6em",
    margin: "0.25em",
  },
  chartSelectType: {
    height: "1em",
  },
  chartTypeformControl: {
    margin: theme.spacing(1),
    minWidth: 50,
  },
  chartTypeSelect: {
    height: "1.8em",
    borderRadius: "1em",
    width: "7em",
    color: theme.palette.primary.main,
    paddingLeft: "0.5em",
    paddingRight: "0.5em",
  },
  totalSpent: {
    color: theme.palette.common.white,
    fontSize: "0.8em",
  },
  totalProfit: {
    fontSize: "0.8em",
  },
}));

export const ValueGraph = () => {
  const theme = useTheme();
  const classes = useStyles();

  const { dateFormatter, currencyFormatter } = useFormatter();
  const {
    fetchHistoricOneData,
    fetchHistoricBundleData,
  } = useFetchData();
  const [chartDataType, setChartDataType] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [coinHistoricResponse, setCoinHistoricResponse] = useState([])
  const {
    selectedCoinForGraph,
    setSelectedCoinForGraph,
    portfolioList,
    totalSpent,
    totalProfit,
  } = useContext(PortfolioContext);
  const [chartTimeType, setChartTimeType] = useState(1);
  const [daysToFetch, setDaysToFetch] = useState(1);
  
  // Dynamic One Coin Data Fetching
  useEffect(() => {
    if (selectedCoinForGraph !== "All Assets") {
      const fetch = async () => {
        const response = await fetchHistoricOneData(selectedCoinForGraph, "usd", daysToFetch);
        setCoinHistoricResponse(response)
      }
      fetch()
    }
  }, [daysToFetch, fetchHistoricOneData, selectedCoinForGraph]);

  // Dynamic Portfolio Fetching
  useEffect(() => {
    if (selectedCoinForGraph === "All Assets") {
      const portfolioNameList = portfolioList.map((coin) => coin.allInfo.id);
      const quantities = portfolioList.map((coin) => coin.quantity);
      const fetch = async () => {
        const response = await fetchHistoricBundleData(
            portfolioNameList,
            "usd",
            daysToFetch,
            quantities
          )
        setCoinHistoricResponse(response)
      }
      fetch()
    }
  }, [
    daysToFetch,
    fetchHistoricBundleData,
    portfolioList,
    selectedCoinForGraph,
  ]);

  // Historical Coverage Logic
  useEffect(() => {
    let days;
    switch (chartTimeType) {
      case 1:
        days = 1;
        break;
      case 2:
        days = 7;
        break;
      case 3:
        days = 30;
        break;
      case 4:
        days = 180;
        break;
      case 5:
        days = 360;
        break;
      case 6:
        days = "max";
        break;
      default:
        days = 1;
    }
    setDaysToFetch(days);
  }, [chartTimeType]);

  // Switch Handlers
  const chartDataSwitcher = (e, newValue) => {
    setChartDataType(newValue);
  };
  const timeSwitcher = (_, newValue) => {
    setChartTimeType(newValue);
  };

  // Switcher Animation for Framer Motion
  const indicatorDataStyle = () => {
    let marginLeft;
    switch (chartDataType) {
      case 0:
        marginLeft = "0.25em";
        break;
      case 1:
        marginLeft = "5em";
        break;
      case 2:
        marginLeft = "9.8em";
        break;
      default:
        marginLeft = "0.25em";
    }
    return marginLeft;
  };
  const indicatorTimeStyle = () => {
    let marginLeft;
    switch (chartTimeType) {
      case 1:
        marginLeft = "0.35em";
        break;
      case 2:
        marginLeft = "2.2em";
        break;
      case 3:
        marginLeft = "4.2em";
        break;
      case 4:
        marginLeft = "6.2em";
        break;
      case 5:
        marginLeft = "8.15em";
        break;
      case 6:
        marginLeft = "10em";
        break;
      default:
        marginLeft = "";
    }
    return marginLeft;
  };

  // Chart Data
  useEffect(() => {
    let data;
    // Price Data
    if (chartDataType === 0) {
      data = coinHistoricResponse?.data?.prices.map((item) => {
        return {
          date: dateFormatter(new Date(item[0])),
          xData: new Date(item[0]).getHours(),
          yData: item[1],
        };
      });
    }

    // Market Cap Data
    if (chartDataType === 1 && selectedCoinForGraph !== "All Assets") {
      console.log(coinHistoricResponse);
      data = coinHistoricResponse?.data?.market_caps.map((item) => {
        return {
          date: dateFormatter(new Date(item[0])),
          xData: new Date(item[0]).getHours(),
          yData: item[1],
        };
      });
    }

    // Volume Data
    if (chartDataType === 2 && selectedCoinForGraph !== "All Assets") {
      data = coinHistoricResponse?.data?.total_volumes.map((item) => {
        return {
          date: dateFormatter(new Date(item[0])),
          xData: new Date(item[0]).getHours(),
          yData: item[1],
        };
      });
    }

    setChartData(data);
  }, [
    chartDataType,
    coinHistoricResponse,
    dateFormatter,
    selectedCoinForGraph,
  ]);

  // Clean Chart Data
  useEffect(() => {
    if (portfolioList.length === 0) {
      setChartData([]);
      setSelectedCoinForGraph("All Assets");
    }
  }, [portfolioList, setSelectedCoinForGraph]);

  const chartSelectHandler = (event) => {
    event.preventDefault();
    setSelectedCoinForGraph(event.target.value);
    if (event.target.value === "All Assets") {
      setChartDataType(0);
    }
  };

  // Tooltip
  const CustomTooltip = ({ active, payload }) => {
    let name;
    switch (chartDataType) {
      case 0:
        name = "Price";
        break;
      case 1:
        name = "Market Cap";
        break;
      case 2:
        name = "Volume";
        break;
      default:
        name = "Price";
    }

    if (active && payload && payload.length) {
      return (
        <div className={classes.tooltipContainer}>
          <p className="label">{`${payload[0].payload.date}`}</p>
          <ul>
            <li className="price">{` ${name} : ${currencyFormatter(
              payload[0].value
            )}`}</li>
          </ul>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <Grid
        container
        className={classes.mainGrid}
        justify="center"
        alignItems="center"
        direction="column"
      >
        
        {/* Control Bar */}
        <Grid
          item
          md
          container
          alignItems="center"
          justify="flex-end"
          className={classes.controlBar}
        >
          <Grid item md>
            <Typography className={classes.headline}>
              {selectedCoinForGraph?.name || "Portfolio"} Historic Chart
            </Typography>
          </Grid>

          {/* Chart Type Select */}
          <Grid item md>
            <form>
              <select
                name="cars"
                value={selectedCoinForGraph}
                className={classes.chartTypeSelect}
                onChange={chartSelectHandler}
              >
                <option value="All Assets">All Assets</option>
                {portfolioList.map((coin, i) => {
                  return (
                    <option value={coin.allInfo.id} key={i}>
                      {coin.name}
                    </option>
                  );
                })}
              </select>
            </form>
          </Grid>

          {/* Switcher -  Among Transaction Types */}
          <Grid item md container justify="center">
            {selectedCoinForGraph !== "All Assets" ? (
              <Tabs
                value={chartDataType}
                onChange={chartDataSwitcher}
                className={classes.tabsData}
                component={motion.div}
                TabIndicatorProps={{ style: { display: "none" } }}
              >
                <motion.div
                  className={classes.customDataIndicator}
                  animate={{ marginLeft: indicatorDataStyle() }}
                  transition={{ duration: 0.6 }}
                  initial={false}
                />
                <Tab
                  disableRipple
                  value={0}
                  label="Price"
                  className={classes.tabData}
                  classes={{ root: classes.tabDataRoot }}
                />
                <Tab
                  disableRipple
                  value={1}
                  label="Market Cap"
                  className={classes.tabData}
                  classes={{ root: classes.tabDataRoot }}
                />
                <Tab
                  disableRipple
                  value={2}
                  label="Volume"
                  className={classes.tabData}
                  classes={{ root: classes.tabDataRoot }}
                />
              </Tabs>
            ) : (
              <Grid container>
                <Grid item>
                  <Typography className={classes.totalSpent}>
                    {totalSpent === 0
                      ? ""
                      : `${currencyFormatter(totalSpent)} USD`}{" "}
                  </Typography>
                  <Typography
                    style={{ color: totalProfit > 0 ? "green" : "red" }}
                    className={classes.totalProfit}
                  >
                    {totalProfit === 0 ? "" : currencyFormatter(totalProfit)}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Grid>

          {/* Time Tabs */}
          <Grid
            item
            container
            justify="flex-end"
            md
            className={classes.iconGridContainer}
          >
            <Tabs
              value={chartTimeType}
              onChange={timeSwitcher}
              className={classes.tabsTime}
              classes={{ root: classes.tabsTimeRoot }}
              TabIndicatorProps={{ style: { display: "none" } }}
            >
              <motion.div
                className={classes.customTimeIndicator}
                animate={{ marginLeft: indicatorTimeStyle() }}
                transition={{ duration: 0.6 }}
                initial={false}
              />
              <Tab
                label="1D"
                className={classes.tabTime}
                classes={{ root: classes.tabTimeRoot }}
              />
              <Tab
                label="7D"
                className={classes.tabTime}
                classes={{ root: classes.tabTimeRoot }}
              />
              <Tab
                label="1M"
                className={classes.tabTime}
                classes={{ root: classes.tabTimeRoot }}
              />
              <Tab
                label="6M"
                className={classes.tabTime}
                classes={{ root: classes.tabTimeRoot }}
              />
              <Tab
                label="1Y"
                className={classes.tabTime}
                classes={{ root: classes.tabTimeRoot }}
              />
              <Tab
                label="All"
                className={classes.tabTime}
                classes={{ root: classes.tabTimeRoot }}
              />
            </Tabs>
          </Grid>
        </Grid>

        {/* Line Chart */}
        <Grid 
          item container xs 
          justify="center" 
          alignItems="center" >
          <ResponsiveContainer height={315} width="90%">
            <LineChart
              data={chartData}
            >
              <XAxis
                hide={portfolioList.length === 0 ? true : false}
                dataKey="xData"
                type="category"
                tickCount="4"
                interval={40}
                stroke={theme.palette.common.textPurple}
              />
              <YAxis
                hide={portfolioList.length === 0 ? true : false}
                dataKey="yData"
                type="number"
                tickCount="3"
                domain={["auto", "auto"]}
                stroke={theme.palette.common.textPurple}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="yData"
                stroke={theme.palette.secondary.main}
                dot={false}
                name="yData"
              />
            </LineChart>
          </ResponsiveContainer>
        </Grid>
      
      </Grid>
    </>
  );
};
