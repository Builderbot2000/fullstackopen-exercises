import { useContext } from "react"
import AnecdoteContext from "../AnecdoteContext"

const AnecdoteForm = ({ newAnecdoteMutation }) => {

  const messageDispatch = useContext(AnecdoteContext)[1]
  const getId = () => (100000 * Math.random()).toFixed(0)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, id: getId(), votes: 0})
    messageDispatch({ type: 'ADD', payload: content })
    setTimeout(() => {
      messageDispatch({ type: 'CLEAR' })
    }, 5000)
    console.log('new anecdote')
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
