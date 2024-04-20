import React from 'react'
import { useParams } from 'react-router-native'

function SinglePage() {
    let { id } = useParams()
    console.log(id)
  return (
    <div>SinglePage</div>
  )
}

export default SinglePage