// Importa Axios
const axios = require('axios');

async function fetchData(cityName) {
  try {
    const response = await axios.get('https://api.teleport.org/api/urban_areas/slug:los-angeles/scores/');
    const data = response.data;

    console.log(data);
  } catch (error) {
    console.error('Errore durante la richiesta:', error.message);
  }
}

export default fetchData;