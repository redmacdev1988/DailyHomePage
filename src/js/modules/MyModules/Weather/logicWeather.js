


function logicWeather(data) {
    return {
        degreeInCelcius: Math.round(parseFloat(data.main.temp)-273.15),
        degreeInFahrenheit: Math.round(((parseFloat(data.main.temp)-273.15)*1.8)+32),
        weatherDescription: data.weather[0].description,
        iconURL: 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png',
        cityName: data.name
    }
}



export default logicWeather;