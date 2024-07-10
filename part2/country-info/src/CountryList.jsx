const CountryList = ({allCountries, nameFilter}) => {

    if (nameFilter === '') {
        return (
        <p>Enter a country name to search</p>
        )
    }
    const filteredCountries = allCountries.filter(c => c.name.common.toLowerCase().includes(nameFilter));
    console.log(filteredCountries);
    
    if (filteredCountries.length > 10) {
        return (
        <p>More than 10 matches, specify another filter</p>
        )
    }
        
    if (filteredCountries.length > 1) {
        return (
        <ul>
            {filteredCountries.map(country => <li key={country.area}>{country.name.common}</li>)}
        </ul>
        )
    }

    if (filteredCountries.length === 1) {
        const country = filteredCountries[0];
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

    // No countries found
    return (
        <p>No countries found</p>
    )
}

export default CountryList;