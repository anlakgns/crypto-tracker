import {useState, useCallback} from "react"
import coinGeckoAPI from "./coinGecko"
import nomicsAPI from "./nomics"
import {useFormatter} from "./../utils/formatterHook" 



export const useFetchData = ()=> {

  const {responseFormatter} = useFormatter()
  const [coinListResponse, setCoinListResponse] = useState([])

  
  const fetchCoinList = useCallback(
    async (source) => {
      if(source === "nomics") {
        const response = await nomicsAPI.get("/currencies/ticker")
        const formatted = responseFormatter(response.data, source)
        setCoinListResponse(formatted)
      }
      if(source === "coinGecko") {
        const response = await coinGeckoAPI.get()
        const formatted = responseFormatter(response.data, source)
        setCoinListResponse(formatted)
      }
    }, [responseFormatter]
  )


  return {coinListResponse, fetchCoinList }
}