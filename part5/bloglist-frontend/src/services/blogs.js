import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async ({ title, author, url, user }) => {
  const newBlog = {
    title: title,
    author: author,
    url: url
  }
  const config = {
    headers: { Authorization: `Bearer ${user.token}` }
  }
  try {
    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}

const increaseLike = async ({ blog, user }) => {
  const newBlog = {
    id: blog.id,
    user: blog.user.id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1
  }
  const config = {
    headers: { Authorization: `Bearer ${user.token}` }
  }
  try {
    const response = await axios.put(`${baseUrl}/${blog.id}`, newBlog, config)
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}

const remove = async ({ blog, user }) => {
  const config = {
    headers: { Authorization: `Bearer ${user.token}` }
  }
  try {
    const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}

export default { getAll, createNew, increaseLike, remove }