import { getWeatherData } from './retrieveWeather';
import { getImage } from './retrieveImage';
import { searchSubmitAnimation } from './animationActivate';
import algolia from './algolia';
// When pressing enter on search bar or clicking the let's go button
$('.search-submit').on('click keypress', function (e) {
  if (e.which === 13 || e.target.tagName === 'BUTTON') {
    const [district, city, country] = $('#search-query').val().split(',');
    const [lat, lon] = algolia.getLatLon();
    resolvePromise(getWeatherData(lat, lon), getImage(city));
    $('#search-query').val('');
    searchSubmitAnimation();
  }
});

// .catch((err) => {
//   alert(`There has been a problem with your fetch operation: ${err.message}`);
// });

function resolvePromise(weather, image) {
  weather.then((data) => console.log(data));
  image.then((data) => console.log(data));
}
