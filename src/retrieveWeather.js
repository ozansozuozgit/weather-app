// http://api.openweathermap.org/data/2.5/weather?q=brazil&appid=f2e53489e36affec9f5b85aafc39a5b1

async function getWeatherData(lat, lon) {
  // const response = await fetch(
  //   `http://api.openweathermap.org/data/2.5/weather?q=${district},${city}&appid=f2e53489e36affec9f5b85aafc39a5b1`
  // );
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f2e53489e36affec9f5b85aafc39a5b1`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status:${response.status}`);
  } else {
    // const data = await response.json();
    // console.log(data);
    return response.json();
  }
}

export { getWeatherData };
