import {log} from '../utils/log'
/**
 * TypeScript 的其中一个核心理念是对于类型检查关注点是值所具有的形状
 * 可以将其称之为鸭子类型，TypeScript 中的 Interface 则是充当命名
 * 这些类型的角色
 */
// ========= Simple Example =========
// Before use interface
function printLabel(labelledObj: {label: string}) {
  log(labelledObj.label)
}

const myObj = {size: 10, label: 'Size 10 Object'}
printLabel(myObj)

// After use interface
interface LabelledValue {
  label: string
}

function printLabel2(labelledObj: LabelledValue) {
  log(labelledObj.label)
}

printLabel2(myObj)
// ===============================================

// ========= Optional Properties Example =========
interface SquareConfig {
  color?: string
  width?: number
}

function createSquare(config: SquareConfig): {color: string, area: number} {
  let newSquare = {color: 'white', area: 100}
  if (config.color) { newSquare.color = config.color }
  if (config.width) { newSquare.area = config.width * config.width }
  return newSquare
}

const mySquare = createSquare({color: 'black'})
log(`square created, width: ${mySquare.area}, color: ${mySquare.color}`)
// ===============================================

// ========= Readonly Properties Example =========
interface Point {
  readonly x: number
  readonly y: number
}
const p1: Point = {x: 10, y: 11}
log(p1.x)

// 只读数组
let ra: number[] = [1, 2, 3, 4]
let roa: ReadonlyArray<number> = ra
try { ra = roa } catch (e) { log(e) }
ra = roa as number[] // 但是类型断言可以使用
try { roa[0] = 12 } catch(e) {log(e)} // 定义为 Readonly 的数组不允许修改，即使是赋值回一个可变数组都不可以，会导致编译报错，但是不影响执行
log(roa[0])
// ===============================================


// ========= Excess Property Checks Example =========
interface SquareConfig2 {
  color?: string
  width?: number
  [propName: string]: any // 接受任何类型的变量
}
let squareOptions: SquareConfig2 = {colour: 'red', width: 10}
let mySquare2 = createSquare(squareOptions)
log(mySquare2)
// ===============================================

// =============== Function Types ===============
interface SearchFunc {
  (source: string, subString: string): boolean
}

// TypeScript 会自己进行隐式的类型检查
let mySearch: SearchFunc
mySearch = function(source: string, subString: string) {
  const result = source.search(subString)
  return result > -1
}

let mySearch2: SearchFunc
mySearch2 = function(src: string, sub: string): boolean {
  let result = src.search(sub)
  return result > -1
}

// 因此即使什么都没有写明，依然可以进行正确的检查
let mySearch3: SearchFunc
mySearch3 = function(src, sub) {
  let result = src.search(sub)
  return result > -1
}
// =============================================

// =============== Indexable Types ===============
// 除了可以对属性、函数进行声明外，也可以对能索引到的值进行检查
interface StringArray {
  [index: number]: string,
}
let myArray: StringArray
myArray = ['Bob', 'Fred']

let myStr: string = myArray[0]

// 字符串跟数字都支持进行索引签名，可以同时支持两种类型的索引。因为数字索引实际上会被覆盖成字符索引
// 因此支持数字索引的类型必须要是支持字符索引的子类型，才不会导致类型检查的混乱，如下例子则会报错：
class Animal {
  name: string
}
class Dog extends Animal {
  breed: string
}

// 因为 Animal 是 Dog 的父类，但是 Animal 却只支持数字索引，而子类则支持字符串索引
// 那么父类则可以被子类覆盖，类型检查的索引则无法正确进行正确的提示
interface NotOkay {
  [x: number]: Animal,
  [x: string]: Dog,
}

// 同时属于字符串的一些属性也是可以进行声明，一下例子中 length 可以声明，而 name 则因为
// 不存在而不可以
interface NumberDictionary {
  [index: string]: number
  length: number
  name: string
}

// 而且可索引类型也可以定义为只读
interface ReadonlyStringArray {
  readonly [index: number]: string
}
let myArray2: ReadonlyStringArray = ['Alice', 'Bob']
myArray2[0] = 'hello'
// =============================================

//  =============== Class Types ===============
// 定义一个类来实现接口
interface ClockInterface {
  currentTime: Date
}

class Clock implements ClockInterface {
  currentTime: Date
  constructor(h: number, m: number) {}
}

// 同时指定具有的方法
interface ClockInterface2 {
  currentTime: Date
  setTime(d: Date): void
}
class Clock2 implements ClockInterface2 {
  currentTime: Date
  setTime(d: Date) {
    this.currentTime = d
  }
  constructor(h: number, m: number) {}
}

// 如果一个类是接口的实现，那么只有类中实例侧才会被检查，而构造函数属于静态侧因此不会被检查
interface ClockConstructor {
  new (hour: number, minute: number): void
}

class Clock3 implements ClockConstructor {
  currentTime: Date
  constructor(h: number, m: number) {}
}

// 下面是实现检查类的构造函数是否正确的例子
// 通过向函数传入类，实现检查类中构造函数的目的
interface ClockConstructor2 {
  new (hour: number, minute: number): ClockInterface3
}
interface ClockInterface3 {
  tick(): void
}
function createClock(ctor: ClockConstructor2, hour: number, minute: number): ClockInterface3 {
  return new ctor(hour, minute)
}

class DigitalClock implements ClockInterface3 {
  constructor(h: number, m: number) {}
  tick() { log('beep beep') }
}

class AnalogClock implements ClockInterface3 {
  constructor(h: number, m: number) {}
  tick() { log('tick tiok') }
}

let digital = createClock(DigitalClock, 12, 7)
let analog = createClock(AnalogClock, 7, 32)
//  =============================================

// =============== Extending Interface ===============
interface Shape {
  color: string
}

interface Square extends Shape {
  sideLength: number
}

let square = <Square>{}
// 或者 let square2: Square
square.color = 'blue'
square.sideLength = 10

// 接口还可以进行多继承
interface PenStroke {
  penWidth: number
}
interface Square2 extends Shape, PenStroke {
  sideLength: number
}

let square2 = <Square2>{}
square2.color = 'blue'
square2.penWidth = 10
square2.sideLength = 5.0
// =============================================

// =============== Hybrid Types ===============
// 因为 JavaScript 是动态类型的语言，接口可以混合实现
interface Counter {
  (start: number): string
  interval: number
  reset(): void
}

function getCounter(): Counter {
  let counter = <Counter>function (start: number) {}
  counter.interval = 123
  counter.reset = function() {}
  return counter
}

let c = getCounter()
c(10)
c.reset()
c.interval = 5.0
// =============================================

// =============== Interface extending Classes ===============
class Control {
  private state: any
}
interface SelectableControl extends Control {
  select(): void
}

class Button extends Control implements SelectableControl {
  select() {}
}

class TextBox extends Control {
  select() {}
}

// 会提示错误，因为接口扩展自 Control 类，所以如果一个类实现了这个接口
// 那么这个类也需要是接口拓展的类的子类
class Image implements SelectableControl {
  select() {}
}
// =============================================