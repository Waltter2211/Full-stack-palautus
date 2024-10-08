import { useState } from 'react'

const MostVotes = ({ anecdote, votes }) => {
  
  if (anecdote !== "" && votes !== 0) {
    return (
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdote}</p>
        <p>has {votes} votes</p>
      </div>
    )
  }
  else {
    return (
      <div>
        <h1>Anecdote with most votes</h1>
      </div>
    )
  }
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const pointsArray = new Uint8Array(anecdotes.length)
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(pointsArray)
  const [topAnecdote, setTopAnecdote] = useState("")

  let [votes, setVotes] = useState(0)

  return (
    <>
    <h1>Anecdote of the day</h1>
    <div>
      {anecdotes[selected]}<br />
      {points[selected]}<br />
      <button onClick={() => {
        const number = Math.floor(Math.random()*8)
        setSelected(number)
      }}>next anecdote</button>
      <button onClick={() => {
        let copy = [...points]
        copy[selected] += 1
        setPoints(copy)
        if (copy[selected] > votes) {
          setVotes(votes += 1)
          setTopAnecdote(anecdotes[selected])
        }
      }}>vote anecdote</button>
    </div>
    <MostVotes anecdote={topAnecdote} votes={votes} />
    </>
  )
}

export default App
