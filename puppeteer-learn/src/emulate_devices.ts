import * as puppeteer from 'puppeteer'
const devices = require('puppeteer/DeviceDescriptors')
import {join} from 'path'

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  })

  const page = await browser.newPage()
  await page.emulate(devices['iPhone 6'])
  await page.goto('https://www.google.com/')
  await page.screenshot({path: join(__dirname, '../assets/full.png'), fullPage: true})
  await page.waitFor(1000)
  console.log(await page.title())
  await browser.close()
})()