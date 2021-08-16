import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Hidden from "@material-ui/core/Hidden";

import { useSocketCC } from "../shared/hooks/socketCCHook";
import HeadUnderline from "../shared/UI components/HeadUnderline";
import { useFormatter } from "../shared/utils/formatterHook";
import {useFetchData} from "../shared/hooks/fetchDataHook"

import { CoinCard } from "./CoinCard";
import { FeatureBar } from "./FeaturesBar";
import { Sparkline } from "./Sparkline";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 350,
    border: "0.4em solid ",
    borderColor: theme.palette.primary.light,
  },
  price: {
    transition: "color 1s ease-in",
  },
  pagination: {
    padding: "1em",
    justifyContent: "center",
    transition: "scroll",
    borderBottom: "0.4em solid ",
    borderLeft: "0.4em solid ",
    borderRight: "0.4em solid ",
    borderLeftColor: theme.palette.primary.light,
    borderRightColor: theme.palette.primary.light,
    borderBottomColor: theme.palette.primary.light,
    "@media (max-width:390px)": {
      padding: "0.3em",
    }
  },
  progressContainer: {
    width: "8em",
  },
  progress: {
    height: "0.8em",
    borderRadius: "1em",
  },
  optionBarContainer: {
    padding: "0.7em",
    paddingLeft: "1.6em",
    marginBottom: "0.5em",
    borderRadius: "0.3em",
    backgroundColor: theme.palette.primary.light,
    color: "white",
  },
  switchLive: {
    display: "flex",
    justifyContent: "center",
    marginLeft: "auto",
  },
  progressLine: {
    width: "100%",
    padding: "5em",
  },
}));

