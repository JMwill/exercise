import { log } from "../utils/log";

// =============== Simple Example Start ===============
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return 'Hello' + this.greeting;
  }
}

const greeter = new Greeter('world');
// =============== Simple Example End =================

// =============== Complex Example Start ===============
class Animal {
  name: string;
  constructor(theName: string) {
    this.name = theName
  }
  move(distanceInMeters: number = 0) {
    log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Snake extends Animal {
  constructor(name: string) {
    super(name);
  }
  move(distanceInMeters = 5) {
    log('Slithering...');
    super.move(distanceInMeters);
  }
}

class Horse extends Animal {
  constructor(name: string) {
    super(name);
  }
  move(distanceInMeters = 45) {
    log('Galloping...');
    super.move(distanceInMeters);
  }
}

let sam = new Snake('Sammy the Python')
let tom: Animal = new Horse('Tommy the Palomino')
sam.move()
tom.move(34)
// =============== Complex Example End =================

// =============== Private and protect Start ===============
class Animal2 {
  private name: string;
  constructor(theName: string) {
    this.name = theName;
  }
}

class Rhino extends Animal2 {
  constructor() {
    super('Rhino');
  }
}

class Employee {
  private name: string;
  constructor(theName: string) {
    this.name = theName;
  }
}

let animal = new Animal2('Goat');
let rhino = new Rhino();
let employee = new Employee('Bob');

animal = rhino;
animal = employee; // 同类或子类才可以赋值
// =============== Private and protect End =================

// =============== Protected Constructor Start ===============
// protected 关键字描述的属性或者方法可以被子类调用
// 因此可以声明一个 protected 的构造器
class Person {
  protected name: string;
  protected constructor(theName: string) {
    this.name = theName;
  }
}

class Employee2 extends Person {
  private department: string;
  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }
  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}`;
  }
}

let howard = new Employee2('Howard', 'Sales');
let john = new Person('John'); // 因为构造器是 protected 的，因此不允许子类及自身以外的调用
// =============== Protected Constructor End =================

// =============== Readonly modifier Start ===============
class Octopus {
  readonly name: string;
  readonly numberOfLegs: number = 0;
  constructor(theName: string) {
    this.name = theName;
  }
}
let dad = new Octopus('Man with the 8 strong legs');
dad.name = 'Man with the 3-piece suit'; // name 是只读的，只能在声明时或者构造函数中初始化

// 属性参数，可以在构造函数中连声明以及属性类型声明一起来
// 如此，省却需要进行的命名
class Octopus2 {
  readonly numberOfLegs: number = 8;
  constructor(
    readonly name: string,
    private heart: Object,
    protected mind: string
  ) {}
}

// 访问器
const passcode = 'secret passcode';
class Employee3 {
  private _fullName: string;
  get fullName(): string {
    return this._fullName;
  }

  set fullName(newName: string) {
    if (passcode && passcode == 'secret passcode') {
      this._fullName = newName;
    } else {
      log('Error: Unauthorized update of employee!');
    }
  }
}

let employee3 = new Employee3();
employee3.fullName = 'Bob Smith';
if (employee3.fullName) {
  log(employee3.fullName);
}

// 静态属性，静态属性归属于类所有，通过类来访问
class Grid {
  static origin = {x: 0, y: 0};
  calculateDistanceFromOrigin(point: {x: number, y: number;}) {
    let xDist = (point.x - Grid.origin.x);
    let yDist = (point.y - Grid.origin.y);
    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }
  constructor(public scale: number) {}
}

let grid1 = new Grid(1.0);
let grid2 = new Grid(5.0);
log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));
// =============== Readonly modifier End =================

// =============== Abstract Classes Start ===============
// 抽象类不直接用于实例化，用于给其他类继承，同时抽象类也会包含有成员的实现细节
// abstract 关键字不仅用于抽象类，也用于抽象类里面的抽象方法
abstract class Animal3 {
  abstract makeSound(): void;
  move(): void {
    log('roaming the earth...');
  }
}

// 例子
abstract class Department {
  constructor(public name: string) {}
  printName(): void {
    log('Department name: ' + this.name);
  }
  abstract printMeeting(): void; // 必须被子类实现
}

class AccountingDepartment extends Department {
  constructor() {
    super('Accounting and Auditing'); // 抽象类的子类必须要调用构造函数
  }
  printMeeting(): void {
    log('The Accounting Department meets each Monday at 10am.');
  }
  generateReports(): void {
    log('Generating accounting reports...');
  }
}

let department: Department;
department = new Department(); // 实例化抽象类会失败
department = new AccountingDepartment();

department.printName();
department.printMeeting();
department.generateReports(); // 方法错误，子类所实现的抽象类并不具备对应的方法
// =============== Abstract Classes End =================
