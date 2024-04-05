import React from 'react'
import { useState } from 'react'
import { EDIT_AUTHOR } from '../queries/queries'
import { useMutation } from '@apollo/client'
import { useEffect } from 'react'

function EditBook() {
    const [name, setName] = useState('')
    const [setBornTo, setSetBornTo] = useState('')
    const [ changeAuthor, result ] = useMutation(EDIT_AUTHOR)

    const handleUpdate = async (event) => {
        event.preventDefault()
        changeAuthor({ variables: { name, setBornTo } })
        setName('')
        setSetBornTo('')
    }

    /* useEffect(() => {
        if (result.data && result.data.updateAuthor === null) {
          setError('person not found')
        }
      }, [result.data]) */

  return (
    <div>
        <form onSubmit={handleUpdate}>
        <div>
          name <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
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