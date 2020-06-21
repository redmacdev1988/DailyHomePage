
const WEATHER_LOCATION_STRING = 'Shenzhen,China';
const WEATHER_API =  'https://api.openweathermap.org/data/2.5/weather?q=';
const OPEN_WEATHER_MAP_KEY = '8fa0a05a6027cc756610f184b1677e8a';

let fetchURL = WEATHER_API + WEATHER_LOCATION_STRING + '&appid=' + OPEN_WEATHER_MAP_KEY;

function fetchWeather(callback) {
    fetch(fetchURL)  
    .then(resp => resp.json())
    .then(data =>  {
        callback(data);
    })
    .catch(function() {}); 
}

export default fetchWeather;