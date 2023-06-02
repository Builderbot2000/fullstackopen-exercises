import axios from 'axios'
const baseUrl = '/api/login'

const login = async ({ username, password }) => {
  const loginUser = {
    username: username,
    password: password
  }
  try {
    const response = await axios.post(baseUrl, loginUser)
    return response.data
  } catch (error) {
    console.log('Login Error!')
    throw new Error(error)
  }
}

export default { login }