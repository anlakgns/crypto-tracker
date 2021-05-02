import React, {useEffect, useState, useContext, useCallback} from "react"
import HeadUnderline from "../shared/UI components/HeadUnderline"
import Grid from "@material-ui/core/Grid"
import {makeStyles } from '@material-ui/core/styles';
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
import Pagination from '@material-ui/lab/Pagination';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import LinearProgress from '@material-ui/core/LinearProgress';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {CoinCard} from "./CoinCard"
import Checkbox from "@material-ui/core/Checkbox"
import IsoIcon from '@material-ui/icons/Iso';
import Popover from '@material-ui/core/Popover';
import {CalculatorCard} from "./CalculatorCard"
import {PortfolioModal} from "./portfolioModal/PortfolioModal"
import {SearchBar} from "../shared/UI components/SearchBar"

const useStyles = makeStyles(theme => ({ 
  table: {
    minWidth: 650,
    border:"0.4em solid ",
    borderColor: theme.palette.primary.light
  },
  price: {
    transition: "color 1s ease-in",
  },
  pagination:{
    padding:"1em",
    justifyContent:"center",
    transition: "scroll",
    borderBottom:"0.4em solid ",
    borderLeft:"0.4em solid ",
    borderRight:"0.4em solid ",
    borderLeftColor: theme.palette.primary.light,
    borderRightColor: theme.palette.primary.light,
    borderBottomColor: theme.palette.primary.light
  },
  progressContainer: {
    width:"8em"
  },
  progress:{
    height:"0.8em",
    borderRadius:"1em"
  },
  optionBar:{
    padding:"0.7em",
    paddingLeft: "1.6em",
    marginBottom:"0.5em",
    borderRadius:"0.3em",
    backgroundColor: theme.palette.primary.light,
    color: "white"
  },
  switchLive:{
    display:"flex",
    justifyContent:"center",
    marginLeft:"auto",
  },
  btnCalc: {
    color: "white",
    textTransform: "none",
    fontSize:"0.9em",
    fontWeight:"400"

  },
  btnPortfolio: {
    textTransform: "none",
    color: theme.palette.secondary.main,
    fontSize:"0.9em",
    fontWeight:"400"

  },
  favoritesCheckbox:{
    margin: "auto"
  },
  labelCheckboxSwitch:{
    fontSize: "0.9em",
    fontWeight:"400"
  },
  popoverPaper: {
    borderRadius:"2em",
  }

}))

