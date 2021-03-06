import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import { PieChart, Pie, Cell } from 'recharts';
import { Typography } from '@material-ui/core';
import { Tabs } from '@material-ui/core';
import { Tab } from '@material-ui/core';
import { motion } from 'framer-motion';
import { PortfolioContext } from '../shared/contexts/PortfolioContext';
import { useFormatter } from '../shared/utils/formatterHook';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    backgroundColor: theme.palette.common.blue3,
    marginTop: '1em',
    borderRadius: '0.6em',

    paddingBottom: '1em',
  },
  assetIcon: {
    backgroundColor: theme.palette.common.blue2,
    height: '10px',
    width: '10px',
    borderRadius: '50%',
    position: 'relative',
    top: '5px',
    left: '5px',
  },
  assetIconWrap: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
  },
  pieContainer: {
    position: 'relative',
  },
  graphLabel: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    [theme.breakpoints.up('xl')]: {
      fontSize: '1em',
    },
  },
  miniText: {
    color: theme.palette.common.white,
    marginBottom: '12px',
  },
  miniTextName: {
    fontSize: '0.75em',
    lineHeight: 'px',
    [theme.breakpoints.up('xl')]: {
      fontSize: '0.9em',
      lineHeight: '18px',
    },
  },
  miniTextPercentage: {
    fontSize: '0.6em',
    lineHeight: '12px',
    [theme.breakpoints.up('xl')]: {
      fontSize: '0.8em',
    },
  },
  labelPercentage: {
    fontSize: '1.2em',
  },
  labelValue: {
    fontSize: '0.7em',
    color: theme.palette.common.textPurple,
  },
  controlBar: {
    paddingLeft: '1em',
    paddingRight: '1em',
    backgroundColor: theme.palette.common.blue2,
    borderTopLeftRadius: '0.6em',
    borderTopRightRadius: '0.6em',
    marginBottom: '1em',
    height: '4em',

    [theme.breakpoints.up('xl')]: {
      fontSize: '1.2em',
    },
    '@media (min-width: 1024px)': {
      height: '3em',
    },
  },
  headline: {
    fontSize: '0.80em',
    color: theme.palette.common.white,
  },
  chartContainers: {
    marginBottom: '1em',
    '@media (min-width: 1024px)': {
      marginBottom: '0em',
    },
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
    width: '3.3em',
  },
}));

export const AssetStructure = () => {
  const { currencyFormatter } = useFormatter();
  const {
    totalSpentByCoin,
    totalProfit,
    totalSpent,
    portfolioList,
    coinListResponse,
  } = useContext(PortfolioContext);
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(1);
  const [data, setData] = useState([]);
  console.log(data)
  const tabHandler = (_, newValue) => {
    setTabValue(newValue);
  };

  // Render Logic
  useEffect(() => {
    const item = portfolioList;
    
    const renderFunc = (unit) => {
      const unitType = unit // value or profit
      if (item.length > 4) {
        const sortedTopThree = item.sort((a, b) => b[unitType] - a[unitType]).slice(0, 3);

        const rest = item.sort((a, b) => b[unitType] - a[unitType]).slice(3);
        const restValue = rest.reduce((sum, cur) => sum + cur[unitType], 0);
        const renderData = [
          ...sortedTopThree,
          { name: 'Rest', unitType: restValue },
        ];
        console.log(renderData)
        setData(renderData);
      } else {
        setData(item);
      }
    };

    tabValue === 1 ? renderFunc('value') : renderFunc('profit');
  }, [tabValue, totalSpentByCoin, portfolioList, coinListResponse]);

  const COLORS = ['#FF78CB', '#B4BDFF', '#9758A6', '#634893'];

  return (
    <>
      <Grid
        item
        container
        className={classes.mainGrid}
        justify="flex-start"
        alignItems="center"
        direction="column"
      >
        {/* Control Bar */}
        <Grid
          item
          direction="row"
          container
          alignItems="center"
          justify="space-between"
          className={classes.controlBar}
        >
          <Grid item container justify="flex-end" alignItems="center" xs>
            <Grid item container justify="flex-start">
              <Typography align="left" className={classes.headline}>
                Asset Structure
              </Typography>
            </Grid>
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
                label="By Value"
                className={classes.tab}
                classes={{ root: classes.tabRoot }}
              />
              <Tab
                label="By Profit"
                className={classes.tab}
                classes={{ root: classes.tabRoot }}
              />
            </Tabs>
          </Grid>
        </Grid>

        <Grid item container direction="column" alignItems="center">
          
          {/* Chart & Icons Container */}
          <Grid
            item
            container
            md
            direction="column"
            alignItems="center"
            justify="center"
          >
            {/* Chart */}
            <Grid
              item
              container
              justify="center"
              alignItems="center"
              className={classes.chartContainers}
            >
              <div className={classes.pieContainer}>
                <div className={classes.graphLabel}>
                  <Typography className={classes.labelPercentage}>
                    {portfolioList.length === 0 ? '' : '100%'}
                  </Typography>
                  <Typography className={classes.labelValue}>
                    {portfolioList.length === 0
                      ? ''
                      : `${currencyFormatter(
                          tabValue === 1 ? totalSpent : totalProfit
                        )} USD`}
                  </Typography>
                </div>
                  <PieChart height={200} width={200}>
                    <Pie
                      data={data}
                      innerRadius={65}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey={tabValue === 1 ? 'value' : 'profit'}
                    >
                      {data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
              </div>
            </Grid>

            {/* Asset Icons */}
            <Grid item container className={classes.iconContainers}>
              {data.map((coin, i) => {
                return (
                  <Grid
                    item
                    container
                    xs
                    alignItems="center"
                    spacing={1}
                    key={coin.name}
                    direction="column"
                  >
                    <Grid item>
                      <div
                        className={classes.assetIconWrap}
                        style={{ backgroundColor: COLORS[i] }}
                      >
                        <div className={classes.assetIcon} />
                      </div>
                    </Grid>

                    <Grid item className={classes.miniText}>
                      <Typography
                        align="center"
                        className={classes.miniTextName}
                      >
                        {coin.name}
                      </Typography>
                      <Typography
                        align="center"
                        className={classes.miniTextPercentage}
                      >
                        {tabValue === 1
                          ? ((coin.value / totalSpent) * 100).toFixed(2)
                          : ((coin.profit / totalProfit || 0) * 100).toFixed(2)}
                        %
                      </Typography>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
       
        </Grid>
      </Grid>
    </>
  );
};
