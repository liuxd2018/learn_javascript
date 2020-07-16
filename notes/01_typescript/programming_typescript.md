## preface

variables, functions, classes, and errors

scale your application across more users, engineers, and servers

types and type operators, type definition and type expression

* latest javascript features
* keep data structures immutable with spread ...
    add a property `k` to object `obj`
    * mutate: `obj.k = 3`
    * create a new object: `const p = {...obj, k: 3,}`
* make sure everything has a type, inferred when possible
* keep code reusable and generic

read-only types,
powerful type inference
deep support for polymorphism
completely structural type system


javascript doesn't expose pointers and references; instead it has
value type and reference type. values are immutable, and include
things like strings, numbers, and booleans, while references point to
often-mutable data structures like arrays, objects, and functions.

copying and aliasing

## chap1

type safety:
    using types to prevent programs from doing invalid things

linter

unit tests and end-to-end tests

typescript gives you error messages in your text editor, as you type.

* sketching out a program at the *type level* before you fill it in at the
    *value level*;
* think about edge cases as you design your program, not as an afterthought.

## chap2

typescript's features and the patterns

typescript's type annotation and type expression are only used by
`typechecker`, no runtime representation

typechecker:
    a program that verifies that your code is typesafe
type system:
    a set of rules that a typechecker uses to
    assign types to your program.

`let a: number = 1`
`modifer name: type = value`

building a mental model of how typescript/langauges works

strong type system do not allow implicit type convertion except in a few cases.

typescript throws both syntax-related errors and type-related errors at compile time.

incrementally compiled ==> instant feedback in editor

lots of errors that typescript can't catch 
* stack overflows
* broken network connections
* malformed user inputs

### setup

* code editor -- vscode
* node/npm 
* git
* terminal

#### typescript + node

* typescript: tsc command
* @types/node: ambient types for node
* ts-node: running typescript code directly without having to wait for it be compiled
* nodemon: watch for changes to our code and automatically restart
* rimraf: a cross-platform tool that acts like the `rm -rf`

```shell
npm init -y
npm i -D typescript @types/node ts-node nodemon rimraf
npx tsc --init --rootDir src --outDir build \
--esModuleInterop --resolveJsonModule --lib es6 \
--module commonjs --allowJs true --noImplicitAny true
```

ambient types are types that get added to the global execution
scope.

##### tsconfig.json

`lib` option adds ambient types to project, allowing us to rely
on features from different ecmascript versions.

`noImplicitAny` every varible needs to either have a specific type
or be explicitly declared `any`. no implicit `any`s

##### nodemon.json

```json
{
    "watch": ["src"],
    "ext": ".ts,.js",
    "ignore": [],
    "exec": "ts-node ./src/index.ts"
}
```

##### package.json

development startup script

```json
"start:dev": "nodemon",
```

production build script

```json
"build": "rimraf ./build && tsc",
```

production startup script

```json
"start": "npm run build && node build/index.js",
```

#### eslint

* eslint: the core ESLint linting library
* @typescript-eslint/parser: the parser that will allow ESLint to lint TypeScript code
* @typescript-eslint/eslint-plugin: a plugin that contains a bunch of ESLint rules that are TypeScript specific

```shell
npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

##### .eslintrc.json

```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "ignorePatterns": ["build", "node_modules"]
}
```

##### lint script

```json
"lint": "eslint . --ext .ts"
```

#### prettier

* prettier


```shell
npm i -D prettier
```

script

```json
"fmt": "prettier --write src/**/*.ts",
```

#### integration with editor(save and paste in event) and git(commit hook)

#### reading

[1](https://zhuanlan.zhihu.com/p/62401626)
[2](https://glebbahmutov.com/blog/configure-prettier-in-vscode/)

### setup summary

the trick is not to repeat configuration for same thing in diferent tool

type checker: code correctness, syntax rules and type rules  == git commit hook, live feedback in editor
linter: code conventions, code quality rules == git commit hook, live feedback in editor
formatter: formatting rules == git commit hook, stage files for commit and file save event
editorconfig: == live formatting

editor
git

[editorconfig](https://editorconfig.org/)
[prettier](https://prettier.io/)
[eslint](https://eslint.org/)
[typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)
[husky](https://github.com/typicode/husky)

[tutorial_0](https://khalilstemmler.com/blogs/typescript/node-starter-project/)
[tutorial_1](https://khalilstemmler.com/blogs/typescript/eslint-for-typescript/)
[tutorial_2](https://khalilstemmler.com/blogs/tooling/prettier/)
[tutorial_3](https://khalilstemmler.com/blogs/tooling/enforcing-husky-precommit-hooks/)
[starter_0](https://github.com/stemmlerjs/simple-typescript-starter)


source map
type definition file
debugger

babel(using tsc to type check and use babel to compile)
webpack bundler


### ts ecosystem

[ts](https://github.com/microsoft/TypeScript)
[wiki](https://github.com/Microsoft/TypeScript/wiki)
[handbook](https://github.com/microsoft/TypeScript-Handbook)
[new handbook](https://github.com/microsoft/TypeScript-New-Handbook)
[blog](https://devblogs.microsoft.com/typescript/)

starter

[starter ts node](https://github.com/microsoft/TypeScript-Node-Starter)
[starter ts node babel](https://github.com/microsoft/TypeScript-Babel-Starter)
[babel announce](https://devblogs.microsoft.com/typescript/typescript-and-babel-7/)
[blog entry](https://iamturns.com/typescript-babel/)
[starter ts react](https://github.com/microsoft/TypeScript-React-Starter)
[react ts conversion](https://github.com/microsoft/TypeScript-React-Conversion-Guide)
[ts samples](https://github.com/microsoft/TypeScriptSamples)

d.ts generation

[dts-gen](https://github.com/microsoft/dts-gen)
[webidl gen](https://github.com/microsoft/TSJS-lib-generator)
[linting .d.ts](https://github.com/microsoft/dtslint)
[tsd test](https://github.com/SamVerschueren/tsd)

plugin

[styled component](https://github.com/microsoft/typescript-styled-plugin)
[lit-html](https://github.com/microsoft/typescript-lit-html-plugin)

tsdoc

[tsdoc](https://github.com/microsoft/tsdoc)

ts-parsec

[ts-parsec](https://github.com/microsoft/ts-parsec)

editor

integration typescript language server, don't bother with eslint and prettier.

### emacs for development

typescript.el

    font-locking/syntax-highlighting
    auto indenting

https://github.com/emacs-typescript/typescript.el

ts-comint

https://github.com/emacs-typescript/ts-comint

tide: an interface between the typescript tools (tsc, tsserver) and emacs

    error checking
        type checking
        lint checking
    type display
    code completion
    source jumping/definition jump
    and more!

    flycheck
    eldoc
    company-mode


lsp-mode


http://redgreenrepeat.com/2018/05/04/typescript-in-emacs/
https://blog.takuchalle.dev/post/2018/10/17/emacs_typescript_setup/
https://www.reddit.com/r/emacs/comments/8s801f/best_package_for_working_with_typescript/
http://wikemacs.org/wiki/TypeScript
https://github.com/ananthakumaran/tide
https://github.com/theia-ide/typescript-language-server
https://github.com/emacs-lsp/lsp-mode

## chap3

type:
    a set of values and things you can do with them.

eg.
    boolean: true false
    operations:    ! || && ?
    number: the set of all numbers
    operations: + - * / % ** || && ? ! (javascript has a falsy system)
                .toFixed .toPrecision .toString
    string: the set all all strings
    operations: + || && ? ! and methods like .concat .toUpperCase

if you know a variable is type T, you know exactly what you can do with that T

```ts
function squareOf(n: number): number {
    return n ** 2;
}

