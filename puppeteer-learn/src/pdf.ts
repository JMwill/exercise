import * as puppeteer from 'puppeteer'
import {join} from 'path'

(async () => {
  const browser = await puppeteer.launch({
    // headless: false, // print to pdf not support headless false
  })
  const page = await browser.newPage()
  await page.goto('https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pdf')
  await page.pdf({path: join(__dirname, '../assets/api.pdf'), format: 'A4'})
  await browser.close()
})()