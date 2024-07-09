import { useState } from 'react';
import Persons from './Persons';
import PersonForm from './PersonForm';
import Filter from './Filter';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [nameFilter, setNameFilter] = useState('');
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: ''
  });

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

    setPersons(persons.concat(newPerson));
    setNewPerson({
      name: '',
      number: ''
    })
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