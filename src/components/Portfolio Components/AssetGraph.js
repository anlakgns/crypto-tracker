import React from "react"
import {makeStyles} from '@material-ui/styles'
import Grid from "@material-ui/core/Grid"
import { PieChart, Pie, Cell } from "recharts";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  mainGrid: {
    backgroundColor: theme.palette.common.blue3,
    marginTop:"1em",
    borderRadius:"0.6em",
  },
  assetIcon:{
    backgroundColor: theme.palette.common.blue2,
    height:"10px",
    width:"10px",
    borderRadius:"50%",
    position: "relative",
	  top: "5px",
	  left: "5px"
  },
  assetIconWrap:{
    width: "20px",
	  height: "20px",
	  borderRadius: "50%",
  },
  miniText:{
    color: theme.palette.common.white
  },
  miniTextName: {
    fontSize:"0.75em",
    lineHeight: "12px",
  },
  miniTextPercentage:{
    fontSize:"0.6em",
    lineHeight: "12px",

  },
  iconContainers:{
    display:"flex",
    flexDirection:"row"
  },
  graphLabel:{
    position: "absolute",
    backgroundColor:"transparent",
    width:180,
    height:180,
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    color:"white"
  },
  labelPercentage: {
    fontSize:"1.2em",

  },
  labelValue: {
    fontSize:"0.7em",
    color: theme.palette.common.textPurple
  }

}))

export const AssetGraph = ()=> {

  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 }
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const classes = useStyles()
  return (
    <>

    <Grid 
      item container 
      className={classes.mainGrid}
      justify="center"
      alignItems="center"
      >
      {/* Chart */}
      <Grid item>
        <div className={classes.graphLabel}>
          <Typography className={classes.labelPercentage} >100%</Typography>
          <Typography className={classes.labelValue}>105,729.06 USD</Typography>
        </div>
        <PieChart width={180} height={180}>

          <Pie
            data={data}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </Grid>
      
      {/* Asset Icons */}
      <Grid item container className={classes.iconContainers}>

        {data.map((coin,i)  => {
          return (
            <Grid item xs container alignItems="center" spacing={1} key={coin.name} direction="column" >
              <Grid item >
                <div className={classes.assetIconWrap} style={{backgroundColor: COLORS[i]}}>
                  <div className={classes.assetIcon} />
                </div>
              </Grid>
    
              <Grid item className={classes.miniText}>  
                <Typography className={classes.miniTextName}>{coin.name}</Typography> 
                <Typography align="center" className={classes.miniTextPercentage}>15%</Typography> 
              </Grid>
            </Grid>
          )
        })}
        
      </Grid>
  
    </Grid>

    </>
  )
}
