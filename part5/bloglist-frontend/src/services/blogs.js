import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async ({title, author, url, user}) => {
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

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew }