// http://api.openweathermap.org/data/2.5/weather?q=brazil&appid=f2e53489e36affec9f5b85aafc39a5b1

async function getWeatherData(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=f2e53489e36affec9f5b85aafc39a5b1`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status:${response.status}`);
  } else {
    return response.json();
  }
}

export default { getWeatherData };
