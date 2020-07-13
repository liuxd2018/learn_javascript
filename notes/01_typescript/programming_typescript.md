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
// type tuples with minimunlengths
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

## chap 4 functions

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

triggerEvent({
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

