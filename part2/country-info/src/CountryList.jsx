import React, {useState} from 'react';

const CountryList = ({allCountries, nameFilter}) => {

    const filteredCountries = allCountries.filter(c => c.name.common.toLowerCase().includes(nameFilter));
    const listSize = filteredCountries.length;

    const [countryToShow, setCountryToShow] = useState(Array(listSize).fill(false));
    const toggleCountryToShow = (index) => {
        const copy = [...countryToShow];
        copy[index] = !copy[index];
        setCountryToShow(copy);
    }

    const displayCountryData = (country) => {
        return (
            <div>
                <h1>{country.name.common}</h1>
                <p>Capital: {country.capital[0]}</p>
                <p>Region: {country.region}</p>
                <p>Population: {country.population}</p>
                <h2>Languages</h2>
                {
                    Object.entries(country.languages).map(([key, value]) => {
                        return <li key={key}>{value}</li>
                    })
                }
                <h2>Country Flag</h2>
                <img src={country.flags.png} alt={`Flag of ${country.name}`} width="100px"/>
            </div>
        )
    }

    if (nameFilter === '') {
        return (
        <p>Enter a country name to search</p>
        )
    }

    if (listSize > 10) {
        return (
        <p>More than 10 matches, specify another filter</p>
        )
    }

    if (listSize > 1) {
        return (
        <>
            {filteredCountries.map((country, index) => 
                <React.Fragment key={country.cca3}>
                    <div key={country.cca3} style={{margin: 5}} >
                        {country.name.common}
                        {countryToShow[index] ?
                        <button style={{marginLeft: 5}} onClick={() => toggleCountryToShow(index)}>Hide data</button> :
                        <button style={{marginLeft: 5}} onClick={() => toggleCountryToShow(index)}>Show data</button>
                        }
                    </div>
                    {countryToShow[index]  && displayCountryData(country)}
                </React.Fragment>
            )}
        </>
        )
    }

    if (listSize === 1) {
        const country = filteredCountries[0];
        return (displayCountryData(country));
    }

    // No countries found
    return (
        <p>No countries found</p>
    )
}

export default CountryList;