squareOf(2)
squareOf('2') // TSError
```

compatible, assignable
**assignability**, bounds, constraints

you can assign a `string` value to a `unknow` type variable,
but you can't call `toUpperCase` on that variable.

```ts
let obj : unknown = 'hello'
obj.toUpperCase() // TSError
```

subtyping:
    super type  vs.  union type
    casting     vs.  refinement/narrowing


### any

make variable behave like it would in regular javascript

the set of all values
do anything with any

`noImplicitAny` in tsconfig.json, part of `strict`

if you want to use any, you have to be explicit about it.
explicitly annotating a variable with the any type.

* if you forgot to annotate a function's parameter
* if you imported an untyped javascript module

### unknown

the set of all values
limited operations( ==, ===, !, ||, &&, ?, refinement(typeof, instanceof), typecasting)

```ts
let obj : unknown = 'hello';

// casting
console.log((obj as string).toUpperCase())
// refinement
if(typeof obj === 'string') {
    console.log(obj.toUpperCase())
}
```

### boolean

true or false

== === !, ||, &&, ?, comparison

```ts
// type inference
let a = true  // boolean
const b = true // true
// explicit type annotation
let c: boolean = true
let d: true = true
let e: true = false // type 'false' is not assignable to type `true`
const f = false

const g = b === f // This condition will always return 'false' since the types '1' and '2' have no overlap.
```


type literal: a type that represents a single value an nothing else, using value as type.

using `const` will instruct typescript to infers type literal.(the most narrow type).

typescript infers different types for `let` and `const`

### number

the set of all numbers, integers, floats, positives, negatives, Infinity, NaN,
and so on.
+ - * / % ** comparison(<)

```ts
let a = 1234 // number
const b = 26.218 // 26.218

// you can use numeric separator in both type and value positions
let oneMillion = 1_000_000
```

### bigint

```ts
let a = 1234n
const b = 5678n
let c = 99.5n // Error
```

### string

set of all strings
concatenate (+) slice (.slice)

```ts
let a = 'hello'
const b = 'billy'
```


### symbol (typeof variableName)

used as alternative to string keys in objects and maps.
`well-known` symbol as keys of objects, defines protocol.
you can compare symbol using == or ===

```ts
let a = Symbol('h') // symbol
let b = Symbol('h') // typeof b == `unique symbol`
const c = a === b; // => false
 
const d: unique symbol = Symbol('h')
let e: unique symbol = Symbol('e') // error a variable whose type is a 'unique symbol' type must be 'const'
const f = Symbol('h');
const g = d === f; // This condition will always return 'false' since the types 'typeof d' and 'typeof f' have no overlap
```

### structure type

#### empty structrue (avoid)

```ts
// empty object
let a: object =  {x: 'x'} // {x: string} is assignable to object
a = 'hello' // Error

// avoid `{}` and `Object`
// use a linter to warn about 
let b: {} = {x: 'x'} // {x: string} is assignable to {}
b = 'hello' // success
```

#### inferred structure

```ts
let a = {x: 'x'}  // {x: string}
const b = {x: 'x'} // {x: string}
```

unlike primitive types, declaring an object with const
won't hint to typescirpt to infer its type more narrowly.
That's because javascript objects are mutable, and typescript
knows you might update their fields after you create them

#### explicit type annotation (object literal notation) *shape*

```ts
let a: {b: number} = {
    b: 1
}

let c: {firstName: string; lastName: string;} = {
    firstName: 'john',
    lastName: 'barrowman',
    age: 18, // TSError object literal can only known properties
}

class Person {
    #pr: string = 'a';
    firstName: string;

    lastName: string;

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName
        this.lastName = lastName
    }
    get pr() {
        return this.#pr;
    }
}

c = new Person('hello', 'h')
```

`{firstName: string; lastName: string;}` describes the
shape of an object, and both object literal and class instance

*by default typescirpt is pretty strict about object properties, don't expects less or more properties.*

```ts
let a: {
    b: number;
    c?: string;
    [key: number]: boolean;
}

a   =   { b :  1 }
a   =   { b :  1 ,   c :  undefined }
a   =   { b :  1 ,   c :   'd' }
a   =   { b :  1 ,   10 :  true }
a   =   { b :  1 ,   10 :  true ,   20 :  false }
a   =   { 10 :  true }            // Error Property 'b' is missing 
a   =   { b :  1 ,   33 :   'red' }  // Error Type 'string' is not assignable to type 'boolean'.
```
* readonly property `readonly propertyName: T`
    kind of like const for properties
* required property `propertyName: T`
* optional property `propertyName?: T`
* index signature `[key: T]: U`
    safely add more keys to an object, in addition to any keys that you explicitly declared
    you can use any word for the index signature key's name
    ```ts
    let airplaneSeatingAssignment: {[seatNumber: string]: string} = {
        '34D': 'Boris Cherny'
    }
    ```

### type aliases unions intersections

type level operations

#### aliases

```ts
type Age = number

type Person = {
    name: string;
    age: Age;
}

let age = 55;
let driver: Person = {
    name: 'James May',
    age,
}
```

* you can't declare a type aliase twice
* block-scoped, inner type alias declarations shadow outer ones

used for drying up repreated complex types
and with a descriptive type name

#### union and intersection

`|` type operator for union
    a value with a union type isn't necessarily one specific member of your union; in fact
    it can be both members at once
`&` type operator for intersection

```ts
type Cat = {name: string; purrs: boolean;}
type Dog = {name: string; barks: boolean; wags: boolean;}
type CatOrDogOrBoth = Cat | Dog
type CatAndDog = Cat & Dog
```

unions come up a lot more often

```ts
function trueOrNull(isTrue: boolean): string | null {
    if(isTrue) {
        return 'true'
    }
    return null
}
```

### array

special kinds of object
supporting concatenation, slicing, pushing, searching

```ts
// with initial array
let a = [1, 2, 3] // number[]
const b = ['a', 'b'] // string[]
const c = [1, 'a'] // (number | string)[]
c.push('blue')
c.push(true) // Error

// with empty array
const d = [] // d: any[]
d.push('h')  // d: string[]
d.push(8)    // d: (string | number)[]

// with explicit type annotation
let h: number[] = []
h.push(1)
h.push('red') // Error
```

keep arrays homogeneous, otherwise, you're going to have to
do more work to prove to typescript what you're doing is safe(type narrowing/refinement)

```ts
let d = [1, 'a']
d.map(i => {
    if(typeof i === 'number') {
        return i * 3
    }
    return i.toUpperCase() 
})
```

special case for empty array

type changes as element got pushed in
once array leaves the scope it was defined in, type will not change

```ts
function buildArray() {
    let a = []  // any[]
    a.push(1)   // number[]
    a.push('x') // (string | number)[]
    return a
}

let arr = buildArray() // (string | number)[]
arr.push(true) // Error

```

### tuples

subtype of array.
special way to type arrays that have fixed length, where
the values at each index have specific known types.
have to be explicitly typed

```ts
let a: [number] = [1]
let b: [string, string, number] = ['makcolm', 'gladwell', 1963]

// optional elements
let trainFares: [number, number?][] = [
    [3.75],
    [8.25, 7.70],
    [10.50],
]
// equivalently ([number] | [number, number])[]

