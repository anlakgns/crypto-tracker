import { useState, useCallback } from "react";
import coinGeckoAPI from "./coinGecko";
import nomicsAPI from "./nomics";
import { useFormatter } from "./../utils/formatterHook";
import axios from "axios"; 

const NOMICS = "nomics";
const COINGECKO = "coinGecko";

export const useFetchData = () => {
  const [sourceAPI, setSourceAPI] = useState(COINGECKO);
  const [coinHistoricResponse, setCoinHistoricResponse] = useState([])

  const { responseFormatter } = useFormatter();
  const [coinListResponse, setCoinListResponse] = useState([]);

  const fetchCoinList = useCallback(
    async (source) => {
      if (source === NOMICS) {
        const response = await nomicsAPI.get("/currencies/ticker");
        const formatted = responseFormatter(response.data, source);
        setCoinListResponse(formatted);
      }
      if (source === COINGECKO) {
        const response = await coinGeckoAPI.get("/markets");
        const formatted = responseFormatter(response.data, source);
        setCoinListResponse(formatted);
      }
    },
    [responseFormatter]
  );


  const fetchHistoricOneData = useCallback(
    async (coinName, currency, days) => {
        const response =  await coinGeckoAPI.get(`/${coinName}/market_chart`, {
          params: {
            vs_currency: currency,
            days: days
          }
        });
        setCoinHistoricResponse(response)
    }, []
  )

  const fetchHistoricBundleData = useCallback(
    (coinArray, currency, days, quantities) => {
      
      axios.all(coinArray.map(coin => {
        return coinGeckoAPI.get(`/${coin}/market_chart`, {
          params: {
            vs_currency: currency,
            days: days
          }
        });
      }))
      .then(axios.spread((...responses) => {
        // Both requests are now complete
        console.log(responses)
        const responsesDataPrices = responses.map(coin => {
          return coin.data.prices
        })
        if(responsesDataPrices.length !== 0) {
          const dates = responsesDataPrices.map(coin => {
            return coin.map(c => {
              return c[0]
            } )
          })
  
          const prices = responsesDataPrices.map(coin => {
            return coin.map(c => {
              return c[1]
            } )
          })

          let results = []
           for(let j = 0; j < prices[0].length ; j++) {
            let sum = 0
            for(let i = 0; i < prices.length; i++){
            sum += (prices[i][j]*quantities[i])
            }
            results.push([dates[0][j], sum])
           }
          
           const list = {data: {prices: results}}
           
           setCoinHistoricResponse(list)
        }

      }));
      

    },[])

  return { coinListResponse, fetchCoinList, setSourceAPI, sourceAPI, fetchHistoricOneData,coinHistoricResponse , fetchHistoricBundleData};
};

