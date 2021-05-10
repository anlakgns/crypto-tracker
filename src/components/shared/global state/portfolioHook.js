import {useState, useEffect} from "react"


export const usePortfolio = () => {

  const [portfolioBuyOrderList, setPortfolioBuyOrderList] = useState([]) 
  const [totalSpent, setTotalSpent] = useState()
  const [totalSpentByCoin,setTotalSpentByCoin] = useState([])
  const [coinToDelete, setCoinToDelete] = useState()
  const [sourceAPI, setSourceAPI] = useState("nomics")

  // Total Spent 
  useEffect(()=> {
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
        allInfo: coin.allInfo})

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


  return {portfolioBuyOrderList, setPortfolioBuyOrderList, totalSpentByCoin, totalSpent, setCoinToDelete, sourceAPI, setSourceAPI }
}