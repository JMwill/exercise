import * as puppeteer from 'puppeteer'
import {join} from 'path'

(async () => {
  const imgPath = join(__dirname, '../assets/github.png')
  const browser = await puppeteer.launch({
    headless: false,
  })
  const page = await browser.newPage()
  await page.goto('https://github.com/login')
  console.log(process.env.GITHUB_USER)
  console.log(process.env.GITHUB_PWD)
  await page.type('#login_field', process.env.GITHUB_USER)
  await page.type('#password', process.env.GITHUB_PWD)
  await page.click('[name="commit"]')
  await page.waitForNavigation()
  await page.screenshot({path: imgPath})
  await browser.close()
  console.log('See screenshot: ' + imgPath)
})()