import * as puppeteer from 'puppeteer'
// import {join} from 'path'

const website = 'https://weibo.com/'


export const init = async () => {
  const browser = await puppeteer.launch({headless: false})
  const context = await browser.createIncognitoBrowserContext()

  return {browser, context}
}

export const login = async (
  context:puppeteer.BrowserContext,
  account: string,
  password: string
) => {
  const cookie = {
    name: 'un',
    value: account,
    domain: '.weibo.com',
    url: 'https://www.weibo.com/',
    path: '/',
  }
  const page = await context.newPage()
  await page.setCookie(cookie)
  await page.setViewport({width: 1280, height: 800})
  await page.goto(website, {waitUntil: 'networkidle0'})
  await page.waitForSelector('#loginname')
  await page.$$eval('#loginname', (elm: HTMLInputElement[], account) => {
    if (elm.length && (elm[0].value != account)) { elm[0].value = account }
  }, account)
  await page.waitForSelector('[type=password]')
  await page.waitFor(100)
  await page.type('[type="password"]', password)
  await page.waitFor(10)
  await page.click('[action-type="btn_submit"]')
  try {
    await page.waitForNavigation({timeout: 10000})
  } catch(e) {
    await page.close()
    throw e
  }

  return page
}