const CoinTable = () => {
  console.log("rendered")

  // Hooks 
  const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();
  const [livePrices, startSocketConnection, closeSocketConnection] =
  useSocketCC();
  const { percentageFormatter, numberFormatter, currencyFormatter } =
  useFormatter();
  const { fetchCoinList, sourceAPI } = useFetchData();
  
  // Responsive Varibles
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"))
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const matches680Down = useMediaQuery('(max-width:680px)');
  const matches530Down = useMediaQuery('(max-width:530px)');
  const matches780Down = useMediaQuery('(max-width:780px)');

  // Component States
  const [searchSubmitTerm, setSearchSubmitTerm] = useState("");
  const [livePriceSwitch, setLivePriceSwitch] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [favoriteCheck, setFavoriteCheck] = useState(false);

  const [sortType, setSortType] = useState("marketCapDescending");
  const [page, setPage] = useState(1);
  const [cardCoinsInfo, setCardCoinsInfo] = useState([]);
  const [socketList, setSocketList] = useState([]);

  const [rawRenderList, setRawRenderList] = useState([]);
  const [searchedRenderList, setSearchedRenderList] = useState([]);
  const [finalRenderList, setFinalRenderList] = useState([]);
  const [feedbackMessage, setFeedBackMessage] = useState("");
  const [coinListResponse, setCoinListResponse] = useState([])


  // Data Fetching
  useEffect(() => {
    const fetch = async () => {
      const response = await fetchCoinList(sourceAPI)
      setCoinListResponse(response)
    }
    fetch()
  }, [fetchCoinList, sourceAPI])

  // Coin Cards Logic
  useEffect(() => {
    const topMoversByDay = (sortData) => {
      if (sortData) {
        const bestTwo = sortData
          .sort((a, b) => b.priceChangeDayPerc - a.priceChangeDayPerc)
          .slice(0, 2);
        const worstTwo = sortData
          .sort((a, b) => a.priceChangeDayPerc - b.priceChangeDayPerc)
          .slice(0, 2);
        return [...bestTwo, ...worstTwo];
      }
    };
    const coinsForCards = topMoversByDay(coinListResponse);

    setCardCoinsInfo(coinsForCards);
  }, [coinListResponse]);

  // Render Logic
  useEffect(() => {
    const searchCandidates = favoriteCheck ? bookmarks : coinListResponse;
    setRawRenderList(searchCandidates);
  }, [favoriteCheck, bookmarks, coinListResponse]);

  // Socket Request
  useEffect(() => {
    const listForSocket = finalRenderList?.map((coin) => {
      return `5~CCCAGG~${coin.code.toUpperCase()}~USD`;
    });
    setSocketList(listForSocket);
  }, [finalRenderList]);

  // Search Logic
  useEffect(() => {
    const results = rawRenderList?.filter((coin) =>
      coin.name.toLowerCase().includes(searchSubmitTerm)
    );

    setSearchedRenderList(results);
  }, [searchSubmitTerm, rawRenderList]);

  // Sort & Render Logic
  useEffect(() => {
    const sortHandler = (sortData, type) => {
      let renderList;
      if (sortData) {
        switch (type) {
          case "marketCapDescending":
            renderList = sortData
              .sort((a, b) => b.marketCap - a.marketCap)
              .slice((page - 1) * 10, page * 10);
            break;
          case "marketCapAscending":
            renderList = sortData
              .sort((a, b) => a.marketCap - b.marketCap)
              .slice((page - 1) * 10, page * 10);
            break;
          case "priceDescending":
            renderList = sortData
              .sort((a, b) => b.price - a.price)
              .slice((page - 1) * 10, page * 10);
            break;
          case "priceAscending":
            renderList = sortData
              .sort((a, b) => a.price - b.price)
              .slice((page - 1) * 10, page * 10);
            break;
          case "changePercentageDayDescending":
            renderList = sortData
              .sort((a, b) => b.priceChangeDayPerc - a.priceChangeDayPerc)
              .slice((page - 1) * 10, page * 10);
            break;
          case "changePercentageDayAscending":
            renderList = sortData
              .sort((a, b) => a.priceChangeDayPerc - b.priceChangeDayPerc)
              .slice((page - 1) * 10, page * 10);
            break;
          case "changePercentageWeekDescending":
            renderList = sortData
              .sort((a, b) => b.priceChangeWeekPerc - a.priceChangeWeekPerc)
              .slice((page - 1) * 10, page * 10);
            break;
          case "changePercentageWeekAscending":
            renderList = sortData
              .sort((a, b) => a.priceChangeWeekPerc - b.priceChangeWeekPerc)
              .slice((page - 1) * 10, page * 10);
            break;
          case "changeVolumeDayDescending":
            renderList = sortData
              .sort((a, b) => b.marketCapChangeDay - a.marketCapChangeDay)
              .slice((page - 1) * 10, page * 10);
            break;
          case "changeVolumeDayAscending":
            renderList = sortData
              .sort((a, b) => a.marketCapChangeDay - b.marketCapChangeDay)
              .slice((page - 1) * 10, page * 10);
            break;
          case "circulatingSupplyDescending":
            renderList = sortData
              .sort((a, b) => b.circulatingSupply - a.circulatingSupply)
              .slice((page - 1) * 10, page * 10);
            break;
          case "circulatingSupplyAscending":
            renderList = sortData
              .sort((a, b) => a.circulatingSupply - b.circulatingSupply)
              .slice((page - 1) * 10, page * 10);
            break;
          default:
            renderList = sortData
              .sort((a, b) => b.marketCap - a.marketCap)
              .slice((page - 1) * 10, page * 10);
        }
        return renderList;
      }
    };

    let listForSort;
    // No found coin
    if (searchedRenderList?.length === 0 && searchSubmitTerm?.length > 0) {
      listForSort = [];
      setFeedBackMessage("No coin found!");
    }
    // No favorites coin selected yet.
    if (bookmarks?.length === 0 && favoriteCheck) {
      listForSort = [];
      setFeedBackMessage("No favorites coin selected yet");
    }
    
    // Default, no searching
    if (searchedRenderList?.length === 0 && searchSubmitTerm?.length === 0) {
      listForSort = rawRenderList;
    }
    // Search with results
    if (searchedRenderList?.length > 0) {
      listForSort = searchedRenderList;
    }

    const sortedList = sortHandler(listForSort, sortType);

    setFinalRenderList(favoriteCheck ? bookmarks : sortedList);
  }, [
    page,
    sortType,
    rawRenderList,
    favoriteCheck,
    bookmarks,
    searchedRenderList,
    searchSubmitTerm,
  ]);

  // Live Price Switch Logic
  useEffect(() => {
    livePriceSwitch && socketList.length !== 0
      ? startSocketConnection(socketList)
      : closeSocketConnection();
  }, [
    socketList,
    livePriceSwitch,
    startSocketConnection,
    closeSocketConnection,
  ]);

  // Dom Handlers
  const paginationHandler = (_, value) => {
    closeSocketConnection();
    setPage(value);
    window.scroll({
      top: 100,
      behavior: "smooth",
    });
  };
  const sortToggleHandler = (sortType1, sortType2) => {
    closeSocketConnection();
    setPage(1);
    sortType === sortType1 ? setSortType(sortType2) : setSortType(sortType1);
  };
  const bookmarkHandler = (coin) => {
    if (bookmarks.find((item) => item.id === coin.id) === undefined) {
      setBookmarks((prev) => [...prev, coin]);
    } else {
      setBookmarks((prev) => {
        const removed = prev.filter((item) => item.id !== coin.id);
        return [...removed];
      });
    }
  };
  const tableClickHandler = (id) => {
    // const cell = event.target.closest("tr");
    // const coinName =
      // cell.firstChild.firstChild.lastChild.firstChild.innerHTML.toLowerCase();
    history.push(`/currencies/${id}`);
  };

  // Responsive Style
  const fontSizeHeadline = () => {
    // Order is important

    if(matches530Down) {
      return "1.4em"
    }
    if(matches780Down) {
      return "1.5em"
    }
    if(isMdDown) {
      return "1.6em"
    }
    return "1.8em"

  }

  // Pagination Count for different cases
  const paginationCount = () => {
    
    let count = 10
    // Searched : No found coin
    if (searchedRenderList?.length === 0 && searchSubmitTerm?.length > 0) {
      count = 0
    }
    // Searched :  with results
    if (searchedRenderList?.length > 0 && searchSubmitTerm?.length > 0) {
      count = Math.ceil((searchedRenderList.length / 10))
    }
    // Favorites 
    if (favoriteCheck) {
      count = Math.ceil(bookmarks.length / 10)
    }
    return count
  }

  return (
    <>
      {/* Headline */}
      <HeadUnderline
        headline="Today's Cryptocurrency Prices by Market Cap"
        long={isMdDown ? "25em" : "30em"}
        marginBottom="2em"
        fontSize={fontSizeHeadline()}
      />

      {/* Cards */}
      <Hidden mdDown> 
        <Grid 
          container 
          justify="center" 
          alignItems="center" 
          spacing={isSmDown ? 0 : 2}>
          {cardCoinsInfo?.map((coin) => {
            return (
              <Grid item xs key={coin.id}>
                <CoinCard
                  imgSource={coin.logo}
                  alt={coin.id}
                  coinName={coin.name}
                  coinCode={coin.code.toUpperCase()}
                  percentageChangeByDay={coin.priceChangeDayPerc}
                  price={currencyFormatter(coin.price)}
                  chartData={coin.sparkline}
                  location="table"
                />
              </Grid>
            );
          })}
        </Grid>
      </Hidden>
      
      {/* Functional Navitagiton */}
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={classes.optionBarContainer}
      >
        <FeatureBar
          coinListResponse={coinListResponse}
          setSearchSubmitTerm={setSearchSubmitTerm}
          setLivePriceSwitch={setLivePriceSwitch}
          livePriceSwitch={livePriceSwitch}
          setFavoriteCheck={setFavoriteCheck}
          favoriteCheck={favoriteCheck}
        />
      </Grid>

      {/* Table  */}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          
          {/* Table Head */}
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Button
                  onClick={() =>
                    sortToggleHandler(
                      "marketCapDescending",
                      "marketCapAscending"
                    )
                  }
                >
                  Rank by Market Cap
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button
                  onClick={() =>
                    sortToggleHandler("priceDescending", "priceAscending")
                  }
                >
                  Price
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button
                  onClick={() =>
                    sortToggleHandler(
                      "changePercentageDayDescending",
                      "changePercentageDayAscending"
                    )
                  }
                >
                  24h
                </Button>
              </TableCell>

              <Hidden smDown>
                <TableCell align="center">
                  <Button
                    onClick={() =>
                      sortToggleHandler(
                        "marketCapDescending",
                        "marketCapAscending"
                      )
                    }
                  >
                    Market Cap
                  </Button>
                </TableCell>
              </Hidden>
                <TableCell 
                align="center"
                style={{display: matches680Down ? "none" : "table-cell"}}>
                  <Button
                    onClick={() =>
                      sortToggleHandler(
                        "changeVolumeDayDescending",
                        "changeVolumeDayAscending"
                      )
                    }
                  >
                    Volume(24h)
                  </Button>
                </TableCell>

              <Hidden mdDown>
                <TableCell align="center">
                  <Button
                    onClick={() =>
                      sortToggleHandler(
                        "circulatingSupplyDescending",
                        "circulatingSupplyAscending"
                      )
                    }
                  >
                    Circulating Supply
                  </Button>
                </TableCell>
              </Hidden>
              <TableCell 
                align="center"
                style={{display: matches530Down ? "none" : "table-cell"}}>
                
                &nbsp; LAST 7 DAYS &nbsp;
              </TableCell>
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody >
            {finalRenderList.length > 0 ? (
              finalRenderList.map((coin) => (
                <TableRow onClick={() => {tableClickHandler(coin.id)}} key={coin.id} style={{ cursor: "pointer" }}>
                  
                  {/* Bookmark & Logo Cell */}
                  <TableCell>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item container justify="center" xs={4}>
                        <Button
                          onClick={(e) => {
                            bookmarkHandler(coin);
                            e.stopPropagation();
                          }}
                        >
                          {bookmarks.find(
                            (bookmark) => coin.id === bookmark.id
                          ) === undefined ? (
                            <BookmarkBorderIcon style={{color: theme.palette.secondary.main}} />
                          ) : (
                            <BookmarkIcon style={{color: theme.palette.secondary.main}} />
                          )}
                        </Button>
                      </Grid>
                      <Grid item xs={4}>
                        <img
                          src={coin.logo}
                          style={{ width: "2.5em" }}
                          alt={coin.id}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Typography align="left">{coin.name}</Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                  
                  {/* Price Cell */}
                  <TableCell
                    className={classes.price}
                    align="center"
                    style={{
                      color: livePrices?.[coin.id]?.isPlus
                        ? "green"
                        : "black",
                    }}
                  >
                    {currencyFormatter(
                      (livePriceSwitch &&
                        livePrices?.[coin.code.toUpperCase()]?.price) ||
                        coin.price
                    )}
                  </TableCell>
                  
                  {/* Price Change Cell */}
                  <TableCell
                    align="center"
                    style={{
                      color: coin.priceChangeDayPerc > 0 ? "green" : "red",

                    }}
                  >
                    <Grid 
                      container 
                      justify="center" 
                      alignItems="center"
                      direction = {matches780Down ? "column" : "row"}>
                      <Grid item>
                        {percentageFormatter(
                          coin.priceChangeDayPerc
                        )}
                      </Grid>
                      <Grid item style={{ marginBottom: "-0.3em" }}>
                        {coin.priceChangeDayPerc > 0 ? (
                          <ArrowDropUpIcon />
                        ) : (
                          <ArrowDropDownIcon />
                        )}
                      </Grid>
                    </Grid>
                  </TableCell>

                  {/* Market Cap Cell */}
                  <Hidden smDown>
                    <TableCell align="center">
                      {currencyFormatter(coin.marketCap, 13)}
                    </TableCell>
                  </Hidden>
                  
                  {/* MarketCap Volume Change Cell */}
                  <TableCell 
                    align="center"
                    style={{display: matches680Down ? "none" : "table-cell"}} >
                    {currencyFormatter(coin.marketCapChangeDay, 10)}
                  </TableCell>
                  
                  {/* Supply Progress Cell */}
                  <Hidden mdDown>
                    <TableCell align="center">
                      <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                      >
                        <Grid item xs className={classes.progressContainer}>
                          <LinearProgress
                            color="primary"
                            className={classes.progress}
                            variant="determinate"
                            value={Number(
                              (coin.circulatingSupply / coin.maxSupply) * 100
                            )}
                          />
                        </Grid>
                        <Grid item xs>
                          <span>{numberFormatter(coin.circulatingSupply)}</span>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </Hidden>
                  
                  {/* Sparkline Cell */}
                  <TableCell 
                    align="center"
                    style={{display: matches530Down ? "none" : "table-cell"}}>
                    <Sparkline chartData={coin.sparkline} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              // Feedback Option for spinner, no found vs..
              <TableRow>
                <TableCell
                  colSpan={7}
                  align="center"
                  className={classes.progressLine}
                >
                  {feedbackMessage ? (
                    feedbackMessage
                  ) : (
                    <CircularProgress color="secondary" />
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        
        </Table>
        
        <Pagination
          count={paginationCount()}
          color="primary"
          onChange={paginationHandler}
          classes={{ ul: classes.pagination }}
          page={page}
        />
      </TableContainer>
    
    </>
  );
};

export default CoinTable;
