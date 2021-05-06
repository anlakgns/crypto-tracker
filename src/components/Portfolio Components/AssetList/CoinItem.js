import React from "react"
import {makeStyles} from '@material-ui/styles'
import Grid from "@material-ui/core/Grid"
import { Typography } from "@material-ui/core"
import IconButton from '@material-ui/core/IconButton';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import {useFormatter} from "../../shared/utils/formatterHook"

const useStyles = makeStyles(theme => ({
  itemContainer:{
  },
  underline: {
    borderBottom: "2px solid",
    color: theme.palette.common.blue4
  },
  logo: {
    width: "35%",
  },
  name:{
    fontSize:"0.8em"
  },
  id:{
    opacity: 0.7,
    fontSize:"0.7em"
  },
  quantity:{
    fontSize: "0.5em"
  },
  quantitySpan:{
    opacity:0.7, 
    marginRight:"0.2em"
  },
  starIcon:{
    color: theme.palette.common.white,
    fontSize:"0.7em",
  },
  price:{
    fontSize:"0.8em"
  },
  change:{
    fontSize:"0.6em"

  }
}))

export const CoinItem = ({name, logo, price, quantity, id, change })=> {
  const {currencyFormatter, percentageFormatter} = useFormatter()

  const classes = useStyles()



  return (
    <>
    <Grid item container className={classes.itemContainer} justify="center">

      {/* Logo & Coin Name */}
      <Grid item container md alignItems="center">
        
        {/* Logo */}
        <Grid item container justify="center" xs={4}>
          <img src={logo} alt="coin logo" className={classes.logo}/>
        </Grid>

        {/* Coin Name */}
        <Grid item xs={8} container direction="column">
          <Grid item> 
            <Typography className={classes.name}>
              {name} <span className={classes.id}>{id}</span>
            </Typography> 
          </Grid>
          <Grid item> 
            <Typography className={classes.quantity}>
              <span className={classes.quantitySpan}>Qty:</span> {quantity}
            </Typography> 
          </Grid>

        </Grid>

      </Grid> 


      {/* Price & Icon */}
      <Grid item container md justify="center" alignItems="center">
        <Grid item container direction="column" xs={8}>
          <Grid item>
            <Typography className={classes.price} align="right">
              {currencyFormatter(price)}
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.change} style={{color: change > 0 ? "#7CFC00" : "#FF5733 "}} align="right">
              {percentageFormatter(change)}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <IconButton>
            <BookmarkBorderIcon className={classes.starIcon}/>  
          </IconButton>
        </Grid>

      </Grid> 

    </Grid>
    <div className={classes.underline} />

    </>
  )
}
