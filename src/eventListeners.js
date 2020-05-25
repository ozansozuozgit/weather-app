import { resultAnimation, searchAnimation } from './animationActivate';
import getWeatherData from './retrieveWeather';
import getWebcam from './retrieveWebcam';
import algolia from './algolia';

// When pressing enter on search bar or clicking the let's go button
$('.search-submit').on('click keypress', function (e) {
  if (e.which === 13 || e.target.tagName === 'BUTTON') {
    const [lat, lon] = algolia.getLatLon();
    $('#location-name').text(algolia.getCityCountry());
    $('#search-query').val('');

    getWeatherData(lat, lon)
      .then(() => {
        algolia.resetSearch();
        getWebcam(lat, lon).then(() => {
          $('#result-container').delay(400).slideDown(1500);
        });
      })
      .catch(e);
    resultAnimation();
  }
});

$('#search-btn').on('click', function () {
  searchAnimation();
});

$('#fahrenheit').on('click', function (e) {
  const value = parseFloat($('#temperature').text());
  if ($('#temperature').hasClass('C')) {
    const convertedToCelcius = value * 1.8 + 32;
    $('#temperature').text(convertedToCelcius.toFixed(1));
    $('#temperature').removeClass('C');
    $('#temperature').addClass('F');
  }
});
$('#celcius').on('click', function (e) {
  const value = parseFloat($('#temperature').text());
  if ($('#temperature').hasClass('F')) {
    const convertedToCelcius = (value - 32) / 1.8;
    $('#temperature').text(convertedToCelcius.toFixed(1));
    $('#temperature').removeClass('F');
    $('#temperature').addClass('C');
  }
});
