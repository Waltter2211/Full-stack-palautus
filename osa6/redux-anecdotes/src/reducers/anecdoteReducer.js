import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes.js'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const anecdote = state.find(a => a.id === action.payload.id)
      const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
      return (
        state.map((anecdote) => anecdote.id !== updatedAnecdote.id 
        ? anecdote 
        : updatedAnecdote).sort((stateA, stateB) => stateB.votes - stateA.votes)
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAnecdotes()
    anecdotes.sort((anecdoteA, anecdoteB) => anecdoteB.votes - anecdoteA.votes)
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.addAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateAnecdote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateAnecdote(anecdote)
    dispatch(voteAnecdote(updatedAnecdote))
  }
}
export default anecdoteSlice.reducer