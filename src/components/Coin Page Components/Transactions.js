import React, {useState, useEffect} from "react"
import {makeStyles} from '@material-ui/styles'
import Grid from "@material-ui/core/Grid"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from "@material-ui/core";
import { useFormatter } from "../shared/utils/formatterHook";
import ButtonSecondary from "../shared/UI components/ButtonSecondary"

const useStyles = makeStyles(theme => ({
  mainContainer:{
    padding:"1em"
  },
  table: {
    minWidth: 650,
    border: "0.4em solid ",
    borderColor: theme.palette.primary.light,
  },
  tableGrid:{
    
  },
  row:{
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      color:theme.palette.common.white
    }
  },
  headline:{
    fontSize: "1.5em",
    color: theme.palette.secondary.main,
    marginBottom:"0.5em"
  },
  links:{
    textDecoration:"none"
  },
  confidence:{
    padding:"0.3em 0.6em",
    backgroundColor:"green",
    borderRadius:"0.5em",
    fontSize:"0.9em",
    color: theme.palette.common.white
  }
}))

export const Transactions = ({ coinSingleResponse })=> {
  const classes = useStyles()
  const [tickerListNumber, setTickerListNumber] = useState(6)
  const [tickerList, setTickerList] = useState([])
  const { currencyFormatter } = useFormatter();

  const coinName = coinSingleResponse?.data.name

  useEffect(()=> {
    const tickers = coinSingleResponse?.data.tickers.slice(0,tickerListNumber)
    setTickerList(tickers)
  },[coinSingleResponse, tickerListNumber])

  const closeAllHandler = () => {
    setTickerListNumber(6)
    window.scroll({
      top: 1200,
      left: 0,
      behavior: 'smooth'
    });
  }
 
  return (
    <>
      <Grid item container justify="center" className={classes.mainContainer}>
        <Grid item container>
          <Typography className={classes.headline}>{coinName} Markets</Typography>
        </Grid>
        <Grid item container justify="center" className={classes.tableGrid}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Source </TableCell>
                  <TableCell align="right">Pairs</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Transaction Volume</TableCell>
                  <TableCell align="right">Pair T.Volume</TableCell>
                  <TableCell align="right">Confidence</TableCell>
                  <TableCell align="right">Updated</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tickerList?.map((transaction,i) => (
                  <TableRow key={i} className={classes.row}>
                    <TableCell component="th" scope="row">
                      {transaction.market.name}
                    </TableCell>
                    <TableCell align="right">
                      <a 
                        className={classes.links}
                        href={transaction.trade_url} 
                        target="_blank" 
                        rel="noopener noreferrer"> 
                        {transaction.base + "/" + transaction.target}
                      </a>
                    </TableCell>
                    <TableCell align="right">{currencyFormatter(transaction.converted_last.usd)}</TableCell>
                    <TableCell align="right">{currencyFormatter(transaction.volume)}</TableCell>
                    <TableCell align="right">{currencyFormatter(transaction.converted_volume.usd)}</TableCell>
                    <TableCell align="right"><span className={classes.confidence}>{transaction.trust_score = "green" ? "High" : "Low"}</span></TableCell>
                    <TableCell align="right">{transaction.is_stale ? "Not Recently" : "Recently"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          { tickerListNumber === 6 ? 
          <ButtonSecondary  contentText="See All Markets" width="20em" onClick={()=> setTickerListNumber(100)} />
          :
           <ButtonSecondary  contentText="Close All" width="20em" onClick={closeAllHandler} />

          }
          
        </Grid>

      </Grid>
    </>
  )
}
