import { useState } from 'react'
import axios from 'axios'

const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
  
    const create = (resource) => {
      axios.post(baseUrl, resource)
      .then(response => {
        setResources(resources.concat(resource))
        return response
    })
      .catch(error => console.log(error))
    }
  
    const service = {
      create
    }
  
    return [
      resources, service
    ]
  }

export default useResource