// rest element `...` and must has an array type
// type tuples with minimum length
let friends: [string, ...string[]] = [
    'Saea', 'Tali', 'Chloe'
]
```

### readony array

```ts
let arr: readonly number[] = [1, 2, 3]
let n = arr[2]
arr[3] = 4 // Error
arr.push(5) // Error
```

other form of same thing

```ts
type A = readonly string[]
type B = ReadonlyArray<string>
type C = Readonly<string[]>

type D = readonly [number, string]
type E = Readonly<[number, string]>
```

### null type and undefined type

for compatible reason

`number | null` as optional, maybe type
`Promise<number | null>` as async equivalent

```ts
function a(x:number): number | null {
    if (x < 10) {
        return x
    }
    return null
}
```

### bottom type

`void`
    return type of a function that doesn't explicitly return anything(side affect function)

`Promise<void>` as async equivalent

```ts
function b(): void {
    let a = 2 + 2
    let b = a * a
}
```

`never`
    return type of a function that never returns( throws an exception or runs forever)

```ts
function c(): never {
    throw new TypeError('error')
}

function d() {
    while(true) {
        doSomething()
    }
}
```

### enums (weird feature)

lint rule to warn about non-const enum
and numeric values in enum

* string enums and number enums
* declaration merging
* *const enum with only string values*

```ts
enum Color {
    RED = 'red',
    GREEN = 'green'
}
```

```ts
// const enum with only string value
const enum Color {
    RED = 'red',
    GREEN = 'green'
}
```

`preserveConstEnums`

using literal type union

```ts
// type Color = 'red' | 'green'

const Color = {
    RED:'red',
    GREEN:'green'
} as const

type Color = typeof Color[keyof typeof Color]

function displayColor(color: Color): void { // using the type Color
    console.log(color)
}

displayColor(Color.GREEN) // using the value Color

```

## chap4 functions

previously, basic types: primitive type, object, array, tuple, enum

typescript's type inference and type assignability


### declaring and invoking functions

first-class:
    assign them to variables
    pass them to functions
    return them from functions
    assign them to objects and prototypes
    write properties to them, read those properties back

```ts
function add(a: number, b: number): number {
    return a + b;
}
```

inference rules
    * mandatory type annotation for parameters
    * optional annotation for return types, you should add annotation, because ts will check
        the function body with the return type annotation
    * *contextual typing*, function in the position where type already exists
        * callback

parameter:
    part of a function declaration
argument:
    a piece of data that you passed to a function when invoking it

#### two ways to declare optional parameter, you can't mix them

* using `?`

```ts
function log(message:string, userId?: string): void {
    let time = new Date().toLocaleTimeString()
    console.log(time, message, userId ?? 'Not signed in')
}
```

* using default value (use this approach)

```ts
function log(message:string, userId: string = 'Not signed in'): void { // you can omit type for userId 
    let time = new Date().toLocaleTimeString()
    console.log(time, message, userId)
}
```

both create the same signature `(message: string, userId?: string) => void`
vscode will display diferently `(message: string, userId?: string | undefined) => void` for
first case.

```ts
type Context = {
    appId?: string;
    userId?: string;
}

function log(message: string, context: Context = {}): void {
    let time = new Date().toISOString()
    console.log(time, message, context.userId)
}
```

#### rest parameter

variadic function

```ts
function sum(...numbers: number[]): number {
    return numbers.reduce((total, n) => total + n, 0)
}

sum(1, 2, 3)
```

at most one rest parameter
has to be the last one in the function's parameter list

#### different ways to call function

* using parenthess
* call
* apply
* bind

`strictBindCallApply` to check other ways of invoking function

```ts
add(100, 200)
add.call(null, 100, 200)
add.apply(null, [100, 200])
add.bind(null, 100, 200)()
```

#### `this` in normal function (don't use)

`this` depends on the way you called a function, and not on the
way that you declared it

ban `this` in normal function, ESLint rule, no-invalid-this.

or less safely

`noImplicitThis` to enfore this type in parameter.
note that this doesn't enforce this-annotations for classes,
or for functions on objects

```ts
function fancyDate(this: Date): string {
    return `${this.getDate}/${this.getMonth()}/${this.getFullYear()}`
}

fancyDate.call(new Date())
```

### generator functions

```ts
function* fib() { // fib(): Generator<number, void, unknown>
    let a = 0
    let b = 1
    while (true) {
        yield a;
        [a, b] = [b, a + b]
    }
}
```

`Generator<T, U, R>` is the subtype of `IterableIterator<T>`

Iterable:
    any object that contains a property called `Symbol.iterator`,
    whose value is a function that returns an iterator.
    using generator function to easily create iterable

    ```ts
    let numbers = {
        *[Symbol.iterator](): IterableIterator<number> {
            for(let n = 1; n <= 10; n++) {
                yield n
            }
        }
    }
    ```
Iterator:
    any object that defines a method called `next`, which returns
    an object with the properties `value` and `done`

should use this:

```ts
function* fib(): IterableIterator<number> {
    let a = 0
    let b = 1
    while (true) {
        yield a;
        [a, b] = [b, a + b]
    }
}
```

async counterpart: `AsyncIterableIterator<T>`

#### consuming generator function 

*  partial

```ts
const fibGen = fib();
fibGen.next() // {value: number; done: boolean}
```

* whole
    * for-of
    * spreading
    * destructuring

```ts
for (let a of numbers) {
    // ...
}

let allNumbers = [...numbers]

let [one, two, ...rest] = numbers
```

built-in iterables Array, Map, Set, String

### call signatures

express the full types of function

```ts
type A = typeof add // (a: number, b: number) => number
type A = (a: number, b: number) => number
type Logger = (message: string, context?: Context) => void
```

`(a: number, b: number) => number`, parameter names just
serve as documentation.

only contains type-level code(types only, no values)
 * parameter types
 * return types
 * optional types
 * rest types
 * this types

can't express default values.

```ts
// using call signature, not recommended
type Log = (message: string, userId?: string) => void

const log: Log = (message, userId = 'Not signed in') => {
    let time = new Date().toISOString()
    console.log(time, message, userId)
}
```

### overloaded function types

```ts
// shorthand notation
type Log = (message: string, userId?: string) => void

// full notation
type Log = {
    (message: string, userId?: string): void
}
```

* overloaded function signature
* model properties on functions(constructor, class)

overloaded function:
    functions with multiple call signature

multiple ways to call a function, return different result accordingly.

*output type actually depend on the input type for an argument*

```ts
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date { // return type can be omitted
    if(d !== undefined && y !== undefined) {
        return new Date(y, mOrTimestamp, d);
    } else {
        return new Date(mOrTimestamp)
    }
}

