import personService from "../services/persons"

const PersonForm = ({persons, newName, newNumber, setPersons, setNewName, setNewNumber, setNotificationMessage}) => {
  const names = persons.map(person => (
    person.name
  ))
    
  const numbers = persons.map(person => (
    person.number
  ))
    
  const addName = (event, name) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    
    if (names.includes(newName) === false && numbers.includes(newNumber) === false && newName !== '' && newNumber !== '') {
      personService
      .create(personObject)
      .then(response => {
        setNotificationMessage(
          `Person '${newName}' was added to server`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
    }
    
    if (names.includes(newName) || numbers.includes(newNumber)) {
      alert(`${newName} or ${newNumber} is already added to phonebook`)
    }
        
    else if (newName === '' || newNumber === ''){
      alert('add something')
    }
  }
    
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
    
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm