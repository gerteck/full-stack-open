const Persons = ({persons, nameFilter}) => {

    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(nameFilter));

    return (
    <>
        {filteredPersons.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
    </>
    )
}

export default Persons;