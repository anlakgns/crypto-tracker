import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Typography } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Tabs } from '@material-ui/core';
import { Tab } from '@material-ui/core';

import { useFormatter } from '../shared/utils/formatterHook';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useTheme } from '@material-ui/core/styles';
import { useFetchData } from '../shared/hooks/fetchDataHook';

const useStyles = makeStyles((theme) => ({
  listContainer: {
    backgroundColor: theme.palette.common.blue3,
    padding: '1em',
    borderRadius: '1em',
    marginTop: '2em',
    maxHeight: '50em',
    marginRight: '1em',
    '@media (max-width:960px)': {
      marginLeft: '1em',
    },
  },
  charBitcoinGrid: {
    flex: 8,
  },
  statisticTableGrid: {
    flex: 4,
    marginBottom:"2em"
  },
  list: {
    width: '100%',
  },
  headline: {
    fontSize: '1.5em',
    color: theme.palette.secondary.main,
  },
  headline2: {
    color: theme.palette.common.white,
    opacity: 0.6,
    fontSize: '0.8em',
  },
  underline: {
    borderBottom: '1px solid',
    color: theme.palette.primary.light,
    display: 'block',
    width: '95%',
    margin: 'auto',
    opacity: 0.8,
  },
  priceItem: {
    color: theme.palette.common.white,
    padding: '1em 1em',
  },
  dayTag: {
    padding: '0.2em',
    borderRadius: '0.2em',
    backgroundColor: theme.palette.common.buttonPurple,
    fontSize: '0.8em',
  },
  priceChangeItem: {
    color: theme.palette.common.white,
    padding: '1em 1em',
  },
  rightNumbers: {
    fontSize: '0.9em',
  },
  leftTexts: {
    fontSize: '0.9em',
  },
  descriptionGrid: {
    color: 'white',
    padding: '1em',
    position: 'relative',
    width: '97%',
    margin: '2em 0em',
  },
  infoHeadline: {
    fontSize: '1.5em',
    color: theme.palette.secondary.main,
    marginBottom: '1em',
  },
  infoDescriptionFading: {
    fontSize: '0.9em',
    opacity: 0.8,
    position: 'relative',
    zIndex: 1200,
    overflowY: 'auto',
    '&::before': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      height: '80px',
      width: '100%',
      background: 'linear-gradient(transparent, #2E3880)',
    },
  },
  infoDescriptionNoFading: {
    fontSize: '0.9em',
    opacity: 0.8,
    position: 'relative',
    zIndex: 1200,
    overflowY: 'auto',
  },
  readMore: {
    color: theme.palette.secondary.main,
    opacity: 1,
    position: 'relative',
    zIndex: 1500,
    marginLeft: '1em',
    cursor: 'pointer',
  },

  tooltipContainer: {
    background:
      'linear-gradient(20deg, rgba(87,95,153,1) 50%, rgba(255,147,213,1) 100%)',
    border: '4px solid',
    borderColor: theme.palette.primary.main,
    borderRadius: '1em',
    padding: '0.5em',
    color: theme.palette.common.white,
  },

  // Chart Css
  controlBar: {
    paddingLeft: '1em',
    paddingRight: '1em',
    backgroundColor: theme.palette.common.blue3,
    borderTopLeftRadius: '1em',
    borderTopRightRadius: '1em',
    minHeight: '3.8em',
    [theme.breakpoints.up('xl')]: {
      fontSize: '1.2em',
    },
    '@media (max-width:653px)': {
      minHeight: '4.8em',
    },
    width: '95%',
    marginLeft: '1em',
    marginTop: '2em',
    '@media (max-width:960px)': {
      margin: 'auto',
    },
  },
  lineChart: {
    backgroundColor: theme.palette.common.blue2,
    width: '95%',
    marginLeft: '1em',
    borderBottomLeftRadius: '1em',
    borderBottomRightRadius: '1em',
    paddingTop: '1em',
    paddingBottom: '1em',
    marginBottom: '1em',
    '@media (max-width:960px)': {
      margin: 'auto',
    },
  },
  headlineChart: {
    fontSize: '0.80em',
    color: theme.palette.common.white,
    marginRight: '0.5em',
  },
  tabsData: {
    color: theme.palette.primary.main,
    backgroundColor: 'white',
    borderRadius: '1.5em',
    minHeight: '0',
    height: '1.5em',
    '@media (max-width:653px)': {
      marginBottom: '0.6em',
    },
  },
  customDataIndicator: {
    position: 'absolute',
    backgroundColor: theme.palette.secondary.light,
    height: '1em',
    borderRadius: '30px',
    width: '4.6em',
    margin: '0.25em',
  },
  tabData: {
    width: '7em',
    fontSize: '0.7em',
    textTransform: 'none',
  },
  tabDataRoot: {
    minWidth: 0,
    minHeight: '0',
    padding: '0.2em',
  },
  tabTimeRoot: {
    minWidth: '10px',
    textTransform: 'none',
    minHeight: '0',
    padding: '0',
    paddingLeft: '0.5em',
    paddingRight: '0.5em',
    marginLeft: '0.4em',
  },
  tabsTimeRoot: {
    minHeight: '0',
  },
  tabsTime: {
    color: theme.palette.common.white,
  },
  tabTime: {
    fontSize: '0.7em',
    color: theme.palette.common.white,
  },
  customTimeIndicator: {
    position: 'absolute',
    backgroundColor: theme.palette.secondary.main,
    height: '1.2em',
    borderRadius: '3px',
    width: '1.5em',
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
  const [readMore, setReadMore] = useState(false);
  const [coinHistoricResponse, setCoinHistoricResponse] = useState([]);
  const [formattedData, setFormattedData] = useState({});
  const descriptionRef = useRef();
  const matchesMDdown = useMediaQuery('@media (max-width:959.95px)');
  const matches653 = useMediaQuery('(max-width:653px)');
  console.log(theme.breakpoints.down('sm'));
  // Data Fetching
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const fetch = async () => {
      try {
        const response = await fetchHistoricSingleData(
          singleCoinResponse?.data.id || 'bitcoin',
          'usd',
          daysToFetch,
          source
        );
        setCoinHistoricResponse(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
    return () => {
      source.cancel();
    };
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
        days = 'max';
        break;
      default:
        days = 1;
    }
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

  // Data Formatted & Editted
  useEffect(() => {
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
        ) + '%',
      priceChangeAmount: currencyFormatter(
        singleCoinResponse?.data.market_data.price_change_24h
      ),
      priceChange1d:
        singleCoinResponse?.data.market_data.price_change_percentage_24h.toFixed(
          2
        ) + '%',
      priceChange7d:
        singleCoinResponse?.data.market_data.price_change_percentage_7d.toFixed(
          2
        ) + '%',
      priceChange14d:
        singleCoinResponse?.data.market_data.price_change_percentage_14d.toFixed(
          2
        ) + '%',
      priceChange30d:
        singleCoinResponse?.data.market_data.price_change_percentage_30d.toFixed(
          2
        ) + '%',
      priceChange60d:
        singleCoinResponse?.data.market_data.price_change_percentage_60d.toFixed(
          2
        ) + '%',
      priceChange200d:
        singleCoinResponse?.data.market_data.price_change_percentage_200d.toFixed(
          2
        ) + '%',
      coinInfo: singleCoinResponse?.data.description.en.replace(
        /<[^>]*>?/gm,
        ''
      ),
    });
  }, [currencyFormatter, singleCoinResponse]);

  // Tooltip
  const CustomTooltip = ({ active, payload }) => {
    let name;
    switch (chartDataType) {
      case 0:
        name = 'Price';
        break;
      case 1:
        name = 'Market Cap';
        break;
      case 2:
        name = 'Volume';
        break;
      default:
        name = 'Price';
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

  // Switcher Animation for Framer Motion
  const indicatorDataStyle = () => {
    let marginLeft;
    switch (chartDataType) {
      case 0:
        marginLeft = '0.25em';
        break;
      case 1:
        marginLeft = '5em';
        break;
      case 2:
        marginLeft = '9.8em';
        break;
      default:
        marginLeft = '0.25em';
    }
    return marginLeft;
  };
  const indicatorTimeStyle = () => {
    let marginLeft;
    switch (chartTimeType) {
      case 1:
        marginLeft = '0.35em';
        break;
      case 2:
        marginLeft = '2.2em';
        break;
      case 3:
        marginLeft = '4.2em';
        break;
      case 4:
        marginLeft = '6.2em';
        break;
      case 5:
        marginLeft = '8.15em';
        break;
      case 6:
        marginLeft = '10em';
        break;
      default:
        marginLeft = '';
    }
    return marginLeft;
  };

  // Switch Handlers
  const chartDataSwitcher = (e, newValue) => {
    setChartDataType(newValue);
  };
  const timeSwitcher = (_, newValue) => {
    setChartTimeType(newValue);
  };

  // readMore Handler
  const readMoreHandler = () => {
    setReadMore(!readMore);
    descriptionRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  };

  // readMore render
  const readMore1200 = () => {
    return (
      <>
        <span>
          {readMore
            ? `${formattedData.coinInfo}`
            : `${formattedData.coinInfo?.substring(0, 1200)}......`}
        </span>
        {readMore ? (
          <span className={classes.readMore} onClick={readMoreHandler}>
            read less
          </span>
        ) : (
          <span className={classes.readMore} onClick={readMoreHandler}>
            read more
          </span>
        )}
      </>
    );
  };

  // readMore Class Logic
  const readMoreClass = () => {
    if (formattedData.coinInfo?.length > 1200) {
      if (readMore) {
        return classes.infoDescriptionNoFading;
      } else {
        return classes.infoDescriptionFading;
      }
    }
    if (formattedData.coinInfo?.length <= 1200) {
      return classes.infoDescriptionNoFading;
    }
  };

  return (
    <>
      <Grid container direction={matchesMDdown ? 'column' : 'row'}>
        {/* Chart & Bitcoin Info */}
        <Grid
          item
          container
          direction="column"
          className={classes.charBitcoinGrid}
        >
          {/** Chart **/}
          <Grid item xs container direction="column">
            {/*** Control Bar ***/}
            <Grid
              item
              container
              md
              alignItems="center"
              justify="flex-end"
              className={classes.controlBar}
            >
              {/**** Group 1 for responsiveness ****/}
              <Grid item container xs={3}>
                {/**** Headline *****/}
                <Grid item xs>
                  <Typography className={classes.headlineChart}>
                    {formattedData?.coinName} Historic Chart
                  </Typography>
                </Grid>
              </Grid>

              {/**** Group 2 for responsiveness ****/}
              <Grid item container xs={9}>
                {/***** Switcher -  Among Transaction Types ****/}
                <Grid
                  item
                  xs
                  container
                  justify={matches653 ? 'flex-end' : 'center'}
                >
                  <Tabs
                    value={chartDataType}
                    onChange={chartDataSwitcher}
                    className={classes.tabsData}
                    component={motion.div}
                    TabIndicatorProps={{ style: { display: 'none' } }}
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
                </Grid>

                {/**** Time Tabs ****/}
                <Grid item container justify={'flex-end'} xs>
                  <Tabs
                    value={chartTimeType}
                    onChange={timeSwitcher}
                    className={classes.tabsTime}
                    classes={{ root: classes.tabsTimeRoot }}
                    TabIndicatorProps={{ style: { display: 'none' } }}
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
            </Grid>

            {/*** Line Chart ***/}
            <Grid
              item
              container
              xs
              justify="center"
              alignItems="center"
              className={classes.lineChart}
            >
              <ResponsiveContainer height={400} width={'90%'}>
                <LineChart data={chartData}>
                  <XAxis
                    dataKey="xData"
                    type="category"
                    tickCount="4"
                    interval={40}
                    stroke={theme.palette.common.textPurple}
                  />
                  <YAxis
                    dataKey="yData"
                    type="number"
                    tickCount="3"
                    domain={['auto', 'auto']}
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

          {/** Info **/}
          <Grid
            item
            xs
            container
            direction="column"
            className={classes.descriptionGrid}
          >
            <Typography ref={descriptionRef} className={classes.infoHeadline}>
              What is {formattedData.coinName} ?
            </Typography>
            <Typography className={readMoreClass()} align="justify">
              {formattedData.coinInfo?.length > 1200
                ? readMore1200()
                : formattedData.coinInfo}
            </Typography>
          </Grid>
        </Grid>

        {/* Statistic Table */}
        <Grid item container className={classes.statisticTableGrid}>
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
                  <Grid item>{formattedData.priceCurrent}</Grid>
                </Grid>
              </ListItem>

              <div className={classes.underline} />
              <ListItem className={classes.priceChangeItem}>
                <Grid item container justify="space-between">
                  <Grid item>
                    Price Change <span className={classes.dayTag}>24h</span>
                  </Grid>
                  <Grid item>{formattedData.priceChangeAmount}</Grid>
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
};
