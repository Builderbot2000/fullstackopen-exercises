import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    addVoteToAnecdote(state, action) {
      console.log('ACTION: ', action)
      const target = state.find(anecdote => anecdote.id === action.payload)
      const newTarget = {
        ...target,
        votes: target.votes + 1
      }
      let newState = state.filter(anecdote => anecdote.id !== action.payload)
      return newState.concat(newTarget).sort((a, b) => (b.votes - a.votes))
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { appendAnecdote, addVoteToAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    anecdotes.sort((a, b) => (b.votes - a.votes))
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const changedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    const updatedAnecdote = await anecdoteService.update(changedAnecdote)
    dispatch(addVoteToAnecdote(updatedAnecdote.id))
  }
}

export default anecdoteSlice.reducer