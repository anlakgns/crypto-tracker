import React from "react"
import Grid from "@material-ui/core/Grid"
import waves from "../../../assets/graph-dark.svg"



const Waves = () => {

  return (
    <Grid item>
      <img src={waves} style={{ width:"100%", height:"100%",}} alt="background pattern" />
    </Grid>
  )
} 

export default Waves