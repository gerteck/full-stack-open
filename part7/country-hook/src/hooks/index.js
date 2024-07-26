import axios from 'axios';
import { useState, useEffect } from 'react';
const baseURL = 'https://studies.cs.helsinki.fi/restcountries/';

export const useField = (type) => {
    const [value, setValue] = useState('');

    const onChange = (event) => {
        setValue(event.target.value);
    };

    const reset = () => {
        setValue('');
    };

    return {
        type,
        value,
        onChange,
        reset,
    };
};

export const useCountry = () => {
    const [country, setCountry] = useState(null);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        if (searchValue == '') {
            setCountry(null);
            return;
        };

        axios
            .get(`${baseURL}api/name/${searchValue}`)
            .then((response) => {
                setCountry({ found: true, data: response.data });
                // console.log("country", country);
            })
            .catch((error) => {
                setCountry({ found: false });
            });
    }, [searchValue]);

    return { country, setSearchValue };
};

export const useCountryWithName = (name) => {
    const [country, setCountry] = useState(null);

    useEffect(() => {
        if (name == '') {
            setCountry(null);
            return;
        };

        axios
            .get(`${baseURL}api/name/${name}`)
            .then((response) => {
                setCountry({ found: true, data: response.data });
            })
            .catch((error) => {
                setCountry({ found: false });
            });
    }, [name]);

    return country;
};