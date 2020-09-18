import {log} from '../utils/log';

// Array Destructuring
const arrInput: number[] = [1, 2]
let [arrFirst, arrSecond] = arrInput
log(arrFirst, arrSecond);

[arrFirst, arrSecond] = [arrSecond, arrFirst]
log(arrFirst, arrSecond)

const [restFirst, ...rest]: number[] = [1, 2, 3, 4]
log(restFirst, rest)

const [, skipSecond, ,skipFourth]: number[] = [1, 2, 3, 4]
log(skipSecond, skipFourth)

function arrF([first, second]: [number, number]) {
  log(first, second)
}
arrF([1, 2])

// Object Destructuring
const o = {
  a: 'foo',
  b: 12,
  c: 'bar',
  d: 'for test',
}
let {a, b} = o
log(a, b)

;({a, b} = {a: 'baz', b: 101})
log(a, b)

;let {a: na, ...passthrough} = o
log(na, JSON.stringify(passthrough))

;let {c, d}: {c: string, d: string} = o
log(c, d)

function keepWholeObject(wholeObject: {a: string, b?: number}) {
  let {a, b = 1001} = wholeObject
  log(a, b)
}

keepWholeObject({a: 'test'})

// Function declarations
type C = {a: string, b?: number}
function fdF({a, b}: C): void {
  log(a, b)
}
fdF({a: 'hello', b: 100})

// Spread
let sFirst = [1, 2]
let sSecond = [3, 4]
let bothFS = [0, ...sFirst, ...sSecond, 5]
log(bothFS)

let defaults = {food: 'spicy', price: '$$', ambiance: 'noisy'}
let search = {...defaults, food: 'rich'}
log(JSON.stringify(search))