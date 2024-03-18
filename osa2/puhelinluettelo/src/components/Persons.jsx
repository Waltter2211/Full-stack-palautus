import React from 'react'

const Persons = ({ persons, handleDelete }) => {
  return (
    <div>{persons.map(person => <div key={person.name}><p>{person.name} {person.number}</p><button onClick={() => handleDelete(person.id)}>delete</button></div>)}</div>
  )
}

export default Persons