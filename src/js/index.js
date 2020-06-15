import x from './test'
const num = 23;
console.log(`src/js/index.js imported ${x} from ./test varialbe num is ${num}`);

import store from './modules/redux/store';
import { weatherAdded, coronaAdded } from './modules/redux/actions';

// Exchange Rate module
import ExchangeRate from './modules/MyModules/ExchangeRates/ExchangeRates';



// Weather module
import Weather from './modules/MyModules/Weather/Weather';
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
import Carousel from './modules/MyModules/Carousel/Carousel.js'; 

// Corona Data
// whenever data is received, we need it into the store
// then update Nav component 

// 1) connect store to Corona
import CoronaCases from './modules/MyModules/CoronaCases/CoronaCases';
console.log(`Created CoronaCases instance √`); 

CoronaCases.init(cases => {
    store.dispatch(
        coronaAdded({
            cases
        })
    );
    CoronaCases.initEvents();
});

