const d1 = makeDate(12345678)
const d2 = makeDate(5, 5, 5)
```

the signature of implementation is not visible from the outside.

```ts
/**
 * {
 *  (timestamp: number): Date;
 *  (m: number, d: number, y: number): Date;
 * }
 * 
 * /

type O = typeof makeDate
```

try to keep implementation signature as specific as possible
to make it easier to check the body of function, and make it easier
to implement the function.(you need to narrowing inside function body)

example, `createElement`

string HTML tag to HTML element

```ts
function createElement(tag: 'a'): HTMLAnchorELement;
function createElement(tag: 'canvas'): HTMLCanvasELement;
// ..
function createElement(tag: string): HTMLELement;
function createElement(tag: string): HTMLElement {
    // ..
}

```

if overloads have the same argument count and same return type, we can just use a 
union type as parameter

```ts
function len(s: string): number;
function len(arr: any[]): number;
function len(sOrArr: string | any[]): number {
    return sOrArr.length;
}

// just do this

function len(a: any[] | string): number {
    return a.length;
}
```

reservation example

```ts
type Reservation = unknown
function reserve(from: Date, to: Date, destination: string): Reservation;
function reserve(from: Date, destination: string): Reservation;
function reserve(destination: string): Reservation;
function reserve(fromOrDestination: Date | string, toOrDestination?: Date | string, destination?: string) {
    if(fromOrDestination instanceof Date && toOrDestination instanceof Date && destination !== undefined) {
        // round trip
    } else if (fromOrDestination instanceof Date && typeof toOrDestination === 'string') {
        // one way trip
    } else if (typeof fromOrDestination === 'string') {
        // one way trip right now
    }
}

// or just
function reserve(destination: string, from: Date = new Date(), to?: Date) {
    if(to !== undefined) {
        // round trip
    } else {
        // one way trip
    }
}

reserve('h')
reserve('h', new Date())
reserve('h', new Date(), new Date())
```

### generic function

concrete type vs. type parameter

boolean
string
Date[]
{a: number} | {b: string}
(numbers: number[]) => number

represent one or more type in parameter and return type as
type parameter.

enforce a type-level constraint in multiple places.

generics have scopes, ts makes sure that within the scope
all instances of the generic type parameter are eventually
boud to the same concrete types.

by convention, uppercase single-letter names T, U V W

```ts
function filter<T>(arr: T[], f: (item: T) => boolean): T[] {
    let result = [];
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        let item = arr[i]
        if(f(item)) {
            result.push(item)
        }
    }
    return result;
}
// you don't need to specify type parameter
filter([1, 2, 3, 4], number => number < 3) 
```

constraints:
    annotating a function parameter as `n: number` constriains the value of the parameter
    `n` to the type `nubmer`,
    using a gerneric `T` constrains the type of whatever type you bind to `T` to be the same
    type everywhere that `T` shows up.

can also be used in type aliases, classes, and interfaces

when ts will bind concrete types to generic?
* for functions, when you call them
* for classes, when you instantiate them
* for type aliases and interfaces, when you use or implement them

```ts
type Filter<T> = {
    (arr: T[], f: (item: T) => boolean):T[]
}

let fiter: Filter<number> = (arr, f) => {
    // ..
}
```

filter and map in std

```ts
interface Array<T> {
    filter(callbackfn: (value: T, index: number, array: T[]) => any, thisArg?: any): T[];
    map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
}
```

sometime you need to annotate the generic call

```ts
let promise = new Promise<number>(resolve => resolve(45))

promise.then(result => { // if you don't annotate previously, this will be unknown
    result * 4
})
```

#### using generics in type aliases

```ts
// define
type MyEvent<T> = {
    target: T;
    type: string;
}

// use
type ButtonEvent = MyEvent<HTMLButtonElement>

type TimedEvent<T> = {
    event: MyEvent<T>;
    from: Date;
    to: Date;
}

let myEvent: Event<HTMLButtonElement | null> = {
    target: document.querySelector('#myButton'),
    type: 'click',
}

function triggerEvent<T>(event: MyEvent<T>): void {
    // ...
}

triggerEvent({ // T infered to Element | null
    target: document.querySelector('#myButton'),
    type: 'mouseover',
})
```

#### bounded generics

safely use properties on the value of type parameter

```ts
type TreeNode = {
    value: string;
}
type LeafNode = TreeNode & {
    isLeaf: true;
}
type InnerNode = TreeNode & {
    children: [TreeNode] | [TreeNode, TreeNode];
}

let a: TreeNode = {value: 'a'}
let b: LeafNode = {value: 'b', isLeaf: true}
let c: InnerNode = {value: 'c', children: [b]}

// we preserve the input type(TreeNode, LeafNode, InnerNode) after the operation
// T has to be at least a TreeNode
function mapNode<T extends TreeNode>(node:T, f: (value: string) => string): T {
    return {
        ...node,
        value: f(node.value)  // bound enable safely reading of value
    }
}

// multiple constraints
type HasSides = {numberOfSides: number}
type SidesHaveLength = {sideLength: number}

function logPerimeter<Shape extends HasSides & SidesHaveLength>(s: Shape): Shape {
    console.log(s.numberOfSides * s.sideLength)
    return s;
}

type Square = HasSides & SidesHaveLength
let square: Square = {numberOfSides: 4, sideLength: 3}
logPerimeter(square);
```

example, typing variadic function, capturing the
number and individual type of unknown[]

```ts
function fill(length: number, value: string): string[] {
    return Array.from({length}, () => value)
}

function call<T extends unknown[], R>(
    f: (...args: T) => R,
    ...args: T
): R {
    return f(...args)
}

call(fill, 5, 'a') // T infers to [number, string], R infers to string[]
call(fill, 5, 5) // Error
call(fill, 5, 'a', 5) // Error
```

update call implementation to only work for functions whose second argument is a string

```ts
function call<T extends [unknown, string, ...unknown[]], R>(
    f: (...args: T) => R,
    ...args: T
): R {
    return f(...args)
}
```

is assertion function

```ts
// Compare a string and a string
is('string', 'otherstring') // false

// Compare a boolean and a boolean
is(true, false) // false

// Compare a number and a number
is(42, 42) // true

// Comparing two different types should give a compile-time error
is(10, 'foo') // Error TS2345: Argument of type '"foo"' is not assignable
// to parameter of type 'number'.

// [Hard] I should be able to pass any number of arguments
is([1], [1, 2], [1, 2, 3]) // false

function is<T>(a: T, ...b: [T, ...T[]]): boolean { // an array with minimal length
    return b.every(_ => _ === a)
}
```

#### generic type defaults

```ts
type MyEvent<T extends Element = Element> = {
    target: T;
    type: string;
}

// now we don't have to bind MyEvent T to Element
let myEvent: MyEvent = {
    target: document.querySelector('#myButton')!, // return Element | null
    type: 'click'
}
```

like in functions, generic types with defaults have to
appear after generic types without defaults

#### type-driven development

sketch out type signatures first, and fill in values later.

apply a expressive type system to a function,
the function's type signature might end up telling you
most of what you need to know about that function.

## chap5 class and interface

### class

declare classes with the `class` keyword, extend them with
the `extends` keyword.

preperties default to public and instance
change to static using `static`, change to private using `#`

constructor

`super`
 * setup inheritance in constructor
 * call super method, to overriding method

`this` as return type, standard js `Symbol.sepcies` 
    without it, you have to override the signature for
    each method that returns this
* chained APIs
* builder pattern

### interface

differences from type aliases

```ts
// type aliase
type Food = {
    calories: number;
    tasty: boolean;
}
type Sushi = Food & {
    salty: boolean;
}
type Cake = Food & {
    sweet: boolean;
}

// interface
interface Food {
    calories: number;
    tasty: boolean;
}
interface Sushi extends Food {
    salty: boolean;
}
interface Cake extends Food {
    sweet: boolean;
}
```

interface can extend any shape, an object type, a class, or anoher interface

* type aliases are more general
    righthand side can be any type, type expression(& and |)
    interface righthand side must be a shape.
    ```ts
    type A = number
    type B  = A | string
    ```
* when you extend an interface, ts will make sure that the interface you're
    extending is assignable to your extension.
    * same name properties should form subtype realtionship
    ```ts
    interface A {
        p: number | string;
        good(x: number):string;
        bad(x: number):string;
    }
    interface B extends A {
        p: number;
        good(x: string | number): string; 
        bad(x: string): string; // Error
    }
    ```
* multiple interfaces with the same name in the same scope are automatically merged.
    error for samme name type aliases
    this should be linter rule

use type aliases for type expresion
use interface for shape

#### `implements`

like other explicit type annotations, this is a convenient way to add a type-level
constraint that your class is implemented correctly.

user of class will `programming to interface`

adapters, factories, strategies

```ts
interface Animal {
    readonly name: string;
    eat(food: string): void;
    sleep(hours: number):void;
}

interface Feline {
    meow(): void;
}

class Cat implements Animal, Feline {
    #name = "MeowMeow"
    eat(food: string) {
        console.info(`Ate some ${food}. Mmm!`)
    }
    sleep(hours: number) {
        console.info(`Slept for ${hours} hours`)
    }
    meow() {
        console.info('Meow')
    }
    get name() {
        return this.#name;
    }
}
```

### more class

#### compatibility rule

classes are structured typed. a class is compatible with any other
type that shares its shape, including a regular old object that
defines the same properties or methods as the class.

`private identifier` change this, because you can't use private identifier
outside class body. then you must use the class or subclass to create instance.

```ts
class Cat {
    #name = "MeowMeow"
    eat(food: string) {
        console.info(`${this.#name} ate some ${food}. Mmm!`)
    }
    sleep(hours: number) {
        console.info(`${this.#name} slept for ${hours} hours`)
    }
    meow() {
        console.info(`${this.#name} Meow`)
    }
}

function make(cat:Cat) {
    cat.meow();
}

make(new Cat())

let obj = {
    #name : 'm', // Error you can't not use private identifier here
    eat(food: string){

    },
    sleep(hours: number) {
    },
    meow() {
        console.log('hello')
    },
}

make(obj) // Error lack of #name
```

#### class declare both values and types

type namespace
value namespace

```ts
// values
let a = 1999
function b() {}

// types
type a = number
interface b {
    (): void
}
```

contextual term resolution:
    type and value can have same name, depending on how you
    use a term, ts knows whether to resolve it to a type or to a value.

companion types, companion object pattern

class and enum generate both a type in the type namespace and a value
in the value namespace.

```ts
class C {}
let c: C = new C()

const enum E {F = 'F', C = 'C'}
let e: E = E.F
```

in compile time, we need a way to say 'this variable should be an instance
of this class'

in runtime, we need a way to represent a class, so we can instantiate it with
`new`, call static methods on it, do metaprogramming with it, and operate on it
with `instanceof`

how do you get the type of class itself?

`typeof` type operator, takes a value identifier get the type of identifier
like the javascript's value-level typeof

```ts
type State = {
    [key: string]: string;
}

class StringDataBase {
    state: State
    constructor(state: State = {}) {
        this.state = state;
    }
    get(key: string): string | null {
        return key in this.state ? this.state[key] : null
    }
    set(key: string, value: string): void {
        this.state[key] = value
    }
    static from(state: State) {
        let db = new StringDataBase();
        for (let key in state) {
            db.set(key, state[key])
        }
        return db;
    }
}

// instance type

interface StringDataBase {
    state: State;
    get(key: string): string | null;
    set(key: string, value: string): void;
}

// constructor type
// typeof StringDataBase
interface StringDataBaseConstructor {
    new(state?: State): StringDataBase;
    from(state: State): StringDataBase;
}
```

### generic in class and interface

scope a generic to whole class or interface, or to specific method

```ts
class MyMap<K, V> { // available on instance method and instance properties

    // constructor should not declare generics, move to class instead
    constructor(initialKey: K, initialValue: V) {}

    get(key: K): V {}

    set(key: K, value: V): void {}

    // instance method declare their own generics
    merge<K1, V1>(map: MyMap<K1, V1>): MyMap<K | K1, V | V1> {}

    // static method do not have access to class's generics
    static of<K, V>(k: K, v: V): MyMap<K, V> {}
}

interface MyMap<K, V> {
    get(key: K): V
    set(key: K, value: V): void
}

let a = new MyMap('k', true) // MyMap<string, boolean>
let b = new MyMap<string, number>()
```

### trait(interface with default implementation of method)

method implementation in terms of other method

role-oriented programming

```ts
type ClassConstructor<T> = new(...args: any[]) => T // the type of a constructor type's parameter has to be `any[]`

function withDebug<C extends ClassConstructor<{getDebugValue(): object}>>(klass: C) {
    return class extends klass {
        // constructor(...args: any[]) {
        //     super(...args)
        // }

        debug() {
            let name = klass.name
            let value = this.getDebugValue() // contract method
            return `${name}(${JSON.stringify(value)})`
        }
    }
}

class User {
    #id: number;
    #firstName: string;
    #lastName: string;
    constructor(id: number, firstName: string, lastName: string) {
        this.#id = id;
        this.#firstName = firstName;
        this.#lastName = lastName;
    }

    getDebugValue() {
        return {
            id: this.#id,
            name: `${this.#firstName} ${this.#lastName}`
        }
    }
}

const DebugUser = withDebug(User)

let user = new DebugUser(3, 'hello', 'world')

console.log(user.debug())
```

### decorators

`experimentalDecorator : true`

class
class method
property
method parameter

requires a function in scope with the given name
and required signature for that type of decorator.

decorators don't work on normal function
[anwser](https://stackoverflow.com/questions/31771856/decorators-on-functions)

### other class idiom and pattern

* abstract class `new.target` non-instantiatable
* final class `new.target` non-extensible, method nonoveridable
* mixin pattern: derive class from expression
* multiple inheritance

inheritance of type = interface
inheritance of behavior = trait
inheritance of state and behavior = class, mixin(derive class from expression)

class is for *custom type*, singleton(like connection object for database) is not
class.

factory pattern:
    create objects of some type, leaving the decision of which concrete object
    to create to the specific factory that creates the object.

```ts
interface Shoe {
    purpose: string;
}

class BalletFlat implements Shoe {
    purpose = 'dancing'
}
class Boot implements Shoe {
    purpose = 'woodcutting'
}
class Sneaker implements Shoe {
    purpose = 'walking'
}

const Shoe = {
    // consumer shouldn't know what concrete class they'll get
    create(type: 'balletFlat' | 'boot' | 'sneaker'): Shoe { 
        switch (type) {
            case 'balletFlat': return new BalletFlat()
            case 'boot': return new Boot()
            case 'sneaker': return new Sneaker()
        }
    }
}
```

companion object pattern:
    a value and a type with the same name,
    as a way to signal that value provides methods
    for operating on the type

builder pattern:
    separate the construction of an object from the way that
    object is actually implemented

## chap6 advance types

### relationship between types, type compatibility

you can safely use a subtype where supertype is required.

variance
    invariance
    covariance
    contravariance
    bivariance

shape:
    covariant in their property types.
    for an object A to be assignable to B, each of its properties
    must be subtype of or the same as its corresponding property in B.

    may lead to unsafe behavior, (don't mutate, delete object property)
generic type
function
    contravariant at parameter type, covariant at return type
    requires less, provides more

assignability:
    if A is subtype of or the same as B, you can use a type A where
    type B is required.

    A is `any`

### type widening(inference rule):
    ts will be lenient when inferring your types

```ts
let a = 'x' //string
let b = 3   //number
let c = true//boolean
const d = {x: 3} // {x: number}

// more strict

const a = 'x'
const b = 3
const c = true
const d: {x: 3} = {x : 3}
```

when you reassign a nonwidened type using `let` or `var`,
ts widens it for you. to tell ts to keep it narrow, add an
explicit type annotation to your original declaration.

```ts
const a  = 'x'  // 'x'
let b = a       // string

const c: 'x' = 'x' // 'x'
let d = c          // 'x'
```

variables initialized to null or undefined are widened to any,
when the variable leaves the scope it was declared in, ts assigns
it a definite type

```ts
function x() {
    let a = null // any
    a = 3        // any
    a = 'x'      // any
    return a
}

x() // string
```

### the `const` type modifier

opt out of type widening in value declaration.
recursively marks its member as `readonly`

```ts
let a = {x: 3} // {x: number}
let b = {x: 3} as const // {readonly x: 3}

let c = [1, {x: 2}] // (number | {x: number})[]
let d = [1, {x: 2}] as const // readonly [1, {readonly x: 2}]
```

### excess property checking(assignable checking)

object types are covariant in their members, with excess property
checking for object literal.

when you try to assign a *fresh object literal type* T to another type U,
and T has properties that aren't presetn in U, ts reports an error.

fresh object literal type:
    the type ts infers from an object literal

if that object literal either use a type assertion or is assigned to a
variable, then the fresh object literal type is widened to a regular
object type, and its freshness disappears.

```ts
type Options = {
    baseURL: string;
    cacheSize?: number;
    tier?: 'prod' | 'dev';
}

class API {
    constructor(private options: Options) {}
}

new API({
    baseURL: 'http://api.com',
    tier: 'prod'
})

new API({
    baseURL: 'http://api.com',
    tierr: 'prod' // Error object literal may only specifiy known properties
})

new API({
    baseURL: 'http://api.com',
    tierr: 'prod' 
} as Options)

let badOption = {
    baseURL: 'http://api.com',
    tierr: 'prod' 
}
new API(badOption)

let badOption1: Options = {
    baseURL: 'http://api.com',
    tierr: 'prod' // Error object literal may only specifiy known properties
}
new API(badOption1)
```

### refinement

flow-based type inference.
    refine types within a block of code, and is alternative to Haskell/Ocaml pattern matching
    embed a symbolic execution engine in the typechecker to give feedback to the typechecker
    and reason through a program in a way that is closer to how a human programmer might do it.

symbolic evaluator

use control flow statement like `if`, `?`, `||`, `??`, and `switch`,
as well as type queries like `typeof`, `instanceof` and `in`, to refine
types as it goes.

```ts
type Unit = 'cm' | 'px' | '%'
const units: Unit[] = ['cm', 'px', '%']

function parseUnit(value: string): Unit | null {
    for(const unit of units) {
        if(value.endsWith(unit)) {
            return unit
        }
    }
    return null
}

type Width = {
    unit: Unit;
    value: number;
}
function parseWidth(width?: number | string): Width | null {
    if(width == null) { // nullish checking
        return null;
    }
    // if input is number, unit default to px
    if(typeof width === 'number') { // typeof checking
        return {unit: 'px', value: width}
    }

    let unit = parseUnit(width)
    if(unit) { // truthy checking
        return {unit, value: Number.parseFloat(width)}
    }
    return null
}
```

#### discriminated union for shape

members of a union might overlap

```ts
type UserTextEvent = {value: string, target: HTMLInputElement}
type UserMouseEvent = {value: [number, number], target: HTMLElement}
type UserEvent = UserTextEvent | UserMouseEvent

function handle(event:UserEvent) {
    if(typeof event.value === 'string') {
        event.value // string
        event.target // HTMLInputElement | HTMLElement
    }

    event.value // [number, number]
    event.target // HTMLInputElement | HTMLElement
}

type UserTextEvent = {type: 'TextEvent'; value: string, target: HTMLInputElement}
type UserMouseEvent = {type: 'MouseEvent'; value: [number, number], target: HTMLElement}
type UserEvent = UserTextEvent | UserMouseEvent

function handle(event:UserEvent) {
    if(event.type === 'TextEvent') {
        event.value // string
        event.target // HTMLInputElement
    }

    event.value // [number, number]
    event.target //  HTMLElement
}
```

refinement based on the value of tagged field, because they are mutually exelusive

### exhaustiveness checking, totality (pattern matching)

allow typechecker to make sure you've covered all your cases.

```ts
type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'
type Day = Weekday | 'Sat' | 'Sun'

function getNextDay(w: Weekday): Day {
    switch(w) {
        case 'Mon': 
            return 'Tue';
        case 'Tue':
            return 'Wed';
        case 'Wed':
            return 'Thu';
        case 'Thu':
            return 'Fri';
        case 'Fri':
            return 'Sat';
    }
}
```

`noImplicitReturns`

```ts
// not all code path  return a value
function isBig(n: number) {
    if( n>= 100 ) {
        return true
    }
}
```

### type operators

#### keying-in

```ts
type APIResponse = {
    user: {
        userId: string
        friendList: {
            count: number
            friends: {
                firstName: string
                lastName: string
            }[]
        }
    }
}
// key-in using string literal type and number literal type
type FriendList = APIResponse['user']['friendList']
type Friend = APIResponse['user']['friendList']['friends'][number] // can be 0 and number
type FriendList = APIResponse['user']['userId' | 'friendList']
```

#### keyof

```ts
type UserKeys = keyof APIResponse['user'] // 'userId' | 'friendList'
```

typesafe getter function that looks up the value at the given key in an object:

```ts
function get<O extends object, K extends keyof O>(o: O, k: K): O[K] {
    return o[k];
}

// O[keyof O] a union of property type

type ActivityLog = {
    lastEvent: Date
    events: {
        id: string
        timestamp: Date
        type: 'Read' | 'Write'
    }[]
}

const activityLog: ActivityLog = // ...
const lastEvent = get(activityLog, 'lastEvent') // Date

// three times deep
function get<O extends object,
             K1 extends keyof O>(o: O, k1: K1): O[K1];
function get<O extends object,
             K1 extends keyof O,
             K2 extends keyof O[K1]>(o: O, k1: K1, k2: K2): O[K1][K2];
function get<O extends object,
             K1 extends keyof O,
             K2 extends keyof O[K1],
             K3 extends keyof O[K1][K2]>(o: O, k1: K1, k2: K2, k3: K3): O[K1][K2][K3];
function get(obj: any, ...keys: string[]) {
    let result = obj;
    keys.forEach(k => result = result[k])
    return result;
}

get(activityLog, 'events', 0, 'type') // 'Read' | 'Write'
```

#### type utility

* `Record<Keys, PropertyType>`

```ts
type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'
type Day = Weekday | 'Sat' | 'Sun'

type map = Record<Weekday, Day> // {Mon: Day, Tue: Day, ...}
const nextDay: Record<Weekday, Day> = {
    // ...
}
```

extra degree of freedom campared to regular object index signature.
constrain the types of an object's keys to an union, instead of string or number

* mapped type in shape

special syntax like index signature

type MyMappedType = {
    [Key in UnionType]: ValueType
}

you can't put other property names in MappedType

```ts
type map = {[K in Weekday]: Day}
const nextDay: {[K in Weekday]: Day} = {
    // ...
}
```

how Record is defined:

```ts
type Record<K extends keyof any, T> = {
    [P in K]: T
}
```

together with `keyof` and key in, let you modify shape

```ts
type Account0 = {
    id: number
    isEmployee: boolean
    notes: string[]
}

// all properties optional
type OptionalAccount = {
    [K in keyof Account0]? : Account0[K]
}
// all properties nullable
type NullableAccount = {
    [K in keyof Account0]: Account0[K] | null
}
// all properties read-only
type ReadonlyAccount = {
    readonly [K in keyof Account0] : Account0[K]
}

// all properties writable again
type Account2 = {
    -readonly [K in keyof ReadonlyAccount]: ReadonlyAccount[K]
}
// all properties required again
type Account3 = {
    [K in keyof OptionalAccount]-?: OptionalAccount[K]
}
```

`-` a special type operator only available with mapped type.
`-` has a corresponding `+` type operator. within a mapped type,
`readonly` is equivalent to `+readonly`, `?` is equivalent to `+?`

built-in mapped type utilities

```ts
/**
 * Make all properties in T optional
 */
