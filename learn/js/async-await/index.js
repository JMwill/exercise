const log = console.log.bind(console)
function waitPromise(time, result) {
  result && log('\ncall wait promsie')
  return new Promise((resolve) => {
    setTimeout(() => {
      result && log(`promise wait: ${time}, and get result: ${result}`)
      resolve(result)
    }, time)
  })
}

// =============== 简单例子 ===============
async function myAsync1() {
  const hello = await waitPromise(1000, 'hello')
}
// =============================================

// =============== 作为函数的参数 ===============
function helloTo(name) {
  log(`Hello ${name}`)
}

// Promise 的方式
function functionWithPromise() {
  waitPromise(1000, 'John')
    .then(result => {
      // 一般做法
      // if (result) {
      //   helloTo(result)
      // } else {
      //   waitPromise(3000, 'Amy').then(fallback => {
      //     helloTo(result)
      //   })
      // }

      // 更简便的做法
      return result || waitPromise(3000, 'Amy')
    }).then(result => helloTo(result))
}

// Async 的方式
async function functionWithAwaitProperty() {
  helloTo(await waitPromise(1000, 'John') || await waitPromise(3000, 'Amy'))
  helloTo(await waitPromise(1000, '') || await waitPromise(10000, 'Bruce'))
}
// =============================================

// =============== 需要前一个 Promise 的值 ===============
// Promise 的方式
function actNeedPreviousPromise() {
  waitPromise(1000, {color: 'red', width: 100})
    .then(result => {
      log(`get color: ${result.color}`)
      waitPromise(3000, 'do another thing')
        .then(() => waitPromise(1000, result.width))
        .then(widthPromise => log(`get width: ${widthPromise}`))
    })
}

// Async 的方式
async function actNeedPreviousAsync() {
  const result = await waitPromise(1000, {color: 'red', width: 100})
  log(`get color: ${result.color}`)
  await waitPromise(3000, 'do another thing')
  const doWithWidth = await waitPromise(1000, result.width)
  log(`get width: ${doWithWidth}`)
}
// =============================================

// =============== 报错的处理方式 ===============
// Promise 的方式
function exceptionPromise() {
  let result
  waitPromise(1000, 'normal')
    .then(r => {
      result = r
      throw new Error('error occur')
    })
    .catch(error =>
      waitPromise(2000, 'another promise when error occur')
        .then(r => result = r))
    // .then(r => {
    //   result = r
    // }) // 错误的使用方式
    .then(() => {log(`error promise result: ${result}`)})
}

async function exceptionAsync() {
  let result
  try {
    result = await waitPromise(1000, 'normal').then(r => {throw new Error('error occur')})
  } catch(e) {
    result = await waitPromise(2000, 'another await when error occur')
  }
  log(`error promise result: ${result}`)
}
// =============================================

// =============== 多个并行的请求 ===============
// Promise 实现
function parallPromise() {
  let result
  const p1 = waitPromise(1000, 1)
    .then(r => {
      result = r + (result || 30)
      return result
    })
  const p2 = waitPromise(2000, 2)
    .then(r => {
      result = r * (result || 2)
      return result
    })
  const p3 = waitPromise(1500, 1.5)
    .then(r => {
      result = (result || 100) - r
      return result
    })
  Promise.all([p1, p2, p3]).then(() => log(result))
}

// Async 实现
async function parallAsync() {
  const p1 = waitPromise(1000, 1)
  const p2 = waitPromise(2000, 2)
  const p3 = waitPromise(1500, 1.5)

  let result
  const r1 = await p1
  result = r1 + 30
  const r3 = await p3
  result -= r3
  const r2 = await p2
  result *= r2
  log(result)
}
// =============================================

// =============== async 实现 Promise.all  ===============
async function asyncSimulatePromiseall() {
  const range = Array(10).fill(0).map((i, index) => index)
  const pList = range.map(i => waitPromise(i * 100, i))

  // Promise.all(pList).then(console.log)

  let list = []
  for (let p of pList) {
    list.push(await p)
  }
  console.log(list)
}
// =============================================

// =============== async for in test ===============
async function test() {
  const range = Array(10).fill(0).map((i, index) => index)
  const pList = range.map(i => waitPromise(i * 100, i))

  let list = []
  for (let i; i < pList.length; i++) {
    list.push(await pList[i])
  }
  console.log(list)
}
// =============================================


function main() {
  // myAsync1()

  // functionWithPromise()
  // functionWithAwaitProperty()

  // actNeedPreviousPromise()
  // actNeedPreviousAsync()

  // exceptionPromise()
  // exceptionAsync()

  // parallPromise()
  // parallAsync()

  asyncSimulatePromiseall()
  // test()
}

if (typeof require != 'undefined' && require.main == module) {
  main()
}