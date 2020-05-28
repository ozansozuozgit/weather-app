import { resultAnimation, searchAnimation, loadingAnimation } from './animationActivate';
import getWeatherData from './retrieveWeather';
import getWebcam from './retrieveWebcam';
import algolia from './algolia';

// When pressing enter on search bar or clicking the let's go button
$('.search-submit').on('click keypress', function (e) {
  if (e.which === 13 || e.target.tagName === 'BUTTON') {
    const [lat, lon] = algolia.getLatLon();
    $('#location-name').text(algolia.getCityCountry());
    $('#search-query').val('');

    // Only execute when we have resolved data
    getWeatherData(lat, lon)
      .then(() => {
        algolia.resetSearch();
        $('#temperature').removeClass().addClass('F');
        loadingAnimation();
        resultAnimation();
        getWebcam(lat, lon).then(() => {
          $('#result-container').delay(1300).slideDown(1500);
        });
      })
      .catch((err) => console.log(err));
  }
});

$('#search-btn').on('click', function () {
  searchAnimation();
});

$('#fahrenheit').on('click', function () {
  const value = $('#temperature').text();
  if ($('#temperature').hasClass('C')) {
    const convertedToCelcius = value * 1.8 + 32;
    toggleTemperature(convertedToCelcius);
  }
});
$('#celcius').on('click', function () {
  const value = $('#temperature').text();
  if ($('#temperature').hasClass('F')) {
    const convertedToCelcius = (value - 32) / 1.8;
    toggleTemperature(convertedToCelcius);
  }
});

function toggleTemperature(value) {
  $('#temperature').text(value.toFixed(1));
  $('#temperature').toggleClass('F');
  $('#temperature').toggleClass('C');
}
