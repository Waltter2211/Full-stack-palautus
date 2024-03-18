import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameInput = event => setNewName(event.target.value)
  const handleNumberInput = event => setNewNumber(event.target.value)
  const handleSearchInput = event => {
    const regex = new RegExp(event.target.value, 'i')
    const filteredNames = persons.filter(person => person.name.match(regex))
    setPersons(filteredNames)
  }

  const onSubmit = event => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    if (names.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat({name: newName, number: newNumber}))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearchInput={handleSearchInput} />
      <PersonForm handleNameInput={handleNameInput} handleNumberInput={handleNumberInput} onSubmit={onSubmit} />
      <h3>Numbers</h3>
      <Persons persons={persons} />
    </div>
  )

}

export default App
