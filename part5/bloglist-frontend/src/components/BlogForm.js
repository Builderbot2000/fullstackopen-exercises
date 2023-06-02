import { useState, useRef } from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const BlogForm = ({ user, setMessageMode, setMessage, blogsTrigger, setBlogsTrigger, mockCreate }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogFormRef = useRef()

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
    if (mockCreate) {
      mockCreate({ title, author, url, user })
      return
    }
    try {
      const res = await blogService.createNew({
        title, author, url, user
      })
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessageMode('success')
      setMessage(`a new blog ${res.title} by ${res.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      blogFormRef.current.toggleVisibility()
      setBlogsTrigger(!blogsTrigger)
    } catch (exception) {
      console.log(exception)
      setMessageMode('fail')
      setMessage('new blog creation failed')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <Togglable buttonLabel={'new note'} ref={blogFormRef}>
        <h2>create new</h2>
        <form onSubmit={handleCreateBlog}>
          <label>
                        title
            <input id="title" type="text" value={title} onChange={handleTitleChange} placeholder='enter title'/>
          </label>
          <p></p>
          <label>
                        author
            <input id="author" type="text" value={author} onChange={handleAuthorChange} placeholder='enter author'/>
          </label>
          <p></p>
          <label>
                        url
            <input id="url" type="text" value={url} onChange={handleUrlChange} placeholder='enter url'/>
          </label>
          <p></p>
          <input id="create-button" type="submit" value="create" className='new-blog-submit-button'/>
        </form>
      </Togglable>
    </div>
  )
}

export default BlogForm