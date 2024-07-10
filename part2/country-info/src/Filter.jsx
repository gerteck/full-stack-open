const Filter = ({filterValue, onChange}) => {
 return (
    <div>Find countries <input value={filterValue} onChange={onChange}/></div>
 )
}

export default Filter;