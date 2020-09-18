const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const MSG_POOL = []
const app = express()
const port = process.env.PORT || 3000

app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, 'index.html')))
app.get('/timeline', (req, res) => res.sendFile(path.resolve(__dirname, 'timeline.html')))

app.get('/msg', (req, res) => {
  let {offset = 0, limit = 20} = req.query
  offset = parseInt(offset)
  limit = parseInt(limit)
  const meta = {
    limit,
    offset: offset >= MSG_POOL.length ? MSG_POOL.length : offset,
    total_count: MSG_POOL.length,
  }
  const body = MSG_POOL.slice(offset, offset + limit)
  return res.json({meta, body})
})

app.post('/add-msg', (req, res) => {
  const {msg} = req.body
  if (msg) {
    if (Array.isArray(msg)) {
      msg.forEach(item => {
        MSG_POOL.unshift({id: MSG_POOL.length, msg: item})
      })
    } else {
      MSG_POOL.unshift({id: MSG_POOL.length, msg})
    }
    res.sendStatus(201)
  } else {
    res.sendStatus(400)
  }
})

app.listen(port, err => {
  if (err) return console.error(`Got error ${err}`)
  console.log(`Server is listening on ${port}...`)
})