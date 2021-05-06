import {useState, useCallback} from "react"
import nomicsAPI from "./nomics"



export const useFetchData = ()=> {

  const [responseCoins, setResponseCoins] = useState([])


  const fetchData = useCallback(
    async ()=> {
    const response = await nomicsAPI.get("/currencies/ticker")
    setResponseCoins(response.data)
    }, []
  )




  return [responseCoins, fetchData ]
}