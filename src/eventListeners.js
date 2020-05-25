
import { searchSubmitAnimation } from './animationActivate';
// When pressing enter on search bar or clicking the let's go button
$('.search-submit').on('click keypress', function (e) {
  if (e.which === 13 || e.target.tagName === 'BUTTON') {
    const [district, city, country] = $('#search-query').val().split(',');
    // resolvePromise(getWeatherData(lat, lon), getWebcam(lat, lon));
    $('#search-query').val('');
    searchSubmitAnimation();
  }
});

// .catch((err) => {
//   alert(`There has been a problem with your fetch operation: ${err.message}`);
// });

function resolvePromise(weather, webcam) {
  weather.then((data) => console.log(data));
  webcam.then((data) => console.log(data));
}
