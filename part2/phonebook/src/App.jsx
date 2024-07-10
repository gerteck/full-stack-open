import { useState, useEffect } from 'react';
import Persons from './Persons';
import PersonForm from './PersonForm';
import Filter from './Filter';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: ''
  });

  useEffect(() => {
    personService.getAll().then(allPersons => setPersons(allPersons));
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

    personService.create(newPerson)
    .then(person => {
        setPersons(persons.concat(person));
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