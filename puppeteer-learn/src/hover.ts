import * as puppeteer from 'puppeteer'
import {join} from 'path'

(async () => {
  const browser = await puppeteer.launch({headless: false})

  const page = await browser.newPage()
  await page.goto('https://soundcloud.com/')
  await page.hover('.playableTile__artwork')
  await page.waitFor(1000)
  await page.screenshot({path: join(__dirname, '../assets/hover.png')})
  await browser.close()
})()