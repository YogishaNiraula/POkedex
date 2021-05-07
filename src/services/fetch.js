import axios from "axios";

async function getDataFromUrl(url) {
  return (await axios.get(url)).data;
}

export { getDataFromUrl };
