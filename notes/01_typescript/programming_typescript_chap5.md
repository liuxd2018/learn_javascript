# class

this
super
new.target
extends

static
private identifier
constructor method
Symbol.sepcies

class
new 
instanceof


* class for custom type
    * declare both value and type
* compatibility rule for class
    * without private identifier, structured
    * with private identifier, must be the instance of the clas or instance of subclass

interfaces and type aliases

```ts
// type aliase, any type, type expression
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

type A = number
type B  = A | string

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

compatibility rule for shape, must have the required properties

compatibility rule for function, less specific input, more specific output

class implements interface, programming to interface

```ts
class Cat implements Animal, Feline {
    // ...
}
```

type level declaration and value level declaration

```ts
// values
let a = 1999
function b() {}

// types
type a = number
interface b {
    (): void
}

// both
const enum {}
class {}
```

contextual term resolution

companion pattern, a value and a type have same name.

`typeof` as type operator

generic
    bounds
    default

```ts
type MyMap<K, V> = {
    get(key: K): V | null;
    set(key: K, value: V): void;
}

interface MyMap<K, V> {
    get(key: K): V | null;
    set(key: K, value: V): void;
}

let a = new MyMap('k', true) // MyMap<string, boolean>
let b = new MyMap<string, number>()

type ClassConstructor<T> = new(...args: any[]) => T

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
```