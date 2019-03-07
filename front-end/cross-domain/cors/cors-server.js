const express = require('express')
const path = require('path')
const app = express()
const PORT = 4000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/cors-without', (req, res) => res.json({name: 'cors', content: 'CORS test content'}))

app.get('/cors', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  return res.json({name: 'cors', content: 'CORS test content'})
})

app.listen(PORT, err => {
  if (err) return console.error('Got error: ', err)
  console.log(`server is listening on ${PORT}`)
})
