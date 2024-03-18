import React from 'react'

function Part({ part }) {
    console.log("propsit",part)
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

export default Part