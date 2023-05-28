import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/logins'

const successCSS = {
  color: 'green',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}

const failCSS = {
  color: 'red',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}

const Notification = ({message, mode}) => {
  if (message == null) return null
  if (mode == null) return (<div className='notification'>{message}</div>)
  if (mode === 'success') return <div style={successCSS}>{message}</div>
  if (mode === 'fail') return <div style={failCSS}>{message}</div>
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [messageMode, setMessageMode] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

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
    } catch (exception) {
      setMessageMode('fail')
      setMessage("wrong username or password")
    }
  }

  const handleLogout = (event) => {
    setUser(null)
    window.localStorage.setItem('loggedUser', null)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    try {
      const res = await blogService.createNew({
        title, author, url, user
      })
      setTitle('')
      setAuthor('')
      setUrl('')
      console.log(res)
      setMessageMode('success')
      setMessage(`a new blog ${res.title} by ${res.author} added`)
    } catch (exception) {
      setMessageMode('fail')
      setMessage("new blog creation failed")
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification message={message} mode={messageMode}/>
        <p></p>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
        <label>
          username
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <p></p>
        <label>
          password
          <input type="text" value={password} onChange={handlePasswordChange} />
        </label>
        <p></p>
        <input type="submit" value="login" />
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p></p>
      <Notification message={message} mode={messageMode}/>
      <p></p>
      {user.username} logged in
      <button onClick={handleLogout}>logout</button>
      <p></p>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <label>
          title
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <p></p>
        <label>
          author
          <input type="text" value={author} onChange={handleAuthorChange} />
        </label>
        <p></p>
        <label>
          url
          <input type="text" value={url} onChange={handleUrlChange} />
        </label>
        <p></p>
        <input type="submit" value="create" />
        </form>
      <p></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App