import React from 'react'

const PersonForm = ({ handleNameInput, handleNumberInput, onSubmit, newName, newNumber }) => {
  return (
    <div>
        <form>
            <div>
                name: <input onChange={handleNameInput} value={newName} /> <br />
                number: <input onChange={handleNumberInput} value={newNumber} />
            </div>
            <div>
                <button type="submit" onClick={onSubmit}>add</button>
            </div>
      </form>
    </div>
  )
}

export default PersonForm