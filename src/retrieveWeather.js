// http://api.openweathermap.org/data/2.5/weather?q=brazil&appid=f2e53489e36affec9f5b85aafc39a5b1

async function getWeatherData(lat, lon) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=f2e53489e36affec9f5b85aafc39a5b1`
    );
    const data = await response.json();
    $('#temperature').html(`${data.main.temp.toFixed(1)}`);
    const weatherCondition = data.weather[0].description;
    $('#condition').text(capitalizeFirstLetter(weatherCondition));
    $('#condition-img').attr('src', `./images/${assignImage(weatherCondition)}.svg`);
    console.log(data);
    console.log(weatherCondition);
  } catch (err) {
    alert('Invalid city! Please enter a valid city!');
    throw new Error(`HTTP error! status:${err.status}`);
  }
}

// For situations like 'scattered clouds'
function assignImage(weatherCondition) {
  if (weatherCondition.includes('cloud')) return 'cloud';
  if (weatherCondition.includes('rain')) return 'rain';
  if (weatherCondition.includes('clear')) return 'clear-sky';
  return weatherCondition;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default getWeatherData;
