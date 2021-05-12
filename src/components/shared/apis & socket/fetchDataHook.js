import { useState, useCallback } from "react";
import coinGeckoAPI from "./coinGecko";
import nomicsAPI from "./nomics";
import { useFormatter } from "./../utils/formatterHook";

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


  const fetchHistoricData = useCallback(
    async (coinName, currency, days) => {
        const response = await coinGeckoAPI.get(`/${coinName}/market_chart`, {
          params: {
            vs_currency: currency,
            days: days
          }
        });
        setCoinHistoricResponse(response)
    }, []
  )

    

  return { coinListResponse, fetchCoinList, setSourceAPI, sourceAPI, fetchHistoricData,coinHistoricResponse };
};

