const PersonForm = ({newPerson, setNewPerson, onFormSubmit}) => {
    return (
    <>
        <form onSubmit={onFormSubmit}>
            <div>
            name: <input value={newPerson.name} onChange={e => setNewPerson(prev => ({...prev, name: e.target.value}))}/>
            </div>
            <div>
            number: <input value={newPerson.number} onChange={e => setNewPerson(prev => ({...prev, number: e.target.value}))}/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    </>
 )
}

export default PersonForm;