import {
    BrowserRouter as Router,
    Routes, Route, Link
} from 'react-router-dom'

import About from './About'
import AnecdoteList from './AnecdoteList'
import CreateAnecdote from './CreateAnecdote'
import AnecdoteEntry from './AnecdoteEntry'

const Menu = ({ anecdotes, addNew, setNotification }) => {
    const padding = {
        paddingRight: 5
    }
    return (
        <Router>
            <div>
                <Link style={padding} to="/">anecdotes</Link>
                <Link style={padding} to="/create">create new</Link>
                <Link style={padding} to="/about">about</Link>
            </div>
            <Routes>
                <Route path="/anecdotes/:id" element={<AnecdoteEntry anecdotes={anecdotes} />} />
                <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
                <Route path="/create" element={<CreateAnecdote addNew={addNew} setNotification={setNotification} />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    )
}

export default Menu