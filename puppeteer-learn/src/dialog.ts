import * as puppeteer from 'puppeteer'

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--window-size=800,500'],
  })

  const page = await browser.newPage()
  await page.setViewport({width: 800, height: 500, deviceScaleFactor: 2})
  await page.goto('https://www.google.com/')
  page.on('dialog', async dialog => {
    console.log(dialog.message())
    await dialog.dismiss()
  })
  await page.evaluate(() => alert('This message is inside an alert box'))
  await page.waitFor(1000)
  await page.close()
  await browser.close()
})()