const CoinTable = () => {
  const classes = useStyles()
  const {livePrices, startSocketConnection, closeSocketConnection} = useContext(GlobalContext)
  const [sortType, setSortType] = useState("marketCapDescending")
  const [sortedCoinsInfo, setSortedCoinsInfo] = useState([])
  const [page, setPage] = useState(1);
  const [searchChangeTerm, setSearchChangeTerm] = useState();
  const [searchSubmitTerm, setSearchSubmitTerm] = useState();
  const [livePriceSwitch, setLivePriceSwitch] = useState(false);
  const [cardCoinsInfo, setCardCoinsInfo] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [favoriteCheck, setFavoriteCheck] = useState(false)
  const [socketList, setSocketList] = useState([])
  const [calcAnchor, setCalcAnchor] = useState(null);
  const [responseCoins, setresponseCoins] = useState([])
  const [popoverSwitch, setPopoverSwitch] = useState(false)
  const [openPortfolioModal, setPortfolioModal] = useState(false);

  console.log(bookmarks)

 // Helper Functions
 const sortHandler = useCallback((sortData) => {
  let renderList 

  switch(sortType) {
  case "marketCapDescending" : 
    renderList = sortData.sort((a,b)=> b.market_cap - a.market_cap).slice((page-1)*10, page*10);
    break;
  case "marketCapAscending" : 
    renderList = sortData.sort((a,b)=> a.market_cap - b.market_cap).slice((page-1)*10, page*10);
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
  case "changeVolumeDayAscending": 
    renderList = sortData.sort((a,b) => a.["1d"].volume_change - b.["7d"].volume_change ).slice((page-1)*10, page*10)
    break;
  case "circulatingSupplyDescending": 
    renderList = sortData.sort((a,b) => b.circulating_supply - a.circulating_supply).slice((page-1)*10, page*10)
    break;
  case "circulatingSupplyAscending": 
    renderList = sortData.sort((a,b) => a.circulating_supply - b.circulating_supply).slice((page-1)*10, page*10)
    break;
  default :
    renderList = sortData.sort((a,b)=> b.market_cap - a.market_cap).slice((page-1)*10, page*10)
  }
  return renderList
}, [sortType, page])

  // Data Fetching
  useEffect(()=> {
    const fetchData = async () => { // avoiding race condition.
      const response = await nomicsAPI.get("/currencies/ticker")
      setresponseCoins(response.data);
      const requestListFromAPI = favoriteCheck ? bookmarks : response.data;
      const coinsForCards = topMoversByDay(response.data)
      setCardCoinsInfo(coinsForCards)
      const searchResult = requestListFromAPI.filter(coin => coin.name.toLowerCase().includes(searchSubmitTerm)) 
      console.log(searchResult.length)
      const sortedRequestListFromAPI = sortHandler(searchResult.length === 0 || searchResult.length === requestListFromAPI.length ? requestListFromAPI : searchResult )
      setSortedCoinsInfo(favoriteCheck ? bookmarks : sortedRequestListFromAPI)
      const requestListFromSocket = sortedRequestListFromAPI.map((coin)=> {
              return `5~CCCAGG~${coin.id}~USD`  
         });
      setSocketList(requestListFromSocket)      
      }
      fetchData();
  }, [page, sortType, searchSubmitTerm, favoriteCheck, sortHandler, bookmarks])

  // Live Price 
  useEffect(()=> {
    livePriceSwitch && socketList.length !==0 ? startSocketConnection(socketList) : closeSocketConnection(); 
  }, [socketList, livePriceSwitch])
  
  const topMoversByDay = (sortData) => {
    const bestTwo = sortData.sort((a,b) => b.["1d"].price_change_pct - a.["1d"].price_change_pct).slice(0,2)
    const worstTwo = sortData.sort((a,b) => a.["1d"].price_change_pct - b.["1d"].price_change_pct).slice(0,2)
    return [...bestTwo, ...worstTwo]
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
    sortType === sortType1 ? setSortType(sortType2) : setSortType(sortType1)
  }
  const searchBoxChangeHandler = (e) => {
    setSearchChangeTerm(e.target.value)
  }
  const searchBoxSubmitHandler = (e)=> {
    e.preventDefault();
    const lowerChanger = searchChangeTerm.toLowerCase();
    setSearchSubmitTerm(lowerChanger)
  }
  const switchHandler = ()=> {
    setLivePriceSwitch(!livePriceSwitch)
  }
  const bookmarkHandler = (coin) => {
    if(bookmarks.find(item => item.id === coin.id) === undefined) {
      setBookmarks(prev => [...prev, coin])
    } else {
      setBookmarks(prev => {
        const removed =  prev.filter(item => item.id !== coin.id);
        return [...removed]
      })
    }

  }
  const calcHandlerClose = () => {
    setCalcAnchor(null);
    setPopoverSwitch(false)

  };
  const calcHandlerOpen = (e) => {
    setCalcAnchor(e.currentTarget)
    setPopoverSwitch(true)
  }
  const createPortfolioHandler = () => {
    setPortfolioModal(true)
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

  // Render 
  return (
    <>
    {/* Headline */}
    <HeadUnderline 
      headline="Today's Cryptocurrency Prices by Market Cap" 
      long="20em"
    />
   
    {/* Cards */}
    <Grid container justify="center" alignItems="center" spacing={2}>
      {cardCoinsInfo.map((coin) => {
        return (
          <Grid item md key={coin.id}>
            <CoinCard 
              imgSource = {coin.logo_url} 
              alt={coin.id} coinName={coin.name} 
              coinCode={coin.id} 
              percentageChangeByDay={coin.["1d"].price_change_pct}
              price={currencyFormatter(coin.price)}/> 
          </Grid> 
      )})}

    </Grid>

    {/* Functional Navitagiton */}
    <Grid container justify="space-between" alignItems="center" className={classes.optionBar}>
          <Grid item md={4} container justify="flex-end"  >
            <SearchBar onChange={searchBoxChangeHandler} onSubmit={searchBoxSubmitHandler} />
          </Grid>
          <Grid item container justify="center" md={2}>
            <FormControlLabel
              control={<Checkbox checked={favoriteCheck} onChange={()=> setFavoriteCheck(!favoriteCheck)} name="jason" color="primary" />}
              label="Favorites"
              className={classes.favoritesCheckbox}
              classes={{label: classes.labelCheckboxSwitch}}
            />
          </Grid>
          <Grid item container justify="center" md={2} >
            <FormControlLabel className={classes.switchContainer}
                control={<Switch checked={livePriceSwitch} onChange={switchHandler} color="primary" />}
                label="Live Prices"
                classes={{label: classes.labelCheckboxSwitch}}
             />
          </Grid>
          <Grid item container justify="center" md={2}>
            
            <Button className={classes.btnCalc} onClick={calcHandlerOpen}>
              <IsoIcon color="primary" style={{marginRight:"0.3em"}} />
                Calculator
            </Button>
            <Popover
              classes={{paper: classes.popoverPaper}}
              open={popoverSwitch}
              anchorEl={calcAnchor}
              onClose={calcHandlerClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
             >
               <CalculatorCard coinList = {responseCoins}  />
            </Popover>

          </Grid>
          <Grid item container justify="center" md={2}>
            <Button 
              variant="contained" 
              className={classes.btnCalc} 
              color="primary" 
              onClick={createPortfolioHandler}>Create a Portfolio
            </Button>
            <PortfolioModal 
              openPortfolioModal={openPortfolioModal} 
              setPortfolioModal={setPortfolioModal} 
              responseCoins={responseCoins}
              
              />
          </Grid>
            
        </Grid>
    
     {/* Table  */}
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
            <Button onClick={()=> sortToggleHandler("changeVolumeDayDescending", "changeVolumeDayAscending")}>Volume(24h)</Button>  
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
                    <Button onClick={()=> bookmarkHandler(coin)}>
                      {bookmarks.find(bookmark => coin.id === bookmark.id) === undefined ? <BookmarkBorderIcon/> : <BookmarkIcon/> }
                      {/* <BookmarkBorderIcon/>  */}
                    </Button>
                  </Grid>
                  <Grid item xs={4} >
                    <img src={coin.logo_url} style={{width: "2.5em"}} alt={coin.id}/>
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
                {currencyFormatter((livePriceSwitch && livePrices?.[coin.id]?.price )  || coin.price)}
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



