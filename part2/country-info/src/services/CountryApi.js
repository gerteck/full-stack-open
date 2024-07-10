import axios from 'axios';
const baseURL = 'https://studies.cs.helsinki.fi/restcountries/';
const allCountriesEndpoint = 'api/all';

const getAllCountries = () => {
    return axios.get(baseURL + allCountriesEndpoint)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error(error);
        });
};

const getCountry = (name) => {
    return axios.get(baseURL + 'api/name/' + name)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error(error);
        });
};

export default { getAllCountries, getCountry };