type Partial<T> = {
    [P in keyof T]?: T[P];
};

/**
 * Make all properties in T required
 */
type Required<T> = {
    [P in keyof T]-?: T[P];
};

/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

/**
 * Construct a type with a set of properties K of type T
 */
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

### companion object pattern

pair together a type and an object

```ts
export const Unit = {
    EUR: 'EUR',
    GBP: 'GBP',
    JPY: 'JPY',
    USD: 'USD',
} as const

export type Unit = typeof Unit[keyof typeof Unit]

export type Currency = {
    unit: Unit
    value: number
}
export const Currency = {
    DEFAULT_UNIT: 'USD',
    from(value: number, unit?: Unit): Currency {
        if(unit == null) {
            unit = this.DEFAULT_UNIT as Unit
        }
        return {unit, value}
    }
}
```

```ts
import { Unit, Currency } from "./types.ts";

const amountDue: Currency = {
    unit: 'JPY',
    value: 83733.10,
}

const amount: Currency = {
    unit: Unit.GBP,
    value: 100,
}

Currency.DEFAULT_UNIT

Currency.from(10, Unit.JPY)
```

in the same scope, you can have the same name bound
to both a type and a object.
with the object providing utility methods that operate
on the type.

### improving type inference for tuples

```ts
let a = [1, true] // (number, boolean)[]

let aa: [number, boolean] = [1, true]
// type assertion
let as = [1, true] as [1, true]
// const assertion
let ac = [1, true] as const
```

