import React from "react"
import {makeStyles} from '@material-ui/styles'
import Grid from "@material-ui/core/Grid"
import HeaderM from "../components/Landing Components/Introduction Section/HeaderM"
import waves from "../assets/graph-dark.svg"
import CoinTable from "../components/CoinsMarket Components/CoinTable"


const useStyles = makeStyles(theme => ({ 
  mainContainer: {
    backgroundColor: theme.palette.common.blue2,

  },
  waves: { 
    width:"100%", 
    position:"relative", 
    marginBottom:"-9em"
  },
}))

const CoinMarketPage = ()=> {
  const classes = useStyles()
  return (
    <>
      <Grid container className={classes.mainContainer} direction="column" justify="center" alignItems="center" >
        
        {/* Header Section */}
        <Grid item container >
              <HeaderM />
        </Grid>
        <Grid item container  md={11} direction="column"  >
              <CoinTable />
        </Grid>
        <Grid item >
          <img src={waves} className={classes.waves} alt="background pattern" />
        </Grid>
  
      </Grid>
    </>

  )
}

export default CoinMarketPage