const express = require('express')
const app = express()

const LOCAL_PORT = 3001

// Heroku dynamically sets a port
const PORT = process.env.PORT || LOCAL_PORT

app.use(express.static('dist'))

app.get('/health', (req, res) => {
  res.send('ok')
})

app.get('/version', (req, res) => {
  res.send('1.2') // change this string to ensure a new version deployed
})

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server started on port ${LOCAL_PORT}`)
})
