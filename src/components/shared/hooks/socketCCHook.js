import {useState, useCallback} from "react"

const apiKey = "8580d10a1c80620968dba21176ae1db67299f5231c7d2af40d28e0ce4ad31b81";
let ccSocket; 

export const useSocketCC = ()=> {
  

  const [livePrices, setLivePrices] = useState();
  
  const startSocketConnection = useCallback((requestList) => {
    ccSocket = new WebSocket('wss://streamer.cryptocompare.com/v2?api_key=' + apiKey);
     ccSocket.onopen = function onStreamOpen() {
      const subRequest = {
          "action": "SubAdd",
          "subs": requestList,
      };
      ccSocket.send(JSON.stringify(subRequest));
      console.log("request list send.")
    }

    ccSocket.onmessage = function onStreamMessage(event) {
      const data = JSON.parse(event.data)
        if(data.TYPE === "5" && data.PRICE) {
          setLivePrices(prevState => {
            const coinName = data.FROMSYMBOL
            const isPlus = prevState?.[coinName]?.price ? prevState?.[coinName]?.price < data.PRICE : null
  
            return {
                ...prevState,
                [data.FROMSYMBOL]: {
                  price: data.PRICE, 
                  isPlus : isPlus
                }
              }
            })
        }
    }

  },[])


  const closeSocketConnection =useCallback(() => {
    ccSocket?.close()
  },[])
    


  return [livePrices, startSocketConnection, closeSocketConnection]
}




  

