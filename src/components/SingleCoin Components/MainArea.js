import React, { useState, useEffect } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Typography } from "@material-ui/core";
import { useFormatter } from "../shared/utils/formatterHook";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { useTheme } from "@material-ui/core/styles";
import { useFetchData } from "../shared/hooks/fetchDataHook";

const useStyles = makeStyles((theme) => ({
  listContainer: {
    backgroundColor: theme.palette.common.blue3,
    padding: "1em",
    borderRadius: "1em",
    marginTop: "2em",
    marginRight: "1em",
  },
  list: {
    width: "100%",
  },
  headline: {
    fontSize: "1.5em",
    color: theme.palette.secondary.main,
  },
  headline2: {
    color: theme.palette.common.white,
    opacity: 0.6,
    fontSize: "0.8em",
  },
  underline: {
    borderBottom: "1px solid",
    color: theme.palette.primary.light,
    display: "block",
    width: "95%",
    margin: "auto",
    opacity: 0.8,
  },
  priceItem: {
    color: theme.palette.common.white,
    padding: "1em 1em",
  },
  dayTag: {
    padding: "0.2em",
    borderRadius: "0.2em",
    backgroundColor: theme.palette.common.buttonPurple,
    fontSize: "0.8em",
  },
  priceChangeItem: {
    color: theme.palette.common.white,
    padding: "1em 1em",
  },
  rightNumbers: {
    fontSize: "0.9em",
  },
  leftTexts: {
    fontSize: "0.9em",
  },
  descriptionGrid: {
    color: "white",
    padding: "1em",
  },
  infoHeadline: {
    fontSize: "1.5em",
    color: theme.palette.secondary.main,
    marginBottom: "1em",
  },
  infoDescription: {
    fontSize: "0.9em",
    opacity: 0.8,
    overflowY: "auto",
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
}));

export const MainArea = ({ singleCoinResponse }) => {
  const { currencyFormatter, dateFormatter } = useFormatter();
  const theme = useTheme();
  const classes = useStyles();
  const { fetchHistoricSingleData } = useFetchData();
  const [daysToFetch, setDaysToFetch] = useState(1);
  const [chartData, setChartData] = useState([]);
  const [chartDataType, setChartDataType] = useState(0);
  const [chartTimeType, setChartTimeType] = useState(1);
  const [coinHistoricResponse, setCoinHistoricResponse] = useState([]);
  const [formattedData, setFormattedData] = useState({})
  
  console.log("main area rendered.")

  // Data Fetching
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const fetch = async () => {
      try {
        const response = await fetchHistoricSingleData(
          singleCoinResponse?.data.id || "bitcoin",
          "usd",
          daysToFetch,
          source
        );
        setCoinHistoricResponse(response);
      } catch (err) {
        console.log(err)
      }
      
    };
    fetch()
    return () => {
      source.cancel()
    }
  }, [singleCoinResponse, daysToFetch, fetchHistoricSingleData]);

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
    setChartTimeType(days)
    setDaysToFetch(days);
  }, [chartTimeType]);

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
    if (chartDataType === 1) {
      data = coinHistoricResponse?.data?.market_caps.map((item) => {
        return {
          date: dateFormatter(new Date(item[0])),
          xData: new Date(item[0]).getHours(),
          yData: item[1],
        };
      });
    }

    // Volume Data
    if (chartDataType === 2) {
      data = coinHistoricResponse?.data?.total_volumes.map((item) => {
        return {
          date: dateFormatter(new Date(item[0])),
          xData: new Date(item[0]).getHours(),
          yData: item[1],
        };
      });
    }

    setChartData(data);
  }, [chartDataType, coinHistoricResponse, dateFormatter]);

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

  // Data Formatted & Editted
  useEffect(()=> {
    setFormattedData({
      coinCode: singleCoinResponse?.data.symbol.toUpperCase(),
      coinName: singleCoinResponse?.data.name,
      marketRank: singleCoinResponse?.data.market_cap_rank,
      priceCurrent: currencyFormatter(
        singleCoinResponse?.data.market_data.current_price.usd
        ),
      high24: currencyFormatter(
        singleCoinResponse?.data.market_data.high_24h.usd
        ),
      low24: currencyFormatter(
        singleCoinResponse?.data.market_data.low_24h.usd
        ),
      marketCap: currencyFormatter(
        singleCoinResponse?.data.market_data.market_cap.usd
        ),
      marketCapChange:
        singleCoinResponse?.data.market_data.market_cap_change_percentage_24h.toFixed(
        2
        ) + "%",
      priceChange1d:
        singleCoinResponse?.data.market_data.price_change_percentage_24h.toFixed(
        2
        ) + "%",
      priceChange7d:
        singleCoinResponse?.data.market_data.price_change_percentage_7d.toFixed(2) +
        "%",
      priceChange14d:
        singleCoinResponse?.data.market_data.price_change_percentage_14d.toFixed(
        2
        ) + "%",
      priceChange30d:
        singleCoinResponse?.data.market_data.price_change_percentage_30d.toFixed(
        2
        ) + "%",
      priceChange60d:
        singleCoinResponse?.data.market_data.price_change_percentage_60d.toFixed(
        2
        ) + "%",
      priceChange200d:
        singleCoinResponse?.data.market_data.price_change_percentage_200d.toFixed(
        2
        ) + "%",
      coinInfo: singleCoinResponse?.data.description.en.replace(
        /<[^>]*>?/gm,
        ""),
    })
  }, [currencyFormatter, singleCoinResponse])

  return (
    <>
      <Grid container>
        
        {/* Chart & Bitcoin Info */}
        <Grid item container direction="column" xs={8}>
          
          {/** Chart **/}
          <Grid item xs container>
            <LineChart
              width={((window.innerWidth - 100) / 3) * 2}
              height={400}
              data={chartData}
              margin={{ top: 30, right: 30, left: 0, bottom: 0 }}
            >
              <XAxis
                hide={chartData?.length === 0 ? true : false}
                dataKey="xData"
                type="category"
                tickCount="4"
                interval={40}
                stroke={theme.palette.common.textPurple}
              />
              <YAxis
                hide={chartData?.length === 0 ? true : false}
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
          </Grid>

          {/** Info **/}
          <Grid
            item
            xs
            container
            direction="column"
            className={classes.descriptionGrid}
          >
            <Typography className={classes.infoHeadline}>
              What is {formattedData.coinName} ?
            </Typography>
            <Typography className={classes.infoDescription} align="justify">
              {formattedData.coinInfo}
            </Typography>
          </Grid>
        
        </Grid>

        {/* Statistic Table */}
        <Grid item container xs={4}>
          <Grid
            item
            container
            xs={12}
            alignItems="flex-start"
            justify="flex-start"
            className={classes.listContainer}
          >
            <List className={classes.list}>
              <ListItem>
                <Typography className={classes.headline}>
                  {formattedData.coinCode} Price Statistics
                </Typography>
              </ListItem>
              <ListItem>
                <Typography className={classes.headline2}>
                  {formattedData.coinName} Price Today
                </Typography>
              </ListItem>

              <div className={classes.underline} />
              <ListItem className={classes.priceItem}>
                <Grid item container justify="space-between">
                  <Grid item>{formattedData.coinName} Price</Grid>
                  <Grid item>{formattedData.lengthpriceCurrent}</Grid>
                </Grid>
              </ListItem>

              <div className={classes.underline} />
              <ListItem className={classes.priceChangeItem}>
                <Grid item container justify="space-between">
                  <Grid item>
                    Price Change <span className={classes.dayTag}>24h</span>
                  </Grid>
                  <Grid item>{formattedData.priceCurrent}</Grid>
                </Grid>
              </ListItem>

              <div className={classes.underline} />
              <ListItem className={classes.priceChangeItem}>
                <Grid
                  item
                  container
                  alignItems="center"
                  justify="space-between"
                >
                  <Grid item>
                    <Typography className={classes.leftTexts}>
                      24h Low / 24h High
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.rightNumbers}>
                      {formattedData.low24}
                    </Typography>
                    <Typography className={classes.rightNumbers}>
                      {formattedData.high24}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>

              <div className={classes.underline} />
              <ListItem className={classes.priceChangeItem}>
                <Grid item container justify="space-between">
                  <Grid item>
                    <Typography className={classes.leftTexts}>
                      Market Rank
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.rightNumbers}>
                      #{formattedData.marketRank}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>

              <div className={classes.underline} />
              <ListItem className={classes.priceChangeItem}>
                <Grid item container justify="space-between">
                  <Grid item>
                    <Typography className={classes.leftTexts}>
                      Market Cap
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.rightNumbers}>
                      {formattedData.marketCap}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>

              <div className={classes.underline} />
              <ListItem className={classes.priceChangeItem}>
                <Grid item container justify="space-between">
                  <Grid item>
                    <Typography className={classes.leftTexts}>
                      Market Cap Change
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.rightNumbers}>
                      {formattedData.marketCapChange}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>

              <div className={classes.underline} />
              <ListItem className={classes.priceChangeItem}>
                <Grid item container justify="space-between">
                  <Grid item>
                    <Typography className={classes.leftTexts}>
                      Price Change 1 Day
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.rightNumbers}>
                      {formattedData.priceChange1d}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>

              <div className={classes.underline} />
              <ListItem className={classes.priceChangeItem}>
                <Grid item container justify="space-between">
                  <Grid item>
                    <Typography className={classes.leftTexts}>
                      Price Change 1 Week
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.rightNumbers}>
                      {formattedData.priceChange7d}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>

              <div className={classes.underline} />
              <ListItem className={classes.priceChangeItem}>
                <Grid item container justify="space-between">
                  <Grid item>
                    <Typography className={classes.leftTexts}>
                      Price Change 2 Week
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.rightNumbers}>
                      {formattedData.priceChange14d}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>

              <div className={classes.underline} />
              <ListItem className={classes.priceChangeItem}>
                <Grid item container justify="space-between">
                  <Grid item>
                    <Typography className={classes.leftTexts}>
                      Price Change 30 Days
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.rightNumbers}>
                      {formattedData.priceChange30d}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>

              <div className={classes.underline} />
              <ListItem className={classes.priceChangeItem}>
                <Grid item container justify="space-between">
                  <Grid item>
                    <Typography className={classes.leftTexts}>
                      Price Change 60 Days
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.rightNumbers}>
                      {formattedData.priceChange60d}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>

              <div className={classes.underline} />
              <ListItem className={classes.priceChangeItem}>
                <Grid item container justify="space-between">
                  <Grid item>
                    <Typography className={classes.leftTexts}>
                      Price Change 200 Days
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.rightNumbers}>
                      {formattedData.priceChange200d}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      
      </Grid>
    </>
  );
}
