import { searchSubmitAnimation } from './animationActivate';
import { renderWeather, renderWebcam } from './renderResult';
import getWeatherData from './retrieveWeather';
import algolia from './algolia';

// When pressing enter on search bar or clicking the let's go button
$('.search-submit').on('click keypress', function (e) {
  if (e.which === 13 || e.target.tagName === 'BUTTON') {
    const [lat, lon] = algolia.getLatLon();
    getWeatherData(lat, lon)
      .then((alert) => {
        renderWebcam();
        console.log('hi query');
        $('#search-query').val('');
        searchSubmitAnimation();
      })
      .catch(e);
  }
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
