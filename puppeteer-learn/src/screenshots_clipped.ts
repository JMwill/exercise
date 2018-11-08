import * as puppeteer from 'puppeteer'
import {join} from 'path'

(async () => {
  const screenshotOpt = {
    path: join(__dirname, '../assets/clipped_screenshots.png'),
    fullPage: false,
    clip: {
      x: 0,
      y: 240,
      width: 1000,
      height: 100,
    }
  }
  const viewportOpt = {width: 1280, height: 800}
  const browser = await puppeteer.launch({
    headless: false,
  })
  const page = await browser.newPage()
  await page.goto('https://finance.yahoo.com/')
  await page.setViewport(viewportOpt)
  await page.screenshot(screenshotOpt)
  await browser.close()
})()