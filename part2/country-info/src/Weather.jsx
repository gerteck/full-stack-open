import {useState, useEffect} from 'react';
import WeatherApi from './services/WeatherApi';

const Weather = ({country}) => {

    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const lat = country.capitalInfo.latlng[0];
        const lon = country.capitalInfo.latlng[1];
        WeatherApi.getWeatherData(lat, lon)
            .then(data => {setWeatherData(data);});
    }, [country]);
    
    if (weatherData === null) {
        return (
            <>
                <h2>Weather in {country.capital[0]}</h2>
                <p>Loading weather data...</p>
            </>
        )
    }

    else return (
        <>
            <h2>Weather in {country.capital[0]}</h2>
            <p>temperature: {weatherData.main.temp} °C</p>
            <p>weather: {weatherData.weather[0].main}, {' '}
                {weatherData.weather[0].description}</p>
        </>
    )
}

export default Weather;