take advantage of the way typescript infers types for rest parameter

```ts
function tuple<T extends unknown[]>(...ts: T): T {
    return ts;
}

let at = tuple(1, true) // [number, boolean]
```

### user-defined type guards

refinement does not cross over scope

```ts
function isString(a: unknown): boolean {
    return typeof a === 'string'
}

function parseInput(input: string | number) {
    if(isString(input)) {
        input // string | number
    }
}
```
default type guard: typeof instanceof
`is` operator
*user-defined type guard*

limit to a single parameter

```ts
function isString(a: unknown): a is string {
    return typeof a === 'string'
}

type LegacyDialog =  // ...
type Dialog =  // ...

function isLegacyDialog(dialog: LegacyDialog | Dialog): dialog is LegacyDialog {
    // ...
}
```

without this feature you'd have to inline all your typeof and instanceof type guards
instead of building functions to perform those checks in a better-encapsulated,
more readable way.

### conditonal types

subtype relationship condition

declare a type T that depends on types U and V;
if U <: V, then assign T to A, and otherwise, assign T to B

```ts
type IsString<T> = T extends string ? true : false

type A = IsString<string> // true
type B = IsString<number> // false
```

like regular ternary expression, you can nest them too.
is a type expression, you can use them almost anywhere you can use
a type: in type aliases, interfaces, classes, parameter types, and
generic defaults in functions and methods

