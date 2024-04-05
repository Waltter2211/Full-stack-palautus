import React from 'react'
import { useState } from 'react'
import { EDIT_AUTHOR } from '../queries/queries'
import { useMutation } from '@apollo/client'
import { useEffect } from 'react'

function EditBook({ authors }) {
    const [name, setName] = useState('')
    const [setBornTo, setSetBornTo] = useState('')
    const [ changeAuthor, result ] = useMutation(EDIT_AUTHOR)

    const handleUpdate = async (event) => {
        event.preventDefault()
        changeAuthor({ variables: { name, setBornTo } })
        setName('')
        setSetBornTo('')
    }

  return (
    <div>
        <form onSubmit={handleUpdate}>
        <div>
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map((a, i) => <option key={i} value={a.name}>{a.name}</option>)}
          </select>
        </div>
        <div>
          born <input
            value={setBornTo}
            onChange={({ target }) => setSetBornTo(Number(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default EditBook