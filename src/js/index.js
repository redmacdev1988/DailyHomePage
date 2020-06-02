// Global app controller

import x from './test'
const num = 23;
console.log(`src/js/index.js imported ${x} from ./test varialbe num is ${num}`);
/*
import store from './store';
import * as actions from './actionTypes';
import { questionAdded, questionAnswer } from './actions';
*/
console.log("Hello World!"); 

import store from './modules/redux/store';
import { weatherAdded } from './modules/redux/actions';
import Weather from './modules/Weather';

const unsubscribe = store.subscribe( () => {
    console.log('store changed!', store.getState());
});

// get Weather data and put it into the store
Weather.fetchWeatherData(function() {
    
    store.dispatch(
        weatherAdded({
            iconURL: Weather.iconURL,
            cityName: Weather.cityName,
            degreeInCelcius: Weather.degreeInCelcius,
            description: Weather.weatherDescription
        })
    );

    let { state } = store.getState().weatherReducer;
    var img = document.createElement('img'); 
    img.src =  state.iconURL;
    img.style = 'vertical-align: middle';
    img.title = state.description;
    
    document.getElementById('weather').appendChild(img);
    document.getElementById('temp').innerHTML = state.degreeInCelcius + '&deg;';
    document.getElementById('location').innerHTML = state.cityName;
});













