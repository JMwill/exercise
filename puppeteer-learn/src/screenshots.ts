import * as puppeteer from 'puppeteer'
import {join} from 'path'

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  })
  const page = await browser.newPage()
  await page.setViewport({width: 1288, height: 800})
  await page.goto('https://www.nytimes.com/', {waitUntil: 'networkidle0'})
  await page.screenshot({path: join(__dirname, '../assets/nytimes.png'), fullPage: true})
  await browser.close()
})()