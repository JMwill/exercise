import * as puppeteer from 'puppeteer'

export const like = async (post: puppeteer.ElementHandle) => {
  const likeElm = await post.$('a[title="赞"]')
  likeElm && likeElm.click()
  return !!likeElm
}

export const filterNotLike = async (postList: puppeteer.ElementHandle[]) => {
  return postList.filter(async post => {
    const likeElm = await post.$('a[title="赞"]')
    return !!likeElm
  })
}

export const findPostByName = async (page: puppeteer.Page, name: string) => {
  const postList = await page.$$('.WB_feed_like')
  return Promise.all(postList.map(async post => {
    const nickName = await post.$eval(
      '.WB_info a[nick-name]',
      el => el ? el.getAttribute('nick-name') : ''
    )
    return nickName === name ? post : null
  })).then(data => data.filter(Boolean))
}

export const moveToEnd = async (page: puppeteer.Page) => {
  await page.evaluate(() => window.scrollTo(0,document.body.scrollHeight))
}

