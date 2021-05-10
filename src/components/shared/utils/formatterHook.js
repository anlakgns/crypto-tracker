import {useCallback} from "react"

export const useFormatter = ()=> {

   // Number Formatters
   const percentageFormatter = useCallback((num, source) => {
    if(source === "coinGecko") {
      const formatDone = (+num).toFixed(2) + "%";
      return formatDone
    }
    if(source === "nomics") {
      const formatDone = (num*100).toFixed(2) + "%";
      return formatDone
    }
  }, [])

  const numberFormatter = useCallback((num) => {
    const numb = Number(num)    
    return new Intl.NumberFormat().format(numb)
  }, [])

  const currencyFormatter =useCallback((num, digits)=> {
    
    const numb = Number(num)    
    const digit = num < 1 ? 4 : undefined  
      return new Intl.NumberFormat('en-EN', {maximumSignificantDigits: digit, style: 'currency', currency: 'USD' }).format(numb)
  }, [])


  // Coin Response API formatter
  const responseFormatter =useCallback((response, source) => {
    const formattedResponse = response.map((coin) => {
      
      if(source === "coinGecko") {
        return {
          name: coin.name,
          id: coin.symbol,
          price: coin.current_price,
          priceChangeDayPerc : coin.price_change_percentage_24h, 
          priceChangeWeekPerc: "not available in this api",
          logo: coin.image,
          marketCap: coin.market_cap,
          marketCapChangeDay: coin.market_cap_change_24h, 
          circulatingSupply: coin.circulating_supply,
          maxSupply: coin.max_supply
        }
      }

      if(source === "nomics") {
        return {
          name: coin.name,
          id: coin.id,
          price: coin.price,
          priceChangeDayPerc : coin["1d"].price_change_pct, 
          priceChangeWeekPerc: coin["7d"].price_change_pct,
          logo: coin.logo_url,
          marketCap: coin.market_cap,
          marketCapChangeDay: coin["1d"].volume_change, 
          circulatingSupply: coin.circulating_supply,
          maxSupply: coin.max_supply
        }
      }
      return "Please enter your API source correctly.";
    })
    return formattedResponse
  }, [])

  return {percentageFormatter, numberFormatter, currencyFormatter, responseFormatter}
}