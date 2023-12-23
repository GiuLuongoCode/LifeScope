// Importa Axios
const axios = require('axios');

export async function fetchData(cityName) {
  try {
    const response = await axios.get('https://api.teleport.org/api/urban_areas/slug:los-angeles/scores/');
    const data = response.data;

    console.log(data);
  } catch (error) {
    console.error('Errore durante la richiesta:', error.message);
  }
}

export async function autoComplete(searchTerm){
  console.log("AUTO COMPLETE", searchTerm);
  const suggestionsList = [];
  try {
    const response = await axios.get('https://api.teleport.org/api/cities', {params: {search: searchTerm}});
    return response;
  }
  catch (error) {
    console.error("Error on request", error.message);
  }
}
