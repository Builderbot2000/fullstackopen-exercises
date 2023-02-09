import { useState, useEffect } from 'react'
import countryinfo from './services/countryinfo'
import Countries from './components/Countries'

function App() {
  const [qname, setQName] = useState('')
  const [mode, setMode] = useState(0)
  const [info, setInfo] = useState('')
  
  useEffect(() => {
    countryinfo
      .byName(qname)
      .then(res => {
        // console.log(`Retrieved ${Object.keys(res).length}`)
        if (Object.keys(res).length > 10) {
          setMode(0)
          setInfo('Too many matches, specify another filter')
        } 
        else if (Object.keys(res).length <= 10 && Object.keys(res).length > 1) {
          setMode(1)
          setInfo(res)
        } 
        else if (Object.keys(res).length === 1) {
          setMode(2)
          setInfo(res[0])
        }
      })
      .catch(() => {
        setMode(0)
        setInfo('Country not found')
      })
  }, [qname])

  const handleFilterChange = (event) => {
    setQName(event.target.value)
  }
  
  return (
    <div>
      <p>find countries <input onChange={handleFilterChange} /></p>
      <div>
        <Countries mode={mode} info={info}/>
      </div>
    </div>
  )
}

export default App;
