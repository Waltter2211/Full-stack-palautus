import React from 'react'
import Part from './Part'

const Content = ({ parts }) => {

    const exercisesArr = parts.map(part => part.exercises)
    const total = exercisesArr.reduce((acc, curr) => acc + curr)

  return (
    <div>
        {parts.map(part => <Part key={part.id} part={part} />)}
        <h4>total of {total} exercises</h4>
    </div>
  )
}

export default Content