import * as puppeteer from 'puppeteer'

let browser: puppeteer.Browser
let page: puppeteer.Page

beforeAll(async () => {
  browser = await puppeteer.launch({headless: false})
  page = await browser.newPage()
})

describe('Alibaba Search', () => {
  test('has search input', async () => {
    await page.setViewport({width: 1200, height: 800})
    await page.goto('https://www.alibaba.com', {waitUntil: 'networkidle0'})
    const searchInput = await page.$('input.ui-searchbar-keyword')
    expect(searchInput).toBeTruthy()
  }, 10000)

  test('shows search results after search input', async () => {
    await page.type('input.ui-searchbar-keyword', 'lucky cat')
    await page.click('input.ui-searchbar-submit')
    await page.waitForSelector('[data-content="abox-ProductNormalList"]')
    const firstProduct = await page.$('.item-content')
    expect(firstProduct).toBeTruthy()
  })

  afterAll(async () => {
    await browser.close()
  })
})
