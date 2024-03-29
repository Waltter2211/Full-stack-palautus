import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAnecdotes = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const addAnecdote = async (anecdoteText) => {
    const anecdote = {content: anecdoteText, id: Math.floor(Math.random()*1000), votes: 0}
    const response = await axios.post(baseUrl, anecdote)
    return response.data
}

export default { getAnecdotes, addAnecdote }