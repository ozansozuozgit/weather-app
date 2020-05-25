import 'normalize.css';
import './styles/style.css';
import './retrieveWeather';
import './eventListeners';
import './algolia';
// import all images
const reqSvgs = require.context('./images', true, /\.svg$/);

console.log('JS working');
