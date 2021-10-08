import React, { useState, useEffect, useContext } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { useFetchData } from '../shared/hooks/fetchDataHook';
import { PortfolioContext } from '../shared/contexts/PortfolioContext';

import { motion } from 'framer-motion';
import { Typography } from '@material-ui/core';
import { Tabs } from '@material-ui/core';
import { Tab } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: theme.palette.common.blue3,
    marginRight: '1em',
    borderRadius: '0.6em',
    position: 'relative',
    '@media (max-width:1024px)': {
      marginRight: '0em',
    },
    minHeight: '20em',
    '@media (min-width:1024px)': {
      minHeight: '12em',
    },
  },
  chartGrid: {
    marginTop: '4rem',
    '@media (min-width:1024px)': {
      marginTop: '2rem',
    },
  },
  controlBar: {
    paddingLeft: '1em',
    paddingRight: '1em',
    backgroundColor: theme.palette.common.blue2,
    borderTopLeftRadius: '0.6em',
    borderTopRightRadius: '0.6em',
    height: '4rem',
    [theme.breakpoints.up('xl')]: {
      fontSize: '1.2em',
    },
    '@media (min-width:600px)': {
      height: '3.5em',
    },
    position: 'absolute',
    top: 0,
  },
  headline: {
    fontSize: '0.80em',
    color: theme.palette.common.white,
  },
  tabRoot: {
    minWidth: '10px',
    textTransform: 'none',
    minHeight: '0',
    padding: '0',
    paddingLeft: '0.5em',
    paddingRight: '0.5em',
    marginLeft: '0.4em',
  },
  tabsRoot: {
    minHeight: '0',
  },
  tabs: {
    color: theme.palette.common.white,
  },
  tab: {
    fontSize: '0.7em',
    color: theme.palette.common.white,
  },
  customIndicator: {
    position: 'absolute',
    backgroundColor: theme.palette.secondary.main,
    height: '1.2em',
    borderRadius: '3px',
    width: '2.8em',
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
}));

export const PerformanceChart = () => {
  const theme = useTheme();
  const classes = useStyles();

  const { fetchPerformanceData } = useFetchData();
  const { portfolioList } = useContext(PortfolioContext);

  const [tabValue, setTabValue] = useState(1);
  const [editedData, setEditedData] = useState([]);
  const [portoflioNameList, setPortfolioNameList] = useState([]);
  const [renderData, setRenderData] = useState([]);
  const [performanceList, setPerformanceList] = useState([]);

  // Data Fetch
  useEffect(() => {
    const portfolioNames = portfolioList.map((coin) => coin.allInfo.id);
    setPortfolioNameList(portfolioNames);
    const fetch = async () => {
      const response = await fetchPerformanceData(portfolioNames, 'usd', 360);
      setPerformanceList(response);
    };
    fetch();
  }, [fetchPerformanceData, portfolioList]);

  // Data Format
  useEffect(() => {
    const prices = performanceList?.map((c) => c.data.prices);

    if (prices?.length > 0) {
      const edited = prices.map((item) => {
        return {
          weekly: {
            performance1:
              ((item[item.length - 1][1] - item[item.length - 7][1]) /
                item[item.length - 7][1]) *
              100,
            performance2:
              ((item[item.length - 8][1] - item[item.length - 15][1]) /
                item[item.length - 15][1]) *
              100,
            performance3:
              ((item[item.length - 16][1] - item[item.length - 23][1]) /
                item[item.length - 23][1]) *
              100,
            performance4:
              ((item[item.length - 24][1] - item[item.length - 31][1]) /
                item[item.length - 31][1]) *
              100,
            performance5:
              ((item[item.length - 32][1] - item[item.length - 39][1]) /
                item[item.length - 39][1]) *
              100,
            performance6:
              ((item[item.length - 40][1] - item[item.length - 47][1]) /
                item[item.length - 47][1]) *
              100,
          },
        };
      });
      setEditedData(edited);
    }
  }, [performanceList, portfolioList]);

  // Render Data
  useEffect(() => {
    let week1 = {
      name: 'Last 7 Days',
    };
    editedData.forEach((item, i) => {
      week1[portoflioNameList[i]] = item.weekly.performance1;
    });

    let week2 = {
      name: 'Two Weeks Ago',
    };
    editedData.forEach((item, i) => {
      week2[portoflioNameList[i]] = item.weekly.performance2;
    });
    let week3 = {
      name: 'Three Weeks Ago',
    };
    editedData.forEach((item, i) => {
      week3[portoflioNameList[i]] = item.weekly.performance3;
    });
    let week4 = {
      name: 'Four Weeks Ago',
    };
    editedData.forEach((item, i) => {
      week4[portoflioNameList[i]] = item.weekly.performance4;
    });
    let week5 = {
      name: 'Five Weeks Ago',
    };
    editedData.forEach((item, i) => {
      week5[portoflioNameList[i]] = item.weekly.performance5;
    });
    let week6 = {
      name: 'Six Weeks Ago',
    };
    editedData.forEach((item, i) => {
      week6[portoflioNameList[i]] = item.weekly.performance6;
    });

    const renderAll = [week1, week2, week3, week4, week5, week6];

    setRenderData(renderAll);
  }, [editedData, portoflioNameList]);

  //
  console.log(window.innerHeight);

  // Colors for Bars
  const COLORS = ['#FF78CB', '#B4BDFF', '#9758A6', '#634893'];

  const tabHandler = (_, newValue) => {
    setTabValue(newValue);
  };

  // Tooltip JSX
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={classes.tooltipContainer}>
          <p className="intro">{label}</p>
          <ul>
            {payload.map((c) => {
              return (
                <li key={c.name}>
                  {c.name}: {c.value.toFixed(2)}%
                </li>
              );
            })}
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
        className={classes.main}
        direction="column"
        justify="center"
        alignItems="center"
      >
        {/* Control Bar */}
        <Grid
          item
          container
          md
          alignItems="center"
          justify="center"
          className={classes.controlBar}
        >
          <Grid item xs>
            <Typography className={classes.headline}>
              Performance Chart
            </Typography>
          </Grid>
          <Grid
            item
            container
            justify="flex-end"
            xs
            className={classes.iconGridContainer}
          >
            <Tabs
              value={tabValue}
              onChange={tabHandler}
              className={classes.tabs}
              classes={{ root: classes.tabsRoot }}
              TabIndicatorProps={{ style: { display: 'none' } }}
            >
              <motion.div
                className={classes.customIndicator}
                animate={{ marginLeft: tabValue === 1 ? '0.45em' : '4.2em' }}
                transition={{ duration: 0.6 }}
                initial={false}
              />
              <Tab
                label="Weekly"
                className={classes.tab}
                classes={{ root: classes.tabRoot }}
              />
            </Tabs>
          </Grid>
        </Grid>

        {/* Chart */}
        <Grid
          item
          container
          justify="center"
          alignItems="center"
          xs
          className={classes.chartGrid}
        >
          <ResponsiveContainer
            height={(window.innerHeight - 100) / 3}
            width="90%"
          >
            <BarChart data={renderData}>
              <XAxis
                hide
                dataKey="name"
                stroke={theme.palette.common.textPurple}
              />
              <YAxis
                hide={portfolioList.length === 0 ? true : false}
                stroke={theme.palette.common.textPurple}
              />

              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={0} stroke="#000" />
              {portoflioNameList.map((item, i) => {
                return <Bar dataKey={item} fill={COLORS[i]} />;
              })}
            </BarChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </>
  );
};
