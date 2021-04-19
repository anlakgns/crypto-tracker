import React, {useEffect, useState, useContext} from "react"
import HeadUnderline from "../shared/UI components/HeadUnderline"
import Grid from "@material-ui/core/Grid"
import {fade, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import nomicsAPI from "../shared/apis/nomics"
import { Typography } from "@material-ui/core"
import {GlobalContext} from "../shared/context/globalContext"
import _ from "lodash"
import Pagination from '@material-ui/lab/Pagination';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import LinearProgress from '@material-ui/core/LinearProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles(theme => ({ 
  table: {
    minWidth: 650,
  },
  price: {
    transition: "color 1s ease-in",
  },
  pagination:{
    padding:"1em",
    justifyContent:"center",
    transition: "scroll"
  },
  progressContainer: {
    width:"8em"
  },
  progress:{
    height:"0.8em",
    borderRadius:"1em"
  },
  optionBar:{
    padding:"1em",
    marginBottom:"0.5em",
    borderRadius:"0.5em",
    backgroundColor: theme.palette.primary.light
  },
  switchLive:{
    display:"flex",
    justifyContent:"center",
    marginLeft:"auto",
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },

}))

const CoinTable = () => {
  const [sortType, setSortType] = useState("marketCapDescending")
  const [sortedCoinsInfo, setSortedCoinsInfo] = useState([])
  const classes = useStyles()
  const {livePrices, startSocketConnection, closeSocketConnection} = useContext(GlobalContext)
  const [page, setPage] = useState(1);

  // Data Fetching
  useEffect(async ()=> {
    const response = await nomicsAPI.get("/currencies/ticker")
    const requestListFromAPI = response.data;
    const sortedRequestListFromAPI = sortHandler(requestListFromAPI)
    
    setSortedCoinsInfo(sortedRequestListFromAPI)

    const requestListFromSocket = sortedRequestListFromAPI.map((coin)=> {
            return `5~CCCAGG~${coin.id}~USD`  
       });
    // startSocketConnection(requestListFromSocket);
  }, [page,sortType])


  // Helper Functions
  const sortHandler = (sortData) => {
    let renderList 

    switch(sortType) {
      case "marketCapDescending" : 
        renderList = sortData.slice((page-1)*10, page*10);
        break;
      case "marketCapAscending" : 
        renderList = sortData.reverse().slice((page-1)*10, page*10);
        break;
      case "priceDescending" : 
        renderList = sortData.sort((a,b)=> b.price - a.price).slice((page-1)*10, page*10);
        break;
      case "priceAscending" : 
        renderList = sortData.sort((a,b)=> a.price - b.price).slice((page-1)*10, page*10);
        break;
      case "changePercentageDayDescending": 
        renderList = sortData.sort((a,b) => b.["1d"].price_change_pct - a.["1d"].price_change_pct).slice((page-1)*10, page*10)
        break;
      case "changePercentageDayAscending": 
        renderList = sortData.sort((a,b) => a.["1d"].price_change_pct - b.["1d"].price_change_pct ).slice((page-1)*10, page*10)
        break;
      case "changePercentageWeekDescending": 
        renderList = sortData.sort((a,b) => b.["7d"].price_change_pct - a.["7d"].price_change_pct).slice((page-1)*10, page*10)
        break;
      case "changePercentageWeekAscending": 
        renderList = sortData.sort((a,b) => a.["7d"].price_change_pct - b.["7d"].price_change_pct ).slice((page-1)*10, page*10)
        break;
      case "changeVolumeDayDescending": 
        renderList = sortData.sort((a,b) => b.["1d"].volume_change - a.["7d"].volume_change).slice((page-1)*10, page*10)
        break;
      case "changeVOlumeDayAscending": 
        renderList = sortData.sort((a,b) => a.["1d"].volume_change - b.["7d"].volume_change ).slice((page-1)*10, page*10)
        break;
      case "circulatingSupplyDescending": 
        renderList = sortData.sort((a,b) => b.circulating_supply - a.circulating_supply).slice((page-1)*10, page*10)
        break;
      case "circulatingSupplyAscending": 
        renderList = sortData.sort((a,b) => a.circulating_supply - b.circulating_supply).slice((page-1)*10, page*10)
        break;
    }
    return renderList
  }

  // Dom Handlers
  const paginationHandler = (event, value)=> {
    closeSocketConnection(); 
    setPage(value); 
    window.scroll({
      top: 100,
      behavior: 'smooth'
    })
  }
  const sortToggleHandler = (sortType1, sortType2)=> {
    closeSocketConnection(); 
    setPage(1);
    sortType == sortType1 ? setSortType(sortType2) : setSortType(sortType1)
  }

  // Number Formatters
  const percentageFormatter = (num) => {
    const formatDone = Math.abs(num*100).toFixed(2) + "%";
    return formatDone
  }
  const numberFormatter = (num) => {
    const numb = Number(num)    
    return new Intl.NumberFormat().format(numb)
  }
  const currencyFormatter = (num, digits)=> {
    
    const numb = Number(num)    
    const digit = num < 1 ? 4 : undefined  
      return new Intl.NumberFormat('en-EN', {maximumSignificantDigits: digit, style: 'currency', currency: 'USD' }).format(numb)
  }

  return (
    <>
    <HeadUnderline 
      headline="Today's Cryptocurrency Prices by Market Cap" 
      long="20em"
    />
    <div className={classes.optionBar}>
        <Grid container>
          <Grid item md={8}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </Grid>
          <Grid item md={2} >
            <Switch color="primary" className={classes.switchLive}/>
          </Grid>
        </Grid>
    </div>
     <TableContainer component={Paper}>
      <Table className={classes.table}  aria-label="simple table">
        <TableHead >
          <TableRow  >
            <TableCell >
              <Button  onClick={()=> sortToggleHandler("marketCapDescending", "marketCapAscending")}>Rank by Market Cap</Button>  
            </TableCell>
            <TableCell align="center" >
              <Button onClick={()=> sortToggleHandler("priceDescending", "priceAscending")}>Price</Button>  
            </TableCell>
            <TableCell align="center">
              <Button onClick={()=> sortToggleHandler("changePercentageDayDescending", "changePercentageDayAscending")}>24h</Button>  
            </TableCell>
            <TableCell align="center">
              <Button onClick={()=> sortToggleHandler("changePercentageWeekDescending", "changePercentageWeekAscending")}>7d</Button>  
            </TableCell>
            <TableCell align="center">
              <Button onClick={()=> sortToggleHandler("marketCapDescending", "marketCapAscending")}>Market Cap</Button>  
            </TableCell>
            <TableCell align="center">
            <Button onClick={()=> sortToggleHandler("changeVolumeDayDescending", "changeVOlumeDayAscending")}>Volume(24h)</Button>  
            </TableCell>
            <TableCell align="center">
              <Button onClick={()=> sortToggleHandler("circulatingSupplyDescending", "circulatingSupplyAscending")}>Circulating Supply</Button>  
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedCoinsInfo.map((coin) => 
            (
            <TableRow key={coin.id} >
              <TableCell component="th">
                <Grid container direction="row" justify="center" alignItems="center">
                  <Grid item xs={4}>
                    <BookmarkBorderIcon color="primary" />
                  </Grid>
                  <Grid item xs={4} >
                    <img src={coin.logo_url} style={{width: "2.5em"}}/>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography align="left">
                      {coin.name}
                    </Typography>
                  </Grid>
                </Grid>
                
              </TableCell>              
              <TableCell className={classes.price} align="center" 
                style={{
                   color: livePrices?.[coin.id]?.isPlus ? "green" : "black"
                }}>
                {currencyFormatter(livePrices?.[coin.id]?.price || coin.price)}
              </TableCell>
              <TableCell align="center" 
                style={{
                  color: coin.["1d"].price_change_pct > 0 ? "green" : "red",
                }}>
                  <Grid container justify="center" alignItems="center">
                    <Grid item>
                      {percentageFormatter(coin.["1d"].price_change_pct)}
                    </Grid>
                    <Grid item style={{marginBottom:"-0.3em"}} >
                      {coin.["1d"].price_change_pct > 0 ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/> }
                    </Grid>
                  </Grid>

              </TableCell>
              <TableCell align="center"
                style={{
                color: coin.["7d"].price_change_pct > 0 ? "green" : "red",
                }}>
                  <Grid container justify="center" alignItems="center">
                    <Grid item >
                      {percentageFormatter(coin.["7d"].price_change_pct)}
                    </Grid>
                    <Grid item style={{marginBottom:"-0.3em"}} >
                      {coin.["7d"].price_change_pct > 0 ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/> }
                    </Grid>
                  </Grid>
              </TableCell>

              <TableCell align="center">
                  {currencyFormatter(coin.market_cap, 13)}
              </TableCell>
              <TableCell align="center">{currencyFormatter(coin.["1d"].volume_change,10)}</TableCell>
              <TableCell align="center">
                <Grid container justify="center" alignItems="center">
                  <Grid item xs className={classes.progressContainer}>
                    <LinearProgress 
                      color="primary" 
                      className={classes.progress} 
                      variant="determinate" 
                      value={Number(coin.circulating_supply/coin.max_supply*100)} />
                  </Grid>
                  <Grid item xs>
                    <span>{numberFormatter(coin.circulating_supply)}</span>
                  </Grid>
                </Grid>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
       <Pagination 
         count={10} 
         color="primary"
         onChange={paginationHandler} 
         classes={{ul: classes.pagination}}
         page={page}
          />
    </TableContainer>

    </>
  )
}

export default CoinTable



