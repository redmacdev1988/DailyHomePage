// Global app controller
// load images

//for (let i = 0; i < 3; i++) {
    // var img = new Image(); // Use DOM HTMLImageElement
    // img.src = '../img/antuoshan1.jpg';
    // img.id = 'imageHolder';
    // img.style = 'width: 10px; position: absolute; left:-999px';
    // document.getElementById('holder').appendChild(img);
//}




import x from './test'
const num = 23;
console.log(`src/js/index.js imported ${x} from ./test varialbe num is ${num}`);

import store from './modules/redux/store';
import { weatherAdded, coronaAdded } from './modules/redux/actions';

// Exchange Rate module
import ExchangeRate from './modules/ExchangeRates';



// Weather module
import Weather from './modules/Weather';
Weather.store = store;
Weather.fetchWeatherData(function() {
    console.log('fetched weather data, and dispatching to redux store');

    store.dispatch(
        weatherAdded({
            iconURL: Weather.iconURL,
            cityName: Weather.cityName,
            degreeInCelcius: Weather.degreeInCelcius,
            description: Weather.weatherDescription
        })
    );
});

// Carousel module
import Carousel from './modules/Carousel.js'; 

// Corona Data
// whenever data is received, we need it into the store
// then update Nav component 

// 1) connect store to Corona
import CoronaCases from './modules/CoronaCases';
console.log(`Created CoronaCases instance √`); 

CoronaCases.init(cases => {
    store.dispatch(
        coronaAdded({
            cases
        })
    );
    CoronaCases.initEvents();
});

















