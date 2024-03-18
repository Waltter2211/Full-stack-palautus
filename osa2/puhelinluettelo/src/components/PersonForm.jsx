import React from 'react'

const PersonForm = ({ handleNameInput, handleNumberInput, onSubmit }) => {
  return (
    <div>
        <form>
            <div>
                name: <input onChange={handleNameInput} /> <br />
                number: <input onChange={handleNumberInput} />
            </div>
            <div>
                <button type="submit" onClick={onSubmit}>add</button>
            </div>
      </form>
    </div>
  )
}

export default PersonForm