import React from 'react'
import Part from './Part'

function Content({ parts }) {

    const exercisesArr = parts.map((part) => {
        return part.exercises
    })

    const total = exercisesArr.reduce((acc, curr) => {
        return acc + curr
    })

  return (
    <div>
        {parts.map((part) => {
            return <Part key={part.id} part={part} />
        })}
        <h4>total of {total} exercises</h4>
    </div>
  )
}

export default Content