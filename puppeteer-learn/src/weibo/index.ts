// FUGG4vsiJVO5 13097744519
import {init, login} from './login'
import {like, findPostByName, filterNotLike, moveToEnd} from './action'

const main = async () => {
  const {browser, context} = await init()
  let loginedPage
  while (!loginedPage) {
    try {
      loginedPage = await login(context, '13097744519', 'FUGG4vsiJVO5')
    } catch(e) {console.error('login fail !!!!!!!')}
  }

  if (!loginedPage) return

  const name = '人民日报'
  console.log(`start like ${name}!`)
  let i = 0;
  while (i < 10) {
    const allNamePost = await findPostByName(loginedPage, name)
    const postList = await filterNotLike(allNamePost)

    for(let i = 0; i < postList.length; i++) {
      await like(postList[i]) && console.log('成功 👍  1个')
      await loginedPage.waitFor(Math.random() * 5000 + 20000)
    }

    await moveToEnd(loginedPage)
    i++
  }
  console.log(`end like ${name}!`)
  browser.close()
}

if (require != undefined && require.main === module) {
  main()
}