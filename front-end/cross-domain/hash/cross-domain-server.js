const express = require('express')
const path = require('path')
const app = express()
const PORT = 4000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'cross-domain.html'))
})

app.listen(PORT, err => {
  if (err) return console.error('Got error: ', err)
  console.log(`server is listening on ${PORT}`)
})