ternary operator(?:)

condition ? evaluated-when-true : evaluated-when-false

nested

condition ? value : (condition ? value : value)

```ts
let a = false ? 'a' : false ? 'b' : false ? 'c' : 'd' // d

let b = true ? true ? true ? 'a' : 'b' : 'c' : 'd'    // a
```

#### distribute union types over the conditional's branches

```ts
(string | number | boolean) extends T ? A : B
// equivalent to
(string extends T ? A : B) | (number extends T ? A : B) (boolean extends T ? A : B)

type ToArray<T> = T[]
type A = ToArray<number> // number[]
type B = ToArray<number | string> // (number | string)[]

type ToArray2<T> = T extends unknown ? T[] : T[]
type C = ToArray2<number | string> // nubmer[] | string[]
```

```ts
// works for union type
type Without<T, U> = T extends U ? never : T;
type A = Without<
    boolean | number | string,
    boolean>
type A1 = Without<boolean, boolean>
        | Without<number, boolean>
        | Without<string, boolean>
type A2 = (boolean extends boolean ? never : boolean)
        | (number extends boolean ? never : number)
        | (string extends boolean ? never : string)
type A3 = never | number | string
```

#### `infer`

declare generic type parameters
* angle brackets
* infer in conditional types

```ts
type ElementType<T> = T extends unknown[] ? T[number] : T;
type A = ElementType<string[]>; // number

// using infer
type ElementType<T> = T extends (infer U)[] ? U : T;
```

to get type of an array type's element, just use keying-in operator `[]`
`string[][number]`

```ts
type SecondArg<F> = F extends (a: any, b: infer B) => any ? B : never
// get the type of Array.slice
type Fun = typeof Array['prototype']['slice']
type A = SecondArg<Fun> // number | undefined
```

built-in conditional types

### escape hatches (not safe)

#### type assertions

you can only assert that a type is a supertype or a subtype of itself.

```ts
function formatInput(input: string) {}

function getUserInput(): string | number {}

formatInput(getUserInput() as string)
```

linter: no-angle-bracket-type-assertion

assert as any
any is assignable to anything

#### non-null assertions

`T | null` or `T | null | undefined`

non-null assertion operator `!`

##### definite assignment assertions

```ts
let userId!: string;
fetchUser();
userId.toUpperCase(); // OK
function fetchUser() {
  userId = globalCache.get('userId');
}
```

### simulating nominal types/opaque types

```ts
type CompanyID = string;
type OrderID = string;
type UserID = string;
type ID = CompanyID | OrderID | UserID;

function queryForUser(id: UserID) {
  // ...
}

let id: CompanyID = 'b4843361';
queryForUser(id); // OK (!!!)
```

*type branding* technique

built-in *nominal type aliases*

make it hard to accidentally use a wrong type

```ts
type CompanyID = string & { readonly brand: unique symbol };
type OrderID = string & { readonly brand: unique symbol };
type UserID = string & { readonly brand: unique symbol };
type ID = CompanyID | OrderID | UserID;

function CompanyID(id: string) {
  return id as CompanyID;
}
function OrderID(id: string) {
  return id as OrderID;
}
function UserID(id: string) {
  return id as UserID;
}

function queryForUser(id: UserID) {
  // ...
}
let companyId = CompanyID('8a6076cf');
let orderId = OrderID('9994acc1');
let userId = UserID('d21b1dbf');
queryForUser(userId); // OK
queryForUser(companyId); // Error
```

## chap7

ts does everything it can to move *runtime exception*
to compile time. eg. misspelled names, null pointer exceptions.

* network and filesystem failures
* errors parsing user input
* stack overflows, and out of memory errors, this can't not be handled inside js

