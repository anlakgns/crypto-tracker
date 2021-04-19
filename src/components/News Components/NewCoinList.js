import React from "react"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import NewCoinCard from "./NewCoinCard";

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    backgroundColor: theme.palette.common.darkPurple,
    overflow:"hidden",
    borderRadius:"2em",
    padding:"1em",
    marginBottom:"1em",
    [theme.breakpoints.down("xs")]: {
      borderRadius: "0em"
    }
  },
  headline:{
    color: "white",
    paddingLeft:"1em"
  },
  underline: {
    borderBottom: `2px solid ${theme.palette.secondary.main}`,
    borderRadius: "2px",
    maxWidth:"90%",
    marginLeft:"1em",
  },
  item:{
    paddingLeft:"1em",
    paddingRight:"1em",
    paddingBottom:"1em",
  },

}))



const NewList = ()=> {

  const classes = useStyles();
  return (
    <>
    <Grid container direction="column" className={classes.cardContainer} wrap="nowrap">
      <Typography align="left" className={classes.headline}>Top Coins</Typography>
      <div className={classes.underline} />
      <Grid item className={classes.item}  >
      </Grid>
      <Grid item className={classes.item}  >
       <NewCoinCard coinName={"Bitcoin"} />
      </Grid>
      <Grid item className={classes.item}  >
       <NewCoinCard coinName={"Ripple"} />
      </Grid>
      <Grid item className={classes.item}  >
       <NewCoinCard coinName={"Etherium"} />
      </Grid>
      <Grid item className={classes.item}  >
       <NewCoinCard coinName={"CoinOne"} />
      </Grid>
      <Grid item className={classes.item}  >
       <NewCoinCard coinName={"CoinBlack"} />
      </Grid>
    
    </Grid>
    </>
  )
}

export default NewList