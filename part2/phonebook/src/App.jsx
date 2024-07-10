import { useState, useEffect } from 'react';
import axios from 'axios';
import Persons from './Persons';
import PersonForm from './PersonForm';
import Filter from './Filter';

const serverEndpoint = 'http://localhost:3001/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: ''
  });

  useEffect(() => {
    axios
      .get(serverEndpoint)
      .then(response => setPersons(response.data));
  }, []);


  const addPerson = (event) => {
    event.preventDefault();
    if (newPerson.name === '' || newPerson.number === '') {
      alert(`Input fields cannot be empty`);
      return;
    }

    // newNumber can only have digits and dashes
    if (!newPerson.number.match(/^[0-9-]+$/)) {
      alert(`Number can only have digits and dashes`);
      return;
    }

    if (persons.some(person => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`);
      return;
    }

    if (persons.some(person => person.number === newPerson.number)) {
      alert(`${newPerson.number} is already added to phonebook`);
      return;
    }

    axios.post(serverEndpoint, newPerson)
      .then(response => {
        console.log(response);
        setPersons(persons.concat(response.data));
        setNewPerson({
          name: '',
          number: ''
        });
      });
  };

  const onFilterChange = (event) => {
    setNameFilter(event.target.value.toLowerCase());
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={nameFilter} onChange={onFilterChange}/>
      <h2>Add a new Person</h2>
      <PersonForm onFormSubmit={addPerson} newPerson={newPerson} setNewPerson={setNewPerson}/>
      <h2>Numbers</h2>
      <Persons persons={persons} nameFilter={nameFilter}/>
    </div>
  )
}

export default App