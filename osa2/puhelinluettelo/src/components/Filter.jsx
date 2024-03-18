import React from 'react'

const Filter = ({ handleSearchInput }) => {
  return (
    <div>filter shown with: <input onChange={handleSearchInput} /></div>
  )
}

export default Filter