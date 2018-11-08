import * as puppeteer from 'puppeteer'

const main = async () => {
  const browser = await puppeteer.launch({headless: false})
  const page = await browser.newPage()
  const baidu = 'https://www.baidu.com'

  await page.goto(baidu, {waitUntil: 'networkidle0'})
  await page.type('[name=wd]', '测试百度搜索')
  await page.click('input[value="百度一下"]')
  await page.waitForNavigation()
  console.info('成功搜索')
  await page.waitFor(4000)

  await browser.close()
  console.log('退出')
}

if (require != undefined && require.main === module) {
  main()
}