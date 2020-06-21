
class Weather {

    // dependency inject fetch data, business logic
    constructor(fetchData, logicWeather, callback) {   
        fetchData(data => {
            callback(logicWeather(data));
        });
    } // constructor

    // store dispatch -> middleware will call this
     render = payload => {
        let state = payload;
        if (!document.querySelector('#weatherIcon')) {
            var img = document.createElement('img'); 
            img.id = 'weatherIcon';
            img.src =  state.iconURL;
            img.style = 'vertical-align: middle';
            img.title = state.description;
            document.getElementById('weather').appendChild(img);
        }
        document.getElementById('temp').innerHTML = state.degreeInCelcius + '&deg;';
        document.getElementById('location').innerHTML = state.cityName;
    }
}  
          
export default Weather;