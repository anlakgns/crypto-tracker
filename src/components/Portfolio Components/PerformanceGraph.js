import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { motion } from "framer-motion";
import { Typography } from "@material-ui/core";
import { Tabs } from "@material-ui/core";
import { Tab } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    backgroundColor: theme.palette.common.blue3,
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
  },
  headline: {
    fontSize: "0.80em",
    color: theme.palette.common.white,
  },
  tabRoot: {
    minWidth: "10px",
    textTransform: "none",
    minHeight: "0",
    padding: "0",
    paddingLeft: "0.5em",
    paddingRight: "0.5em",
    marginLeft: "0.4em",
  },
  tabsRoot: {
    minHeight: "0",
  },
  tabs: {
    color: theme.palette.common.white,
  },
  tab: {
    fontSize: "0.7em",
    color: theme.palette.common.white,
  },
  customIndicator: {
    position: "absolute",
    backgroundColor: theme.palette.secondary.main,
    height: "1.2em",
    borderRadius: "3px",
    width: "1.5em",
  },
}));

export const PerformanceGraph = () => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(1);
  const tabHandler = (_, newValue) => {
    setTabValue(newValue);
  };

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: -3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: -2000,
      pv: -9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: -1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: -3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <>
      <Grid container className={classes.mainGrid} direction="column">
        <Grid item md>
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
                Portfolio Value
              </Typography>
            </Grid>
            <Grid
              item
              container
              justify="flex-end"
              md
              className={classes.iconGridContainer}
            >
              <Tabs
                value={tabValue}
                onChange={tabHandler}
                className={classes.tabs}
                classes={{ root: classes.tabsRoot }}
                TabIndicatorProps={{ style: { display: "none" } }}
              >
                <motion.div
                  className={classes.customIndicator}
                  animate={{ marginLeft: tabValue === 1 ? "0.45em" : "4.2em" }}
                  transition={{ duration: 0.6 }}
                  initial={false}
                />
                <Tab
                  label="1M"
                  className={classes.tab}
                  classes={{ root: classes.tabRoot }}
                />
                <Tab
                  label="3M"
                  className={classes.tab}
                  classes={{ root: classes.tabRoot }}
                />
                <Tab
                  label="6M"
                  className={classes.tab}
                  classes={{ root: classes.tabRoot }}
                />
                <Tab
                  label="1Y"
                  className={classes.tab}
                  classes={{ root: classes.tabRoot }}
                />
                <Tab
                  label="All"
                  className={classes.tab}
                  classes={{ root: classes.tabRoot }}
                />
              </Tabs>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <BarChart
            width={800}
            height={200}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <ReferenceLine y={0} stroke="#000" />
            <Bar dataKey="pv" fill="#FF78CB" />
            <Bar dataKey="uv" fill="#B4BDFF" />
          </BarChart>
        </Grid>
      </Grid>
    </>
  );
};
