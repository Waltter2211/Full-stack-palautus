import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchText, setSearchText] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`) === true) {
      personService.deleteOne(id)
      setNotificationMessage(
        `Person '${name}' was removed from server`
      )
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
      const personsNew = persons.filter(person => person.id !== id)
      setPersons(personsNew)
    }
  }

  const searchList = persons.filter(({ name, number }) =>
    name.toLowerCase().includes(searchText.toLowerCase()) || number.toLowerCase().includes(searchText.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={notificationMessage} />
        <Filter persons={persons} searchText={searchText} setSearchText={setSearchText} />
        <PersonForm persons={persons} setPersons={setPersons} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} setNotificationMessage={setNotificationMessage} />
      <h2>Numbers</h2>
        <Persons searchList={searchList} deletePerson={deletePerson} />
    </div>
  )
}

export default App
