import axios from "axios"; 

const KEY = "a872ce6b8be24dbfa30039c6a471bb9b";

export default axios.create({
  baseURL: "https://openexchangerates.org/api/",
  params: {
    app_id: KEY,
  }

})