import { useState, useEffect } from 'react';
import Persons from './Persons';
import PersonForm from './PersonForm';
import Filter from './Filter';
import personService from './services/persons';
import Notification from './Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: ''
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
      const confirmMessage = `${newPerson.name} is already added to phonebook, replace the old number with a new one?`;
      if (window.confirm(confirmMessage)) {
        const existingPerson = persons.find(person => person.name === newPerson.name);
        updatePerson(existingPerson.id, newPerson);
      }
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
        setSuccessMessage(
          `Note '${newPerson.name}' has been added!`
        );
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000);
      });
  };

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id));
      });
    }
  };

  const updatePerson = (id, newPerson) => {
    personService.update(id, newPerson)
    .then(person => {
      setPersons(persons.map(p => p.id !== id ? p : person));
      setNewPerson({
        name: '',
        number: ''
      });
    }).catch(error => {
      console.log(error);
      setErrorMessage(
        `Information of '${newPerson.name}' has already been removed from server`
      );
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    });
  };

  const onFilterChange = (event) => {
    setNameFilter(event.target.value.toLowerCase());
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage}/>
      <Notification message={errorMessage} isError={true}/>
      <Filter filterValue={nameFilter} onChange={onFilterChange}/>
      <h2>Add a new Person</h2>
      <PersonForm onFormSubmit={addPerson} newPerson={newPerson} setNewPerson={setNewPerson}/>
      <h2>Numbers</h2>
      <Persons persons={persons} nameFilter={nameFilter} deletePerson={deletePerson}/>
    </div>
  )
}

export default App