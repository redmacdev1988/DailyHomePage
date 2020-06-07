import store from './redux/store';
import { weatherAdded } from './redux/actions';

const WEATHER_LOCATION_STRING = 'Shenzhen,China';
const WEATHER_API =  'https://api.openweathermap.org/data/2.5/weather?q=';
const OPEN_WEATHER_MAP_KEY = '8fa0a05a6027cc756610f184b1677e8a';
 
let _privateProps = new WeakMap(); 

class Weather {
    constructor(weatherURL, place='Shenzhen,China', apiKey) {   

        this.store = null;

        _privateProps.set(this, {
            key: apiKey,
            updateWeatherUI: (data, callback) => {
                this.degreeInCelcius = Math.round(parseFloat(data.main.temp)-273.15);
                this.degreeInFahrenheit = Math.round(((parseFloat(data.main.temp)-273.15)*1.8)+32); 
                this.weatherDescription = data.weather[0].description;
                this.iconURL = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
                this.cityName = data.name;
                callback();
            }
        });

        this.render = (payload) => {
            console.log("------> WEATHER RENDER");

            let state = payload;
            if (!document.querySelector('#weatherIcon')) {
                console.log('weather icon does not exist, lets makeone');
                var img = document.createElement('img'); 
                img.id = 'weatherIcon';
                img.src =  state.iconURL;
                img.style = 'vertical-align: middle';
                img.title = state.description;
                document.getElementById('weather').appendChild(img);
            }
            console.log('wather icon already exists, dont do anhything');
            document.getElementById('temp').innerHTML = state.degreeInCelcius + '&deg;';
            document.getElementById('location').innerHTML = state.cityName;
        }

        // public properties
        this.url = weatherURL; 
        this.place = place;
        this.fetchURL = this.url + this.place + '&appid=' + _privateProps.get(this).key;
        this.iconURL='';
        this.weatherDescription='';
        this.degreeInCelcius = '';
        this.degreeInFahrenheit = '';
        this.cityName = '';
    } // constructor

    
    // prototype functions
    fetchWeatherData = callback => {
      fetch(this.fetchURL)  
      .then(resp => resp.json())
      .then(data =>  _privateProps.get(this).updateWeatherUI(data, callback))
      .catch(function() {}); 
    }
}  
          
let w = new Weather(WEATHER_API, WEATHER_LOCATION_STRING, OPEN_WEATHER_MAP_KEY);
console.log(`Created Weather instance √`);
export default w;