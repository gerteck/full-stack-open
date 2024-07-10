import axios from 'axios';

// See documentation at https://openweathermap.org/current

const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
const units = 'metric';

const getWeatherData = (lat, lon) => {
    const endpoint = `${baseURL}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    const request = axios.get(endpoint);

    return request.then(response => response.data);
};

export default { getWeatherData };
