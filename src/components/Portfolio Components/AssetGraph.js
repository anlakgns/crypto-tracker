import React, {useState, useContext, useEffect} from "react";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import { PieChart, Pie, Cell } from "recharts";
import { Typography } from "@material-ui/core";
import { Tabs } from "@material-ui/core";
import { Tab } from "@material-ui/core";
import {motion} from "framer-motion"
import {PortfolioContext} from "../shared/contexts/PortfolioContext"
import {useFormatter} from "../shared/utils/formatterHook"

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    backgroundColor: theme.palette.common.blue3,
    marginTop: "1em",
    borderRadius: "0.6em",
  },
  assetIcon: {
    backgroundColor: theme.palette.common.blue2,
    height: "10px",
    width: "10px",
    borderRadius: "50%",
    position: "relative",
    top: "5px",
    left: "5px",
  },
  assetIconWrap: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
  },
  miniText: {
    color: theme.palette.common.white,
  },
  miniTextName: {
    fontSize: "0.75em",
    lineHeight: "12px",
  },
  miniTextPercentage: {
    fontSize: "0.6em",
    lineHeight: "12px",
  },
  iconContainers: {
    display: "flex",
    flexDirection: "row",
  },
  graphLabel: {
    position: "absolute",
    backgroundColor: "transparent",
    width: 180,
    height: 180,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  labelPercentage: {
    fontSize: "1.2em",
  },
  labelValue: {
    fontSize: "0.7em",
    color: theme.palette.common.textPurple,
  },
  controlBar: {
    paddingLeft:"1em",
    paddingRight:"1em",
    backgroundColor: theme.palette.common.blue2,
    borderTopLeftRadius: "0.6em",
    borderTopRightRadius: "0.6em",
    maxHeight:"2.5em",
    marginBottom:"1em"
  },
  headline:{
    fontSize:"0.80em",
    color: theme.palette.common.white
  },
  chartContainers:{
    marginBottom:"1em"
  },
  tabRoot: {
    minWidth: "10px",
    textTransform:"none",
    minHeight:"0",
    padding: "0",
    paddingLeft:"0.5em",
    paddingRight:"0.5em",
    marginLeft:"0.4em"
  },
  tabsRoot:{
    minHeight:"0",
  },
  tabs:{
    color: theme.palette.common.white,
  },
  tab:{
    fontSize:"0.7em",
    color: theme.palette.common.white,
  },
  customIndicator:{
    position:"absolute",
    backgroundColor: theme.palette.secondary.main,
    height:"1.2em",
    borderRadius:"3px",
    width:"3.3em",
  },
}));

export const AssetGraph = () => {
  const {currencyFormatter} = useFormatter()
  const {totalSpentByCoin,totalProfit, totalSpent, portfolioList, coinListResponse} = useContext(PortfolioContext)
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(1);
  const [data, setData] = useState([])

  const tabHandler = (_, newValue) => {
    setTabValue(newValue)
  } 

  // Render Logic 
  useEffect(()=> {
    

    const item = portfolioList
    
    const renderFunc = (unit) => {
      if(item.length > 4 ) {
        const sortedTopThree = item.sort((a,b)=> b.unit - a.unit).slice(0,3)
        const rest = item.sort((a,b)=> b.unit - a.unit).slice(3)
        const restValue = rest.reduce((sum, cur) => sum + cur.unit, 0)
        const renderData = [...sortedTopThree, {name : "Rest", unit: restValue }]
        setData(renderData)
        } else {
          setData(item)
        }
      }
      
      tabValue === 1 ? renderFunc(["value"]) : renderFunc(["profit"])

      
  }, [tabValue, totalSpentByCoin, portfolioList, coinListResponse])
  


  const COLORS = [
    "#FF78CB",
    "#B4BDFF",
    "#9758A6",
    "#634893"
    ];


  return (
    <>
      <Grid
        item
        container
        className={classes.mainGrid}
        justify="center"
        alignItems="center"
        direction="column"
      >


        {/* Control Bar */}
        <Grid item md container alignItems="center" justify="flex-end" className={classes.controlBar}>
          <Grid item md>
            <Typography className={classes.headline}>
              Asset Structure
            </Typography>
          </Grid>
          <Grid item container justify="flex-end" md className={classes.iconGridContainer} >
            <Tabs 
              value={tabValue}
              onChange={tabHandler}
              className={classes.tabs} 
              classes={{root: classes.tabsRoot}}
              TabIndicatorProps={{style: {display: "none"}}}>
              <motion.div 
              className={classes.customIndicator} 
              animate={{marginLeft: tabValue === 1 ? "0.45em" : "4.2em"}} 
              transition={{duration: 0.6}} 
              initial={false} />
              <Tab label="By Value" className={classes.tab} classes={{root: classes.tabRoot}}/>
              <Tab label="By Profit" className={classes.tab} classes={{root: classes.tabRoot}}/>
            </Tabs>
          </Grid>
        </Grid>


        {/* Chart */}
        <Grid item   className={classes.chartContainers}>
          <div className={classes.graphLabel}>
            <Typography className={classes.labelPercentage}>{portfolioList.length === 0 ? "": "100%"}</Typography>
            <Typography className={classes.labelValue}>
              {portfolioList.length === 0 ? "" : `${currencyFormatter(tabValue === 1 ?  totalSpent : totalProfit)} USD`} 
            </Typography>
          </div>
          <PieChart width={180} height={180}>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey= {tabValue === 1 ? "value" : "profit"}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </Grid>

        {/* Asset Icons */}
        <Grid item md container className={classes.iconContainers}>
          {data.map((coin, i) => {
            return (
              <Grid
                item
                xs
                container
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
                  <Typography className={classes.miniTextName}>
                    {coin.name}
                  </Typography>
                  <Typography
                    align="center"
                    className={classes.miniTextPercentage}
                  >
                    {tabValue === 1 ? (coin.value/totalSpent*100).toFixed(2) : (coin.profit/totalProfit*100).toFixed(2)}%
                  </Typography>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
};
