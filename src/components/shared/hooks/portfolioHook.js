import { useState, useEffect } from 'react';
import { useFetchData } from './fetchDataHook';

export const usePortfolio = () => {
  const { fetchCoinList } = useFetchData();

  const [portfolioBuyOrderList, setPortfolioBuyOrderList] = useState([]);
  const [totalSpent, setTotalSpent] = useState();
  const [totalProfit, setTotalProfit] = useState();
  const [totalSpentByCoin, setTotalSpentByCoin] = useState([]);
  const [coinToDelete, setCoinToDelete] = useState();
  const [portfolioList, setPortfolioList] = useState([]);
  const [selectedCoinForGraph, setSelectedCoinForGraph] =
    useState('All Assets');
  const [coinListResponse, setCoinListResponse] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  // Initial Data Fetching
  useEffect(() => {
    const fetch = () => {
      const regularlyFetch = setInterval(async () => {
        console.log('data fetched.');
        const response = await fetchCoinList();
        setCoinListResponse(response);
      }, 20000);
      return () => {
        clearInterval(regularlyFetch);
      };
    };
    fetch();
  }, [fetchCoinList]);

  useEffect(() => {
    const fetchInitial = async ()=> {
      console.log('data fetched.');
      const response = await fetchCoinList();
      setCoinListResponse(response);
    }
    fetchInitial()
  }, [fetchCoinList]);

  // Total Spent
  useEffect(() => {
    const allSpent = portfolioBuyOrderList.reduce(
      (acc, cur) => acc + cur.priceBought * cur.quantity,
      0
    );
    setTotalSpent(allSpent);
  }, [portfolioBuyOrderList]);

  // Total Spent by Coin Detail
  useEffect(() => {
    const list = [];
    portfolioBuyOrderList.forEach((coin) => {
      const finder = list.findIndex((c) => c.name === coin.name);

      // New coin addition
      if (finder === -1)
        list.push({
          name: coin.name,
          value: +coin.priceBought * coin.quantity,
          priceBought: +coin.priceBought,
          quantity: coin.quantity,
          allInfo: coin.allInfo,
        });

      // Existing Coin addition
      if (finder > -1) {
        const newValue = +coin.priceBought * coin.quantity + list[finder].value;
        list[finder].value = newValue;

        const newQuantity = +coin.quantity + +list[finder].quantity;
        list[finder].quantity = newQuantity;
      }
    });

    setTotalSpentByCoin(list);
  }, [portfolioBuyOrderList]);

  // Delete coin from portfolio
  useEffect(() => {
    if (coinToDelete) {
      const rest = portfolioBuyOrderList.filter(
        (coin) => coinToDelete !== coin.name
      );
      setPortfolioBuyOrderList(rest);
      setCoinToDelete();
    }
  }, [coinToDelete, portfolioBuyOrderList]);

  // Total Spent by Coin, profits added.
  useEffect(() => {
    const list = totalSpentByCoin.map((coin) => {
      const findCoin = coinListResponse.filter((c) => c.name === coin.name);
      const profit = (+findCoin[0]?.price - coin.priceBought) * coin.quantity;
      const profitPerc =
        (+findCoin[0]?.price - coin.priceBought) / coin.priceBought;

      return {
        ...coin,
        profit: profit,
        profitPerc: profitPerc,
      };
    });
    setPortfolioList(list);
  }, [coinListResponse, totalSpentByCoin]);

  // Total Profit.
  useEffect(() => {
    const allProfit = portfolioList.reduce((acc, cur) => acc + cur.profit, 0);
    setTotalProfit(allProfit);
  }, [portfolioList]);

  // bookmark/favorite coins
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

  return {
    portfolioBuyOrderList,
    setPortfolioBuyOrderList,
    totalSpentByCoin,
    totalSpent,
    setCoinToDelete,
    coinListResponse,
    portfolioList,
    totalProfit,
    setSelectedCoinForGraph,
    selectedCoinForGraph,
    bookmarkHandler,
    bookmarks,
  };
};
