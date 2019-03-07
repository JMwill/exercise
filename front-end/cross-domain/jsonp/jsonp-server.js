const express = require('express')
const app = express()
const PORT = 3000

app.get('/', (req, res) => {
  res.send('Jsonp Server!')
})

app.get('/jsonp', (req, res) => {
  const cb = req.query.callback || ''
  if (cb) return res.jsonp({name: 'jsonp-body', content: 'jsonp test content'})
  return res.sendStatus(400)
})

app.get('/json', (req, res) => res.json({name: 'json-body', content: 'json test content'}))

app.listen(PORT, err => {
  if (err) return console.error('Got error: ', err)
  console.log(`server is listening on ${PORT}`)
})
