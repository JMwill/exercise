import * as puppeteer from 'puppeteer'
import {join} from 'path'

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  })
  const page = await browser.newPage()
  await page.goto('https://news.ycombinator.com/news')
  const name = await page.$eval('.hnname > a', el => el.innerHTML)
  console.log('========', name, '=======')
  await browser.close()
})()