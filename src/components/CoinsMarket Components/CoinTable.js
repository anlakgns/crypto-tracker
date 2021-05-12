import React, { useEffect, useState, useContext } from "react";

import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";
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

import { useSocketCC } from "../shared/apis & socket/socketCCHook";
import { CoinCard } from "./CoinCard";
import { FeatureBar } from "./FeaturesBar";
import HeadUnderline from "../shared/UI components/HeadUnderline";
import { useFormatter } from "../shared/utils/formatterHook";
import {GlobalContext} from "../shared/global state/globalContext"

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
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
}));

const CoinTable = () => {
  const classes = useStyles();
  const [
    livePrices,
    startSocketConnection,
    closeSocketConnection,
  ] = useSocketCC();
  const {
    percentageFormatter,
    numberFormatter,
    currencyFormatter,
  } = useFormatter();
  const {sourceAPI, coinListResponse} = useContext(GlobalContext)

  const [searchSubmitTerm, setSearchSubmitTerm] = useState();
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

  // Search Logic
  useEffect(() => {
    const results = rawRenderList?.filter((coin) =>
      coin.name.toLowerCase().includes(searchSubmitTerm)
    );
    setSearchedRenderList(results);
  }, [searchSubmitTerm, rawRenderList]);

  // Render Logic
  useEffect(() => {
    const searchCandidates = favoriteCheck ? bookmarks : coinListResponse;
    setRawRenderList(searchCandidates);
  }, [favoriteCheck, bookmarks, coinListResponse]);

  // Socket Request
  useEffect(() => {
    const listForSocket = finalRenderList?.map((coin) => {
      return `5~CCCAGG~${coin.id}~USD`;
    });
    setSocketList(listForSocket);
  }, [finalRenderList]);

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
    const listForSort =
      searchedRenderList.length === 0 ? rawRenderList : searchedRenderList;

    const sortedList = sortHandler(listForSort, sortType);

    setFinalRenderList(favoriteCheck ? bookmarks : sortedList);
  }, [
    page,
    sortType,
    rawRenderList,
    favoriteCheck,
    bookmarks,
    searchedRenderList,
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

  return (
    <>
      {/* Headline */}
      <HeadUnderline
        headline="Today's Cryptocurrency Prices by Market Cap"
        long="20em"
      />
      {/* Cards */}
      <Grid container justify="center" alignItems="center" spacing={2}>
        {cardCoinsInfo?.map((coin) => {
          return (
            <Grid item md key={coin.id}>
              <CoinCard
                imgSource={coin.logo}
                alt={coin.id}
                coinName={coin.name}
                coinCode={coin.id}
                percentageChangeByDay={coin.priceChangeDayPerc}
                price={currencyFormatter(coin.price)}
              />
            </Grid>
          );
        })}
      </Grid>

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
          <TableHead>
            <TableRow>
              <TableCell>
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
              <TableCell align="center">
                <Button
                  onClick={() =>
                    sortToggleHandler(
                      "changePercentageWeekDescending",
                      "changePercentageWeekAscending"
                    )
                  }
                >
                  7d
                </Button>
              </TableCell>
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
              <TableCell align="center">
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
            </TableRow>
          </TableHead>
          <TableBody>
            {finalRenderList.map((coin) => (
              <TableRow key={coin.id}>
                <TableCell component="th">
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={4}>
                      <Button onClick={() => bookmarkHandler(coin)}>
                        {bookmarks.find(
                          (bookmark) => coin.id === bookmark.id
                        ) === undefined ? (
                          <BookmarkBorderIcon />
                        ) : (
                          <BookmarkIcon />
                        )}
                        {/* <BookmarkBorderIcon/>  */}
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
                <TableCell
                  className={classes.price}
                  align="center"
                  style={{
                    color: livePrices?.[coin.id]?.isPlus ? "green" : "black",
                  }}
                >
                  {currencyFormatter(
                    (livePriceSwitch && livePrices?.[coin.id]?.price) ||
                      coin.price
                  )}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color: coin.priceChangeDayPerc > 0 ? "green" : "red",
                  }}
                >
                  <Grid container justify="center" alignItems="center">
                    <Grid item>
                      {percentageFormatter(coin.priceChangeDayPerc, sourceAPI)}
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

                <TableCell
                  align="center"
                  style={{
                    color: coin.priceChangeWeekPerc > 0 ? "green" : "red",
                  }}
                >
                  <Grid container justify="center" alignItems="center">
                    <Grid item>
                      {sourceAPI === "coinGecko"
                        ? "Not Available on CoinGecko API"
                        : percentageFormatter(
                            coin.priceChangeWeekPerc,
                            sourceAPI
                          )}
                    </Grid>
                    <Grid item style={{ marginBottom: "-0.3em" }}>
                      {coin.priceChangeWeekPerc > 0 ? (
                        <ArrowDropUpIcon />
                      ) : (
                        <ArrowDropDownIcon />
                      )}
                    </Grid>
                  </Grid>
                </TableCell>

                <TableCell align="center">
                  {currencyFormatter(coin.marketCap, 13)}
                </TableCell>
                <TableCell align="center">
                  {currencyFormatter(coin.marketCapChangeDay, 10)}
                </TableCell>
                <TableCell align="center">
                  <Grid container justify="center" alignItems="center">
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          count={10}
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
