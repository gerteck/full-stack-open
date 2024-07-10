import { useEffect, useState } from 'react';

import CountryApi from './services/CountryApi';
import CountryList from './CountryList';
import Filter from './Filter';

function App() {

  const [allCountries, setAllCountries] = useState([]);
  const [nameFilter, setNameFilter] = useState('');

  // Fetch all countries
  useEffect(() => {
    CountryApi.getAllCountries()
      .then(countries => {
        setAllCountries(countries);
      });
  }, []);

  const onFilterChange = (event) => {
    setNameFilter(event.target.value.toLowerCase());
  };


  return (
    <>
      <Filter filterValue={nameFilter} onChange={onFilterChange}/>
      <CountryList allCountries={allCountries} nameFilter={nameFilter}/>
    </>
  )
}

export default App
