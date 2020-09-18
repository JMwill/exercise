const log = console.log.bind(console)
let fetchMeta = null

function createTimelineItem(msg) {
  const li = document.createElement('li')
  li.classList.add('timeline__item')
  li.textContent = msg
  return li
}

function fetchMsg({limit = 20, offset = 0}) {
  const req = new Request(`/msg?limit=${limit}&offset=${offset}`)
  return fetch(req).then(res => res.json())
}

function createMsg() {
  const count = document.querySelector('.create-count')
  const total = parseInt(count.value)
  if (total) {
    const req = new Request('/add-msg')
    const opt = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        msg: Array(total).fill(0).map((_, index) => `This is client generate message ${index} !`)
      }),
    }
    fetch(req, opt).then(res => log('Added!'))
  }
}

function pullOldTimelineItem() {
  const timeline = document.querySelector('.timeline')
  const meta = {
    ...fetchMeta,
    offset: fetchMeta ? parseInt(fetchMeta.limit) + parseInt(fetchMeta.offset) : 0,
  }
  fetchMsg(meta).then((result) => {
    const msgList = result.body
    msgList.forEach(i => timeline.appendChild(createTimelineItem(`Msg ID: ${i.id}: ${i.msg}`)))
    fetchMeta = result.meta
  })
}

function pullNewTimelineItem() {
  const timeline = document.querySelector('.timeline')
  timeline.innerHTML = ''
  const meta = {
    limit: 20,
    offset: 0,
  }
  fetchMsg(meta).then((result) => {
    const msgList = result.body.slice().reverse()
    msgList.forEach(i => timeline.prepend(createTimelineItem(`Msg ID: ${i.id}: ${i.msg}`)))
    fetchMeta = result.meta
  })
}

function main() {
  const pullOldBtn = document.querySelector('.pull-old-btn')
  pullOldBtn.addEventListener('click', pullOldTimelineItem)

  const pullNewBtn = document.querySelector('.pull-new-btn')
  pullNewBtn.addEventListener('click', pullNewTimelineItem)

  const createBtn = document.querySelector('.create-btn')
  createBtn.addEventListener('click', createMsg)
}

window.addEventListener('DOMContentLoaded', main)
