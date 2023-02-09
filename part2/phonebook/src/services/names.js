import axios from "axios";
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }
  
  const create = newPersons => {
    const request = axios.post(baseUrl, newPersons)
    return request.then(response => response.data)
  }

  const update = (id, newPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, newPerson)
    return request.then(response => response.data)
  }

  const deleteRecord = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
  }

export default { getAll, create, update, deleteRecord }