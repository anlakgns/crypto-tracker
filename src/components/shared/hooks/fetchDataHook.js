import { useCallback } from "react";
import coinGeckoAPI from "../apis/coinGeckoAPI";
import { useFormatter } from "../utils/formatterHook";
import axios from "axios";

export const useFetchData = () => {
  const { responseFormatter } = useFormatter();

  const fetchCoinList = useCallback(async () => {
    const response = await coinGeckoAPI.get("/markets");
    const formatted = responseFormatter(response.data);
    return formatted;
  }, [responseFormatter]);

  const fetchHistoricSingleData = useCallback(async (coinName, currency, days, source) => {

    const response = await coinGeckoAPI.get(`/${coinName}/market_chart`, {
      params: {
        vs_currency: currency,
        days: days,
      },
      cancelToken: source.token
    });
    return response;
  }, []);

  // Too expensive function, make it cheaper for performance opt.
  const fetchHistoricBundleData = useCallback(
    async (coinArray, currency, days, quantities) => {
      const responses = await axios.all(
        coinArray.map((coin) => {
          return coinGeckoAPI.get(`/${coin}/market_chart`, {
            params: {
              vs_currency: currency,
              days: days,
            },
          });
        })
      );

      // Extraction prices&dates from responses
      const responsesDataPrices = responses.map((coin) => {
        return coin.data.prices;
      });

      if (responsesDataPrices.length !== 0) {
        // extraction dates [[date, price], [date,price]]
        const dates = responsesDataPrices.map((coin) => {
          return coin.map((c) => {
            return c[0];
          });
        });

        // extraction prices
        const prices = responsesDataPrices.map((coin) => {
          return coin.map((c) => {
            return c[1];
          });
        });

        // Addition of all coins prices with the first coin dates
        let results = [];
        for (let j = 0; j < prices[0].length; j++) {
          let sum = 0;
          for (let i = 0; i < prices.length; i++) {
            sum += prices[i][j] * quantities[i];
          }
          results.push([dates[0][j], sum]);
        }

        const list = { data: { prices: results } };

        return list;
      }
    },
    []
  );

  const fetchPerformanceData = useCallback(
    async (coinArray, currency, days) => {
      const responses = await axios.all(
        coinArray.map((coin) => {
          return coinGeckoAPI.get(`/${coin}/market_chart`, {
            params: {
              vs_currency: currency,
              days: days,
            },
          });
        })
      );
      return responses;
    },
    []
  );

  const fetchSingleCoin = useCallback(async (coinName) => {
    try {
      const response = await coinGeckoAPI.get(
        `https://api.coingecko.com/api/v3/coins/${coinName}?
          `,
        {
          params: {
            localization: false,
            tickers: true,
            market_data: true,
            community_data: true,
            developer_data: true,
            sparkline: true,
          },
        }
      );
      return response;
    } catch(err) {
      console.log(err)
    }
    
  }, []);

  return {
    fetchCoinList,
    fetchHistoricSingleData,
    fetchHistoricBundleData,
    fetchPerformanceData,
    fetchSingleCoin,
  };
};