[error handling strategies](https://www.youtube.com/watch?v=pvYAQNT4o0I)

[Error Handling in Node.js](https://www.joyent.com/node-js/production/design/errors)

*reproducible error*

### return null

* lose information, why the operation failed
* hard to compose: having to check for null after every opertion can become verbose
    as you start to *nest* and *chain* operations.

!
??  ||
?.

```ts
function parse(birthDay: string): Date | null {
    // ...
}
function display(date: Date): void {
    console.info(`Date is ${date.toISOString()}`)
}
// to use
let date = parse()
if(date) {
    display(date)
} else {
    console.error('Error parsing date for some reason')
}
```

### throw exception

handle specific failure modes and have metadata about
the failure

```ts
function parse(birthDay: string): Date {
    let date = new Date(birthDay)
    if(!isValid(date)) {
        throw new RangeError('Enter a date in the form YYYY/MM/DD')
    }
    return date;
}

// only handle the parsing error, rethrow other exceptions,
// so we don't silently swallow every possible error

try {
    display(parse()) // composable
} catch (e) {
    if( e instanceof RangeError) {
        console.error(e.message)
    } else {
        throw e
    }
}

// we might want to subclass the error for more specific
class InvalidDateFormatError extends RangeError {}
class DateIsInFutureError extends RangeError {}
function parse(birthDay: string): Date {
    let date = new Date(birthDay)
    if(!isValid(date)) {
        throw new InvalidDateFormatError('Enter a date in the form YYYY/MM/DD')
    }
    if(date.getTime() > Date.now()) {
        throw new DateIsInFutureError('Are you in future?')
    }
    return date;
}
function display(date: Date): void {
    console.info(`Date is ${date.toISOString()}`)
}
try {
    display(parse())
} catch (e) {
    if( e instanceof InvalidDateFormatError) {
        console.error(e.message)
    } else if (e instanceof DateIsInFutureError) {
        console.error(e.message)
    } else {
        throw e
    }
}
```

wrapping any number of operations in single try/catch,
we don't have to check each operation for failure.

ts doesn't encode exception as part of a function's signature
ts doesn't check for unhandled exception

```ts
/**
 * @throws {InvalidDateFormatError} The user entered their birthday incorrectly.
 * @throws {DateIsInFutureError} The user entered a birthday in the future.
*/
function parse(birthDay: string): Date {
    // ...
}
```

re-throw in catch needs finally to do logging and cleanup

```ts
function getData() {
    let timestamp = performance.now()
    try {
        // fetch data
        // ...
    } catch(err) {
        // deal with any error
    }
    console.log(`getData() took ${performance.now() - timestamp}`);
}
// if you rethrow in catch, you need to log inside finally
function getData() {
    let timestamp = performance.now()
    try {
        // fetch data
        // ...
    } catch(err) {
        if(err instanceof FetchError) {
            // deal with any error
        } else {
            throw err
        }
    } finally {
        console.log(`getData() took ${performance.now() - timestamp}`);
    }
}
```

If code in your program throws an exception and no catch clause catches it, the
program will print a stack trace and exit.

Becase of node's asynchronous nature, exceptions that occur in callbacks or event
handlers must be handled locally or not handled at all.

```js
function syncError() {
    throw new Error('exception')
}

async function asyncError() {
    throw new Error('rejection')
}


// for deno
// catch success
try {
    syncError()
} catch (error) {
    console.log(error.message)
} finally {
    console.log('sync error finished')
}
// catch success
try {
    await asyncError()
} catch (error) {
    console.log(error.message)
} finally {
    console.log('async error finished')
}
// can't catch
try {
    asyncError()
} catch (error) {
    console.log(error.message)
} finally {
    console.log('async error finished')
}

// for node

// async function main() {
//     try {
//         syncError()
//         await asyncError() // if you ommit `await` rejection will not be caught
//         asyncError()
//     } catch (error) {
//         console.log(error.message)
//     } finally {
//         console.log('finished')
//     }
// }

// main()
```

If you don't want these exceptions to cause your program to completely
crah, register a global handler function

```js
process.setUncaughtExceptionCaptureCallBack(e => {
    console.error('Uncaught exception:', e)
})
```

a similar situation arises if a Promise created by your program
is rejected and there is no .catch() invocation to handle it.

```js
process.on('unhandledRejection', (reason, promise) => {
    // resson is whatever value would have been passed to a .catch() function
    // promise is the Promise object that rejected
})
```

### union

just return the error

```ts
function parse(birthDay: string): Date | InvalidDateFormatError | DateIsInTheFutureError {
    // ...
}
function display(date: Date): void {
    // ...
}

// consumer is forced to handle all three cases
let result = parse();
if(result instanceof InvalidDateFormatError) {
    // error
} else if (result instanceof DateIsInTheFutureError) {
    // error
} else {
    display(result)
}
```

encode likely exception in parse's signature.
communicate to consumers which specific exceptions might be thrown
force consumer to handle or rethrow each of the exception

```ts
// lazy consumer can just swallow all error
let result = parse()
if(result instanceof Error) {
    // error
} else{
    display(result)
}
```

chaining and nesting error-giving operations can quickly get verbose

```ts
// you can't compose
display(parse()) // error

// explicit handle or throw down stream
// the list of possile errors that a consumer has to handle grows quickly
function x(): T | Error1 {
  // ...
}
function y(): U | Error1 | Error2 {
  let a = x();
  if (a instanceof Error) {
    return a;
  }
  // Do something with a
}
function z(): U | Error1 | Error2 | Error3 {
  let a = y();
  if (a instanceof Error) {
    return a;
  }
  // Do something with a
}
```

### monad -- monadic return type, chainable return type

[option](https://en.wikipedia.org/wiki/Option_type)
[result](https://en.wikipedia.org/wiki/Result_type)
[blog post](https://medium.com/software-ascending/do-or-do-not-patterns-and-antipatterns-with-the-try-type-c77a63f74cc9)

a powerful way to work with series of operations that may or may not
succeed.
* excellent type safety
* signal to cosumer via the type system that a given operation might fail.

don't interoperate with code that doesn't use `Option`

```ts
interface Option<T> {
    map<U>(f: (value: T) => None): None;
    map<U>(f: (value: T) => Option<U>): Option<U>;
    getOrElse(value: T): T;
}
class Some<T> implements Option<T> {
    #value: T;
    constructor(value: T) {
        this.#value = value;
    }

    map<U>(f: (value: T) => None): None;
    map<U>(f: (value: T) => Some<U>): Some<U>;
    map<U>(f: (value: T) => Option<U>): Option<U> {
        return f(this.#value)
    }

    getOrElse(): T {
        return this.#value
    }
}

class None implements Option<never> {
    map(): None {
        return this;
    }
    getOrElse<U>(value: U): U {
        return value
    }
}

function Option<T>(value?: null | undefined): None;
function Option<T>(value: T): Some<T>;
function Option<T>(value: T): Option<T> {
    if(value == null) return new None()
    return new Some(value)
} 

let result = Option(6)
            .map(n => Option(n * 3))
            .map(() => Option())
            .getOrElse(7)

console.log(result);
```

in ts, every complex type is covariant in its member -- objects,
classes, arrays, and function return types -- with one exception:
funciton parameter types, which are contravariant.

a function A is a subtype of function B if:

* A has the same or lower arity(number of parameters) than b
* A's this type either isn't specified, or is >: B's this type
* each of A's parameter is >: its corresponding parameter in B
* A's return type is <: B's return type

some languages are invariant in property types
some languages have different rules for mutable and immutable objects
some languages even have explicit syntax for programmers to specify variance for their own data types.


