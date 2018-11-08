import * as puppeteer from 'puppeteer'
import {join} from 'path'

(async () => {
  const parallel = 5
  const promises = []
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--window-size=800,500'],
  })

  for (let i = 0; i < parallel; i++) {
    console.log('Page ID Spawned', i)
    promises.push(browser.newPage().then(async page => {
      await page.setViewport({width: 1280, height: 800})
      await page.goto('https://en.wikipedia.org/wiki/' + i)
      await page.screenshot({path: join(__dirname, '../assets/wikipedia_' + i + '.png')})
    }))
  }
  await Promise.all(promises)
  await browser.close()
})()