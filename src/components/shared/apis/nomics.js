import axios from "axios"; 

const KEY = "ad3818512a96218237d2bbbd8997dfac";

export default axios.create({
  baseURL: "https://api.nomics.com/v1",
  params: {
    key: KEY,
    "per-page": 100
  }

})
