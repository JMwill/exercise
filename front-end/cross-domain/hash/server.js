const express = require('express')
const path = require('path')
const app = express()
const PORT =3000

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))

app.get('/b', (req, res) => res.sendFile(path.join(__dirname, 'index-b.html')))

app.listen(PORT, err => {
  if (err) return console.error('Got error: ', err)
  console.log(`server is listening on ${PORT}`)
})
