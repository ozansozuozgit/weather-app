// http://api.openweathermap.org/data/2.5/weather?q=brazil&appid=f2e53489e36affec9f5b85aafc39a5b1

async function getWeatherData(searchQuery) {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=f2e53489e36affec9f5b85aafc39a5b1`
  );
  console.log(response.json());

  if (!response.ok) {
    throw new Error(`HTTP error! status:${response.status}`);
  } else {
    console.log(response.json());
    return response.json();
  }

  //   try {
  //     const response = await fetch(
  //       `http://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=f2e53489e36affec9f5b85aafc39a5b1`
  //     );
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (err) {
  //     alert('no');
  //   }
}

$('#search-container > button').on('click', () => {
  console.log($('#search-query').val());
  getWeatherData($('#search-query').val());
});
