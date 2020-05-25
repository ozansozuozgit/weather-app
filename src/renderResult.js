import getWeatherData from './retrieveWeather';
import { getWebcam } from './retrieveWebcam';
import algolia from './algolia';

function renderWeather() {
  $('#location-name').text(algolia.getCityCountry());

  const [lat, lon] = algolia.getLatLon();
  getWeatherData(lat, lon).then((data) => {
    $('#temperature').html(`${data.main.temp.toFixed(1)}&#8457;`);
    const weatherCondition = data.weather[0].description;
    $('#condition').text(capitalizeFirstLetter(weatherCondition));
    $('#condition-img').attr('src', `./images/${assignImage(weatherCondition)}.svg`);
    console.log(data);
    console.log(weatherCondition);
  });
}
// For situations like 'scattered clouds'
function assignImage(weatherCondition) {
  if (weatherCondition.includes('cloud')) return 'cloud';
  if (weatherCondition.includes('rain')) return 'rain';
  if (weatherCondition.includes('clear')) return 'clear-sky';
  return weatherCondition;
}

function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export { renderWeather };
