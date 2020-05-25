async function getWebcam(lat, lon) {
  const response = await fetch(
    `https://api.windy.com/api/webcams/v2/list/nearby=${lat},${lon},5?show=webcams:location,player&key=xebab4fii9wlfSyuk4n363aFNPn4faml`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status:${response.status}`);
  } else {
    return response.json();
  }
}

export default getWebcam;

// https://api.windy.com/api/webcams/v2/list/nearby=46.54,7.98,5?show=webcams:location,player&key=xebab4fii9wlfSyuk4n363aFNPn4faml

//  `https://api.windy.com/api/webcams/v2/list/nearby=${lat},${lon},5?show=webcams:location,player&key=xebab4fii9wlfSyuk4n363aFNPn4faml`
