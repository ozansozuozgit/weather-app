// const places = require('places.js');
import places from '../node_modules/places.js';

export default (function algolia() {
  let lat;
  let lon;
  let city;
  let country;

  const placesAutocomplete = places({
    appId: 'pl0O1GN8NY5H',
    apiKey: 'ba6758305a11697b5bb20da5f2541d8a',
    container: document.querySelector('#search-query'),
  }).configure({
    type: 'city',
    aroundLatLngViaIP: false,
  });

  placesAutocomplete.on('clear', function () {
    $('#search-query').textContent = 'none';
  });
  placesAutocomplete.on('change', (e) => {
    console.log(e.suggestion);
    lat = e.suggestion.latlng.lat;
    lon = e.suggestion.latlng.lng;
    city = e.suggestion.name;
    country = e.suggestion.country;
  });

  const getLatLon = () => [lat, lon];
  const getCityCountry = () => `${city},${country}`;

  return { getLatLon, getCityCountry };
})();
