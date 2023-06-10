import { useReducer } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, createAnecdote, updatedAnecdote } from './requests/requests'
import AnecdoteContext from './AnecdoteContext'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const anecdoteReducer = (state, action) => {
  switch (action.type) {
    case "VOTE":
      return 'anecdote ' + action.payload + ' voted'
    case "ADD":
      return 'anecdote ' + action.payload + ' added'
    case "BAD_REQUEST":
      return 'too short anecdote, must have length 5 or more'
    case "CLEAR":
      return ''
    default:
      return state
  }
}

const App = () => {

  const [message, messageDispatch] = useReducer(anecdoteReducer, '')

  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation(updatedAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    },
    onError: () => {
      messageDispatch({ type: 'BAD_REQUEST' })
    }
  })

  const result = useQuery(
    'anecdotes',
    getAnecdotes,
    {
      retry: false
    }
  )
  console.log(result)

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const handleVote = (anecdote) => {
    messageDispatch({ type: 'VOTE', payload: anecdote.content })
    setTimeout(() => {
      messageDispatch({ type: 'CLEAR' })
    }, 5000)
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    console.log('vote')
  }

  const anecdotes = result.data

  return (
    <AnecdoteContext.Provider value={[message, messageDispatch]}>
      <div>
        <h3>Anecdote app</h3>

        <Notification />
        <AnecdoteForm newAnecdoteMutation={newAnecdoteMutation} />

        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
    </AnecdoteContext.Provider>
  )
}

export default App
