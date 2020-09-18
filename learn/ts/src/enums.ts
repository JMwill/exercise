import {log} from '../utils/log'
/***************** 枚举类型： Enums *****************
 * 枚举类型能够方便定义命名的常量集合，这样面对着一些毫无意义
 * 的魔法数字时，可以在阅读代码时能够更容易明白使用者的意图
 **************************************************/

// =============== Numeric enums Start ===============
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}

// normal usage
enum Respons {
  No = 0,
  Yes = 1,
}
function respond(recipient: string, message: Respons): void {
  // pass
}

respond('Princess Caroline', Respons.Yes)

// 数字类型的枚举量可以通过设置一个初始值，后续的值能够通过自动推断得出
// 但是要保证这个推断能够顺利执行，那么没有初始化的枚举值要么是第一个，
// 要么是跟在一个已经初始化了的数字常量或其他常量枚举成员之后。
function getSomeValue() {
  return 1
}

enum E {
  A = getSomeValue(),
  B, // Error
}
// =============== Numeric enums End =================

// =============== String enums Start ===============
enum Direction2 {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}
// =============== String enums End =================

// =============== considered computed Start ===============
enum FileAccess {
  // constant members
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  // computed member
  G = '123'.length,
}
// =============== considered computed End =================

// =============== Union enums and enum member types Start ===============
// =============== 联合枚举以及枚举成员类型 ===============
// 有一种特的的枚举成员常量是不可计算的，那就是：枚举成员字面量。
// 枚举成员字面量就是一个尚未初始化值的枚举成员常量或者是一个值被初始化为：
// - 任何字符字面量（"foo" 等）
// - 任何数字字面量（100 等）
// - 被应用了一元减号的任何数字字面量（-100 等）

// 当枚举值里的所有成员都具有枚举字面值，就会发生有趣的事情：
// 首先，枚举成员也成为了类型，例如：某些成员只能有枚举成员值
enum ShapeKind {
  Circle,
  Square,
}

interface Circle {
  kind: ShapeKind.Circle;
  radius: number;
}

interface Square {
  kind: ShapeKind.Square;
  sideLength: number;
}

let c: Circle = {
  kind: ShapeKind.Square, // Error
  radius: 100,
}

// 通过定义枚举值，并联合在一起，TypeScript 能够避免错误的比较等问题，及时给出提示
enum E {
  Foo,
  Bar,
}

function f(x: E) {
  if (x !== E.Foo || x !== E.Bar) {
    // ...
  }
}
// =============== Union enums and enum member types End =================