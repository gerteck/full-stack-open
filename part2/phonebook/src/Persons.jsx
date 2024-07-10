const Persons = ({persons, nameFilter, deletePerson}) => {

    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(nameFilter));

    return (
    <>
        {filteredPersons
            .map(person => 
                <div key={person.name}>
                    {person.name} {person.number} 
                    <button onClick={() => deletePerson(person.id)} style={{marginLeft: 5}}>
                        delete
                    </button>
                </div>
            )
        }
    </>
    )
}

export default Persons;