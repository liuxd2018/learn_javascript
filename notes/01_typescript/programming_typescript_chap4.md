# functions

* primitive type
* reference type
    * object (shape)
    * array / tuple

inference rule
compatibility rule

function as first class

declaring and invoking functions in type safe manner

parameter

* required parameter `name: type`
* optional parameter with default value (`T | undefined`) `name: type = value` `name?: type`
* rest parameter `...name: type[]`  `...name: [type, ...type[]]`

return type

* sync
    * sideeffect `void`
    * value  `type`
    * optional value `type | null`
    * generator `IterableIterator<type>` `IterableIterator<type | null>`
* async
    * sideeffect `Promise<void>`
    * value `Promise<type>`
    * optional value `Promise<type | null>`
    * async generator `AsyncIterableIterator<type>` `AsyncIterableIterator<type | null>`

invoking

* single returned value
    * func()
    * call/apply/bind
    * await func()
* multiple returned value
    * partial `.next()`
    * full
        * for-of, for-await-of
        * spreading
        * destructuring
    
callable type, call signature

```ts
type A = (a: number, b: number) => number
type Logger = (message: string, context?: Context) => void
```

function with default value parameter `context: Context = {}`
    different input number and same output type
function with union type parameter    `id: string | number`
    different input type and same output type
function with overloaded call signature
    different input type and different output type
generic function
    type not pre-defined, has the same type

shothand notation and full notation

```ts
// shorthand notation
type Log = (message: string, userId?: string) => void

// full notation
type Log = {
    (message: string, userId?: string): void
}
```

overloaded function:
    functions with multiple call signature
    the signature of implementation is not visible from the outside.
    implementation needs type narrowing

callable type compatibility rule:
    subtype, less specific in parameter, more specific in return type

generic function
    declarating and invoking

```ts
// concrete type
boolean
string
Date[]
{a: number} | {b: string}
(numbers: number[]) => number
```

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
// sometime you need to 
filter([1, 2, 3, 4], number => number < 3) 

let promise = new Promise<number>(resolve => resolve(45))

promise.then(result => { // if you don't annotate previously, this will be unknown
    result * 4
})
```

```ts
type Filter = <T>(arr: T[], f: (item: T) => boolean) => T[]


type Filter<T> = {
    (arr: T[], f: (item: T) => boolean):T[]
}
```

T in Array scope, U in map scope

```ts
interface Array<T> {
    filter(callbackfn: (value: T, index: number, array: T[]) => any, thisArg?: any): T[];
    map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
}
```

generic in type aliases

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

bouded generics
    using properties on the value of generic

```ts
type HasSides = {numberOfSides: number}
type SidesHaveLength = {sideLength: number}

function logPerimeter<Shape extends HasSides & SidesHaveLength>(s: Shape): Shape {
    console.log(s.numberOfSides * s.sideLength)
    return s;
}

let square = {numberOfSides: 4, sideLength: 3}
logPerimeter(square);
```

generic defaults

```ts
type MyEvent<T extends Element = Element> = {
    target: T;
    type: string;
}
```

rest parameter is array typed

```ts
// generic call function
function call<T extends unknown[], R>(
    f: (...args: T) => R,
    ...args: T
): R {
    return f(...args)
}
// call function only work for functions whose second argument is a string
function call<T extends [unknown, string, ...unknown[]], R>(
    f: (...args: T) => R,
    ...args: T
): R {
    return f(...args)
}
```