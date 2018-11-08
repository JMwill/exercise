import * as puppeteer from 'puppeteer'
import {join} from 'path'

try {
  (async () => {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.setViewport({width: 1280, height: 800})
    await page.goto('https://www.amazon.com')
    await page.type('#twotabsearchtextbox', 'nyan cat pullover')
    await page.click('input.nav-input')
    await page.waitForSelector('#resultsCol')
    await page.screenshot({path: join(__dirname, '../assets/amazon_nyan_cat_pullovers_list.png')})
    const pullovers = await page.$$('a.a-link-normal.a-text-normal')
    await pullovers[2].click()
    await page.waitForSelector('#ppd')
    await page.screenshot({path: join(__dirname, '../assets/amazon_nyan_cat_pullover.png')})
    await browser.close()
  })()
} catch(e) { console.error(e) }