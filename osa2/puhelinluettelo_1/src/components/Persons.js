const Persons = (props) => {
    return(
        <div>
            {props.searchList.map(person => (
                <p key={person.id}>{person.name} {person.number} <button onClick={() => props.deletePerson(person.id, person.name)}>delete</button></p>
            ))}
        </div>
    )
    
}

export default Persons