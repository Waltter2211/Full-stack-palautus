import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import numberService from './services/numbers'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState({
    type: "",
    text: ""
  })

  const showNotification = (type, text) => {
    setNotification({type, text})
    setTimeout(() => {
      setNotification({style:"", text:""})
    }, 5000)
  }

  const handleNameInput = event => setNewName(event.target.value)
  const handleNumberInput = event => setNewNumber(event.target.value)
  const handleSearchInput = event => {
    const regex = new RegExp(event.target.value, 'i')
    const filteredNames = persons.filter(person => person.name.match(regex))
    setPersons(filteredNames)
  }

  const onSubmit = event => {
    event.preventDefault()
    const newPersonObj = {
      name: newName,
      number: newNumber
    }
    /* console.log(newPersonObj) */
    const names = persons.map(person => person.name)
    if (names.includes(newName)) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const foundPerson = persons.find(person => person.name === newName)
        const updatedPerson = { ...foundPerson, number: newNumber }
        numberService.updateNumber(foundPerson.id, updatedPerson)
        .then((data) => {
          numberService.getNumbers()
          .then((data) => {
            setPersons(data)
            setNewName('')
            setNewNumber('')
            showNotification("message", `Updated ${updatedPerson.name}`)
          })
          .catch((err) => {
            console.log(err)
          })
        })
        .catch((err) => {
          console.log(err)
          showNotification("error", "Error while updating number")
        })
      }
    }
    else {
      numberService.addNumber(newPersonObj)
      .then((data) => {
        setPersons(persons.concat(newPersonObj))
        setNewName('')
        setNewNumber('')
        numberService.getNumbers()
          .then((data) => {
            setPersons(data)
            showNotification("message", `Added ${newName}`)
          })
          .catch((err) => {
            console.log(err)
            showNotification("error", "Error updating number")
          })
        })
      .catch((err) => {
        console.log(err)
        showNotification("error", "Error adding number")
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
        showNotification("message", "Successfully deleted number")
      })
      .catch((err) => {
        console.log(err)
        showNotification("error", "Error deleting number")
      })
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
      <Notification style={notification.type} text={notification.text} />
      <Filter handleSearchInput={handleSearchInput} />
      <PersonForm handleNameInput={handleNameInput} newName={newName} handleNumberInput={handleNumberInput} newNumber={newNumber} onSubmit={onSubmit} />
      <h3>Numbers</h3>
      <Persons persons={persons} handleDelete={handleDelete} />
    </div>
  )

}

export default App
