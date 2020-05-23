import { getWeatherData } from './retrieveData';
import { searchSubmitAnimation } from './animationActivate';
import algolia from './algolia';
// When pressing enter on search bar or clicking the let's go button
$('.search-submit').on('click keypress', function (e) {
  if (e.which === 13 || e.target.tagName === 'BUTTON') {
    // const [district, city] = $('#search-query').val().split(',');
    const [lat, lon] = algolia.getLatLon();
    getWeatherData(lat, lon)
      .then((data) => console.log(data))
      .catch((er) => console.log(er));
    $('#search-query').val('');
    searchSubmitAnimation();
  }
});

// .catch((err) => {
//   alert(`There has been a problem with your fetch operation: ${err.message}`);
// });
