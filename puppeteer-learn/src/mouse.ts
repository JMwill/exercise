import * as puppeteer from 'puppeteer'
import {join} from 'path'

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  })
  const page = await browser.newPage()
  await page.goto('http://unixpapa.com/js/testmouse.html')
  await page.mouse.click(132, 103, {button: 'left'})
  await page.screenshot({path: join(__dirname, '../assets/mouse_click.png')})
  await browser.close()
})()