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
      console.log(response)
      if(source === "coinGecko") {
        return {
          name: coin.name,
          id: coin.id,
          code: coin.symbol,
          price: coin.current_price,
          priceChangeDayPerc : coin.price_change_percentage_24h, 
          priceChangeWeekPerc: "not available in this api",
          logo: coin.image,
          marketCap: coin.market_cap,
          marketCapChangeDay: coin.market_cap_change_24h, 
          circulatingSupply: coin.circulating_supply,
          maxSupply: coin.max_supply,
          sparkline: coin.sparkline_in_7d.price

        }
      }

      if(source === "nomics") {
        return {
          name: coin.name,
          id: coin.id,
          code: coin.id,
          price: coin.price,
          priceChangeDayPerc : coin["1d"].price_change_pct, 
          priceChangeWeekPerc: coin["7d"].price_change_pct,
          logo: coin.logo_url,
          marketCap: coin.market_cap,
          marketCapChangeDay: coin["1d"].volume_change, 
          circulatingSupply: coin.circulating_supply,
          maxSupply: coin.max_supply,
        }
      }
      return "Please enter your API source correctly.";
    })
    return formattedResponse
  }, [])


  // Time formatter 
  const dateFormatter = useCallback((date) => {
    const dayGet = (date) => {
      const dayNo = date?.getDay();
      let day;
      switch(dayNo) {
        case 0:
          day = "Sunday"
          break;
        case 1:
          day = "Monday"
          break;
        case 2:
          day = "Tuesday"
          break;
        case 3:
          day = "Wednesday"
          break;
        case 4:
          day = "Thursday"
          break;
        case 5:
          day = "Friday"
          break;
        case 6:
          day = "Saturday"
          break;
        default :
          day = "Saturday"
        
      }
      return day
    }
    const monthGet = (date) => {
      const monthNo = date?.getDay();
      let month;
      switch(monthNo) {
        case 0:
          month = "January"
          break;
        case 1:
          month = "February"
          break;
        case 2:
          month = "March"
          break;
        case 3:
          month = "April"
          break;
        case 4:
          month = "May"
          break;
        case 5:
          month = "June"
          break;
        case 6:
          month = "July"
          break;
        case 7:
          month = "August"
          break;
        case 8:
          month = "September"
          break;
        case 9:
          month = "October"
          break;
        case 10:
          month = "November"
          break;
        case 11:
          month = "December"
          break;
        default: 
          month = "January"
      }
      return month
    }
    const monthDay = date?.getDate();
    const yearGet = date?.getFullYear();
    const hourGet = date?.getHours();
    const minutesGet = date?.getMinutes();
    const secondsGet = date?.getSeconds();
    
    return `${dayGet()}, ${monthGet()} ${monthDay}th, ${yearGet} at ${hourGet}:${minutesGet}:${secondsGet} ${hourGet > 11 ? "PM" : "AM"}`
  }, [])

    
  
  
  return {percentageFormatter, numberFormatter, currencyFormatter, responseFormatter, dateFormatter}
}

