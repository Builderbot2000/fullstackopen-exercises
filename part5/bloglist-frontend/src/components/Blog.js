import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, blogsTrigger, setBlogsTrigger, mockLike }) => {

  const [visible, setVisible] = useState(false)
  const [buttonLabel, setButtonLabel] = useState('view')

  const showWhenVisible = { display: visible ? '' : 'none' }

  const handleView = () => {
    // console.log(blog)
    // console.log(user)
    setVisible(!visible)
    setButtonLabel(visible ? 'view' : 'hide')
  }

  const handleLike = mockLike ? mockLike : () => {
    blogService.increaseLike({ blog, user })
    setBlogsTrigger(!blogsTrigger)
  }

  const handleRemove = async () => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    await blogService.remove({ blog, user })
    setBlogsTrigger(!blogsTrigger)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (user.username === blog.user.username)
    return (
      <div id={blog.title} className='blog' style={blogStyle}>
        <div className='blog-basic-info'>
          {blog.title} {blog.author} <button onClick={handleView}>{buttonLabel}</button>
        </div>
        <div style={showWhenVisible} className='blog-details'>
          {blog.url}
          <br></br>
          {blog.likes} <button id='like-button' className='like-button' onClick={handleLike}>like</button>
          <br></br>
          {blog.user ? blog.user.username : ''}
          <br></br>
          <button id='delete-button' onClick={handleRemove}>remove</button>
        </div>
      </div>
    )
  else return (
    <div id={blog.title} className='blog' style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={handleView}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {blog.url}
        <br></br>
        {blog.likes} <button onClick={handleLike}>like</button>
        <br></br>
        {blog.user ? blog.user.username : ''}
      </div>
    </div>
  )
}

export default Blog