# return nullable value union

* checked, signal to consumer
* not composable
    must using refinement to use the operation result

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

# throw exception

* not checked, must provides documentation for consumer
* composable
* error meta data

```ts
function parse(birthDay: string): Date {
    let date = new Date(birthDay)
    if(!isValid(date)) {
        throw new RangeError('Enter a date in the form YYYY/MM/DD') // error meta data
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
```

# return result and error union

* must using refinement to use the result, not support nesting(composition) and chaining

# monad, chainable return type with error

```ts
// option.ts

export type Option<T> =  {
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

export function Option<T>(value?: null | undefined): None;
export function Option<T>(value: T): Some<T>;
export function Option<T>(value: T): Option<T> {
    if(value == null) return new None()
    return new Some(value)
}
```

```ts
// using option
import { Option } from "./error.ts";

let result = Option(6)
    .map(n => Option(n * 3))
    .map(() => Option())
    .getOrElse(7)

console.log(result);
```