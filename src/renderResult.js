import { getWeatherData } from './retrieveWeather';
import { getWebcam } from './retrieveWebcam';
import algolia from './algolia';

function renderWeather(){
    const [lat, lon] = algolia.getLatLon();
    getWeatherData(lat, lon).then((data)=>{

        
    });
}
