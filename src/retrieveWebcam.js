async function getWebcam(lat, lon) {
  try {
    const response = await fetch(
      `https://api.windy.com/api/webcams/v2/list/nearby=${lat},${lon},5?show=webcams:location,player&key=xebab4fii9wlfSyuk4n363aFNPn4faml`
    );
    const data = await response.json();

    const webcams = data.result.webcams;
    const webcamLink = webcams.length > 0 ? webcams[0].player.day.embed : '';
    $('iframe').attr('src', webcamLink);
  } catch (e) {
    throw new Error(`HTTP error! status:${err.status}`);
  }
}

export default getWebcam;
