import * as puppeteer from 'puppeteer'
import {join} from 'path'

type College = {
  name: string,
  url: string,
}

const log = console.log.bind(console)
const parallel = 4
const colleges = [
  { name: 'Universitaet zu Koeln', url: 'https://de.wikipedia.org/wiki/Universit%C3%A4t zu K%C3%B6ln'},
  { name: 'Technische Hochschule Koeln', url: 'https://de.wikipedia.org/wiki/Technische_Hochschule_K%C3%B6ln'},
  { name: 'Rheinische Fachhochschule Koeln', url: 'https://de.wikipedia.org/wiki/Rheinische_Fachhochschule_K%C3%B6ln'},
  { name: 'Deutsche Sporthochschule Koeln', url: 'https://de.wikipedia.org/wiki/Deutsche_Sporthochschule_K%C3%B6ln'},
  { name: 'Hochschule für Musik und Tanz Koeln', url: 'https://de.wikipedia.org/wiki/Hochschule_f%C3%BCr_Musik_und_Tanz_K%C3%B6ln'},
  { name: 'Kunsthochschule für Medien Koeln', url: 'https://de.wikipedia.org/wiki/Kunsthochschule_f%C3%BCr_Medien_K%C3%B6ln'},
  { name: 'Katholische Hochschule Nordrhein-Westfalen', url: 'https://de.wikipedia.org/wiki/Katholische_Hochschule_Nordrhein-Westfalen'},
  { name: 'Fachhochschule für oeffentliche Verwaltung Nordrhein-Westfalen', url: 'https://de.wikipedia.org/wiki/Fachhochschule_f%C3%BCr_%C3%B6ffentliche_Verwaltung_Nordrhein-Westfalen'},
  { name: 'Hochschule des Bundes für oeffentliche Verwaltung', url: 'https://de.wikipedia.org/wiki/Hochschule_des_Bundes_f%C3%BCr_%C3%B6ffentliche_Verwaltung'},
  { name: 'Cologne Business School', url: 'https://de.wikipedia.org/wiki/Cologne_Business_School'},
  { name: 'FOM – Hochschule für Oekonomie und Management', url: 'https://de.wikipedia.org/wiki/FOM_%E2%80%93_Hochschule_f%C3%BCr_Oekonomie_und_Management'},
  { name: 'Internationale Filmschule Koeln', url: 'https://de.wikipedia.org/wiki/Internationale_Filmschule_K%C3%B6ln'},
  { name: 'Hochschule Fresenius', url: 'https://de.wikipedia.org/wiki/Hochschule_Fresenius'},
]

const screenshotColleges = async (colleges: College[], parallel: number) => {
  const batches = Math.ceil(colleges.length / parallel)
  const browser = await puppeteer.launch({headless: false})
  const context = await browser.createIncognitoBrowserContext()
  log('\nI have gotten the task of taking screenshots of ' + colleges.length + ' Wikipedia articles on colleges in Cologne and will take ' + parallel + ' of them in parallel.')
  log(' This will result in ' + batches + ' batches')

  let k = 0
  let i = 0
  for (; i < colleges.length; i += parallel) {
    k++
    log('\nBatch ' + k + ' of ' + batches)
    const promises = []
    let j = 0
    for (; j < parallel; j++) {
      const elem = i + j
      if (colleges[elem] != undefined) {
        log('I promise to screenshot: ' + colleges[elem].name)
        const page = await context.newPage()
        promises.push(loadPageToScreenshot(page, colleges[elem]))
      }
    }
    await Promise.all(promises)
    log('\nI finished this batch. I\'m ready for the next batch')
  }
  await browser.close()
}

const loadPageToScreenshot = async (page: puppeteer.Page, college: College) => {
  await page.setViewport({width: 1280, height: 800})
  try {
    await page.goto(college.url)
    await page.screenshot({path: join(__dirname, `../assets/elem_${college.name}.png`)})
      .then(log('I have kept my promise to screenshot ' + college.name))
  } catch(err) {
    log('Sorry! couldn\'t keep promise to screenshot' + college.name)
  } finally {
    page.close()
  }
}

screenshotColleges(colleges, parallel)