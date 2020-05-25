// http://api.openweathermap.org/data/2.5/weather?q=brazil&appid=f2e53489e36affec9f5b85aafc39a5b1

async function getWeatherData(lat, lon) {

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=f2e53489e36affec9f5b85aafc39a5b1`
    );
    return response.json();
  } catch (e) {
    $('#search-query').addClass('')
    return false;
    // throw new Error(`HTTP error! status:${response.status}`);
  }
}

export default getWeatherData;
