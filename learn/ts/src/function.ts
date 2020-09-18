import {log} from '../utils/log'

// =============== Function Types Start ===============
// 简单的函数
let add = function(x: number, y: number): number { return x + y; };

// 定义变量的返回值为某种格式的函数
// 定义返回的函数参数为 number，返回值为 number：(baseValue: number, increment: number) => number
let add: (baseValue: number, increment: number) => number =
  function(x: number, y: number): number { return x + y; };
// =============== Function Types End =================

// =============== Optional & Default Start ===============
// 下面两者的参数提示都是提示字符串，因为第二个函数可以经 Typescript 分析得出
function buildName(firstName: string, lastName?: string) {
  return lastName ? firstName + ' ' + lastName : firstName
}

function buildName(firstName: string, lastName = 'Smith') {
  return firstName + ' ' + lastName
}
// =============== Optional & Default End =================

// =============== Rest Parameters Start ===============
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + ' ' + restOfName.join(' ')
}
let buildNameFun: (fname: string, ...rest: string[]) => string = buildName
let employeeName = buildName('Joseph', 'Samel', 'Lucas', 'MacKinzie')
// =============== Rest Parameters End =================

// =============== Overloads Start ===============
let suits = ['hearts', 'spades', 'clubs', 'diamonds']

// 对函数进行重载
function pickCard(x: {suit: string; card: number;}[]): number;
function pickCard(x: number): {suit: string; card: number;};
function pickCard(x: object|number): any {
  if (typeof x == 'object') {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard
  }
  else if (typeof x == 'number') {
    let pickedSuit = Math.floor(x / 13);
    return {
      suit: suits[pickedSuit],
      card: x % 13,
    }
  }
}

let myDeck = [{suit: 'diamonds', card: 2}, {suit: 'spades', card: 10}, {suit: 'hearts', card: 4}]
let pickedCard1 = myDeck[pickCard(myDeck)]
log('card: ' + pickedCard1.card + ' of ' + pickedCard1.suit)

let pickedCard2 = pickCard(15)
pickCard(15)
log('card: ' + pickedCard2.card + ' of ' + pickedCard2.suit)
// =============== Overloads End =================