import axios from "axios"; 


export default axios.create({
  baseURL: "https://api.coingecko.com/api/v3/coins",
  params: {
    vs_currency: "usd",
    order: "market_cap_desc",
    per_page : "100",
    page: 1,
    sparkline: false
  }

})




// const response = fetch(
//   "?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
// )
//   .then((r) => r.json())
//   .then((err) => console.log(err));
