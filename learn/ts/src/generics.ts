// 泛型
// 类型变量是用于指定特殊的类型而不是值

// =============== Simple Start ===============
function identity<T>(arg: T): T {
  return arg;
}

// 第一种使用方法
let output = identity<string>('myString') // 指明类型
let output2 = identity('myString') // 通过类型推断

// 使用数组类型
function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length);
  return arg;
}
// 或者
function loggingIdentity<T>(arg: Array<T>): Array<T> {
  console.log(arg.length);
  return arg;
}
// =============== Simple End =================

// =============== Generic Types Start ===============
// 范型类型
function identity<T>(arg: T): T {
  return arg
}
// 定义变量为范型函数
let myIdentity: <T>(arg: T) => T = identity
//
let myIdentity2: {<T>(arg: T): T} = identity

// 定义接口
interface GenericIdentityFn {
  <T>(arg: T): T;
}
let myIdentity3: GenericIdentityFn = identity

// 也可以让整个接口都能访问类型
interface GenericIdentityFn2<T> {
  (arg: T): T;
}
let myIdentity4: GenericIdentityFn2<number> = identity
// =============== Generic Types End =================

// =============== Generic Classes Start ===============
// 泛型在类中只能作用于实例相关的变量与方法，对于静态方法以及变量不允许使用泛型
class GenericClassExample<T> {
  value: T;
  add: (x: T, y: T) => T;
}

let myGenericClassInstance = new GenericClassExample<number>()
myGenericClassInstance.value = 10
myGenericClassInstance.add = function(x, y) { return x + y }
// =============== Generic Classes End =================

// =============== Generic Constraints Start ===============
// Error Example
function loggingIdentity2<T>(arg: T): T {
  console.log(arg.length); // T doesn't have .length
  return arg;
}

// constraint T has length
interface Lengthwise {
  length: number,
}

function loggingIdentity3<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// 根据类型变量来声明限制
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}

let x = {a: 1, b: 2, c: 3, d: 4}
getProperty(x, 'a')
getProperty(x, 'm') // Error

// 在泛型中使用类类型变量
// 其中 T 是类型变量，表明参数 c 是一个类，其构造方法返回一个类的实例，类型为 T
function create<T>(c: {new(): T;}): T {
  return new c();
}

// 例子
class BeeKeeper {
  hasMask: boolean;
}

class ZooKeeper {
  nametag: string;
}

class Animal {
  numLegs: number;
}

class Bee extends Animal {
  keeper: BeeKeeper;
}

class Lion extends Animal {
  keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c()
}

createInstance(Lion).keeper.nametag
createInstance(Bee).keeper.hasMask
// =============== Generic Constraints End =================