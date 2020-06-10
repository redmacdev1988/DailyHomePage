// Global app controller

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

















