import {useState, useEffect} from "react"
import {useFetchData} from "../apis & socket/fetchDataHook"


export const usePortfolio = () => {
  const { coinListResponse, fetchCoinList, sourceAPI } = useFetchData();

  const [portfolioBuyOrderList, setPortfolioBuyOrderList] = useState([]) 
  const [totalSpent, setTotalSpent] = useState()
  const [totalProfit, setTotalProfit] = useState()
  const [totalSpentByCoin,setTotalSpentByCoin] = useState([])
  const [coinToDelete, setCoinToDelete] = useState()
  const [portfolioList, setPortfolioList] = useState([])
  const [selectedCoinForGraph, setSelectedCoinForGraph] = useState("All Assets")

 
  // Initial Data Fetching 
   useEffect( ()=> {
      console.log("initial fething rendered")
      fetchCoinList(sourceAPI);
  }, [fetchCoinList, sourceAPI])

  // Total Spent 
  useEffect(()=> {
    console.log("total spent rendered")
    const allSpent =  portfolioBuyOrderList.reduce((acc, cur) => acc + (cur.priceBought * cur.quantity), 0)
    setTotalSpent(allSpent)
  }, [portfolioBuyOrderList])

  // Total Spent by Coin Detail
  useEffect(()=> {
    const list = [];
    portfolioBuyOrderList.forEach(coin => {
      const finder = list.findIndex(c => c.name === coin.name)
      
      // New coin addition
      if(finder === -1 )
      list.push({
        name : coin.name, 
        value: (+coin.priceBought * coin.quantity), 
        priceBought: +coin.priceBought,
        quantity: coin.quantity, 
        allInfo: coin.allInfo
      })
      
      // Existing Coin addition
      if(finder  > -1) {
        const newValue = (+coin.priceBought * coin.quantity) + list[finder].value
        list[finder].value = newValue 
        
        const newQuantity = +coin.quantity + (+list[finder].quantity)
        list[finder].quantity = newQuantity 
        
      }
    })
    
    setTotalSpentByCoin(list)

  }, [portfolioBuyOrderList])

  // Delete coin from portfolio 
  useEffect(()=> {
    if(coinToDelete) {
      const rest = portfolioBuyOrderList.filter(coin => coinToDelete !== coin.name )
      setPortfolioBuyOrderList(rest)
      setCoinToDelete()
    }
  }, [coinToDelete, portfolioBuyOrderList])

  // Total Spent by Coin, profits added.
  useEffect(() => {
      const list = totalSpentByCoin.map((coin)=> {
        const findCoin = coinListResponse.filter(c => c.name === coin.name)
        const profit = (+findCoin[0]?.price - coin.priceBought)*coin.quantity;
        const profitPerc = (+findCoin[0]?.price - coin.priceBought)/coin.priceBought

        return {
          ...coin,
          profit: profit,
          profitPerc: profitPerc
        }
      })
      setPortfolioList(list)

  },[coinListResponse, totalSpentByCoin])

  // Total Profit.
  useEffect(() => {
    const allProfit =  portfolioList.reduce((acc, cur) => acc + cur.profit, 0)
    setTotalProfit(allProfit)

},[portfolioList])

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
    selectedCoinForGraph
   }
}