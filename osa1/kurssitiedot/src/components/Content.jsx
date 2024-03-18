import React from 'react'
import Part from './Part'

function Content({ parts }) {
  return (
    <div>
        {parts.map((part) => {
            return <Part key={part.id} part={part} />
        })}
    </div>
  )
}

export default Content