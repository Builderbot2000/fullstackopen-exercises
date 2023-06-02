import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/logins'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [blogsTrigger, setBlogsTrigger] = useState(false)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [messageMode, setMessageMode] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs.sort((a, b) => {
        return b.likes - a.likes
      }))
    })
  }, [blogsTrigger])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setMessageMode('success')
      setMessage(`Logged in as ${user.username}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessageMode('fail')
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.setItem('loggedUser', null)
  }

  if (user === null) {
    return (
      <div>
        <Notification message={message} mode={messageMode} />
        <p></p>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <label>
            username
            <input id='username' type="text" value={username} onChange={handleUsernameChange} />
          </label>
          <p></p>
          <label>
            password
            <input id='password' type="text" value={password} onChange={handlePasswordChange} />
          </label>
          <p></p>
          <input id='login-button' type="submit" value="login" />
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p></p>
      <Notification message={message} mode={messageMode} />
      <p></p>
      {user.username} logged in
      <button onClick={handleLogout}>logout</button>
      <p></p>
      <BlogForm
        user={user}
        setMessageMode={setMessageMode}
        setMessage={setMessage}
        blogsTrigger={blogsTrigger}
        setBlogsTrigger={setBlogsTrigger}
      />
      <p></p>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          blogsTrigger={blogsTrigger}
          setBlogsTrigger={setBlogsTrigger}
        />
      )}
    </div>
  )
}

export default App