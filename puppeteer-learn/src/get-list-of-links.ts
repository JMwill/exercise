import * as puppeteer from 'puppeteer'
import {join} from 'path'

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  })
  const page = await browser.newPage()

  await page.tracing.start({path: join(__dirname, '../assets/trace.json'), categories: ['devtools.timeline']})
  await page.goto('https://news.ycombinator.com/news')

  const stories = await page.$$eval('a.storylink', anchors => anchors.map(anchor => anchor.textContent).slice(0, 10))
  console.log(stories)
  await page.tracing.stop()
  await browser.close()
})()