import axios_ from "axios";

const axios = axios_.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

export { axios };
