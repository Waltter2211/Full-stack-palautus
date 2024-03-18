import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import numberService from './services/numbers'

const App = () => {
  const [persons, setPersons] = useState([]) 
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
      const newPersonObj = {
        name: newName,
        number: newNumber
      }
      numberService.addNumber(newPersonObj)
      .then((data) => {
        setPersons(persons.concat(newPersonObj))
        setNewName('')
        setNewNumber('')
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }

  const handleDelete = (id) => {
    const foundPerson = persons.find((person) => person.id === id)
    if (confirm(`Delete ${foundPerson.name}`)) {
      numberService.deleteNumber(id)
      .then((data) => {
        const filteredArr = persons.filter((person) => {
          return person.id !== id
        })
        setPersons(filteredArr)
      })
      .catch((err) => {console.log(err)})
    }
  }

  useEffect(() => {
    numberService.getNumbers()
    .then((data) => {
      setPersons(data)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearchInput={handleSearchInput} />
      <PersonForm handleNameInput={handleNameInput} newName={newName} handleNumberInput={handleNumberInput} newNumber={newNumber} onSubmit={onSubmit} />
      <h3>Numbers</h3>
      <Persons persons={persons} handleDelete={handleDelete} />
    </div>
  )

}

export default App
