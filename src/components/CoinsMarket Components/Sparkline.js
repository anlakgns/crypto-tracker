import React from "react"
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from "@material-ui/core/Grid";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";


export const Sparkline = ({chartData}) => {
  const theme = useTheme();
  const matchMd = useMediaQuery(theme.breakpoints.down("md"))

  const data = chartData.map(item => {
    return {
      price: item
    }
  })

  return (
    <Grid item container justify="center">
    <LineChart width={matchMd ? 100 : 150} height={matchMd ? 50 : 60} data={data}>
      <XAxis hide dataKey="price"/>
      <YAxis hide domain={["auto", "auto"]}
    />
      <Line 
        type="monotone" 
        dataKey="price" 
        dot={false}
        stroke={theme.palette.secondary.main}
 />
  </LineChart>
  </Grid>
  )
}