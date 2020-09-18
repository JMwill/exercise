import {log} from '../utils/log'

// Boolean
const isFalse: boolean = false
const isTrue: boolean = true

// Number
const numberTen: number = 10
const hexNumber: number = 0xf00d
const binaryNumber: number = 0b1010
const octNumber: number = 0o755

// String
const strValue = 'output string'

// Array
const numberArr: number[] = [1, 2, 3]
const genericNumberArr: Array<number> = [4, 5, 6]

// Tuple
const fakeTuple: [string, number] = ['hello', 10]

// Enum: 为了更友好地命名数字类型的数据值
enum Color {Red, Green, Blue}
let c: Color = Color.Green

enum nColor {Red=1, Green, Blue}
let nc: nColor = nColor.Green

let cName: string = Color[1]

// Any
const anyVal: any = 10
const listContainAnyVal: any[] = [1, true, 'hello']

// Void & undefined & null
const voidType: void = undefined
const undefinedType: undefined = undefined
const nullType: null = null

// Never type, never means never return
function error(message: string): never {
  throw new Error(`never type must have unreachable end point, message: ${message}`)
}

// Object
declare function create(o: object | null): void

// Type assertions
const strValueWithAnyType: any = 'any type string'
const anyTypeStrLength: number = (<string>strValueWithAnyType).length

const anyTypeStrLengthUseAsSyntax: number = (strValueWithAnyType as string).length

log(isFalse)
log(isTrue)
log(numberTen)
log(hexNumber)
log(binaryNumber)
log(octNumber)
log(strValue)
log(numberArr)
log(genericNumberArr)
log(fakeTuple[0].slice(2))
log(c)
log(nc)
log(cName)
log(anyVal.toString())
log(listContainAnyVal[2])
log(voidType, undefinedType, nullType)
try{error('hello')} catch (e) {log(e.message)}
log(anyTypeStrLength)
log(anyTypeStrLengthUseAsSyntax)