import x from './test'
const num = 23;
console.log(`src/js/index.js imported ${x} from ./test varialbe num is ${num}`);

import store from './modules/redux/store';
import { weatherAdded, coronaAdded, newsAdded } from './modules/redux/actions';

import fetchWeather from './modules/MyModules/Weather/fetchWeather';
import logicWeather from './modules/MyModules/Weather/logicWeather';

// News module
import News from './modules/MyModules/News/index';
News.init();

// Exchange Rate module
import ExchangeRate from './modules/MyModules/ExchangeRates/ExchangeRates';

// Weather module
import Weather from './modules/MyModules/Weather/Weather';

export const weather = new Weather(fetchWeather, logicWeather, data => {
    console.log('data', data);
    store.dispatch(
        weatherAdded({
            iconURL: data.iconURL,
            cityName: data.cityName,
            degreeInCelcius: data.degreeInCelcius,
            description: data.weatherDescription
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

















