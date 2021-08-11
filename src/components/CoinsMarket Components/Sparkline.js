import React from "react";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";

import { LineChart, Line, XAxis, YAxis } from "recharts";

export const Sparkline = ({ chartData, location }) => {
  const theme = useTheme();
  const matchMd = useMediaQuery(theme.breakpoints.down("md"));
  const matches600 = useMediaQuery("(max-width: 600px)");
  const matches800 = useMediaQuery("(max-width: 800px)");
  const matches950 = useMediaQuery("(max-width: 950px)");
  
  const data = chartData?.map((item) => {
    return {
      price: item,
    };
  });

  // Responsiveness 
  const responsiveSparkline = () => {
    if(location === "cards") {
      if(matches600) {
        return {
          width: 220,
          height: 50
        }
      }
      if(matches800) {
        return {
          width: 150,
          height: 50
        }
      }
      if(matches950) {
        return {
          width: 150,
          height: 50
        }
      }
    }

    return {
      width: matchMd ? 100 : 150,
      height: matchMd ? 50 : 60
    }

  }
    
  

  return (
    <Grid item container justify="center" >
      <LineChart
        width={responsiveSparkline()?.width}
        height={responsiveSparkline()?.height}
        data={data}
      >
        <XAxis hide dataKey="price" />
        <YAxis hide domain={["auto", "auto"]} />
        <Line
          type="monotone"
          dataKey="price"
          dot={false}
          stroke={theme.palette.secondary.main}
        />
      </LineChart>
    </Grid>
  );
};
