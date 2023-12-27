import { API_ROOT, API_CITIES, API_LIFE_SCOPE, API_SCORES } from './enviroments';
const axios = require('axios');

export async function fetchData(cityName) {
  try {
    const endpoint = API_ROOT + API_LIFE_SCOPE;
    const url =  endpoint + cityName + API_SCORES;
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.error('Errore on request:', error.message);
  }
}

export async function autoComplete(searchTerm){
  try {
    const url = API_ROOT + API_CITIES;
    const response = await axios.get(url, {params: {search: searchTerm}});
    return response;
  }
  catch (error) {
    console.error("Error on request", error.message);
  }
}
