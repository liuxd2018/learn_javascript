top type: unknown
    you can perform boolean operation on unknown, because of falsy and truthy system
    you can perform comparison on unknown(binary operation) 

type narrowing
    * refinement
    * type assertion

value type (primitives, immutable, copy semantic for assignment operator)
    * number
    * bigint
    * boolean
    * string
    * symbol

type literal: using value at type position
    * unit type, has single value
    * infer rule for let and const with value type or reference type
    * comparision (==, ===) between different type literal always return false error

subtyping and type compatibility
    a string value assigned to a unknown variable, you can't call string method on it.

bottom type: never

other bottom like type:
    `void` for sideeffect function signal completion  `Promise<void>`
    `null` together with union type to express optional output `number | null` `Promise<number | null>`
    `undefined` together with union type to express optional input `number | undefined`

reference type / shape(structured compatibable, mutable, alias semantic for assignment operator)

defining shape:
    * required and readonly
    * required
    * optional
    * index signature

```ts
interface Shape {
    readonly age: number;
    name: string;    // somewhat analogous to function parameter type
    gender?: number;
    [key: number]: number;
}

let airplaneSeatingAssignment: {[seatNumber: string]: string} = {
        '34D': 'Boris Cherny'
}
```

empty shape --- object

you can't assign null to structure type: strictNullCheck

escape hatch type: any

*type-level code*
    code that exclusively of types and type operators

*type level expression*
    * 1 'txt'
    * number, string
    * {a: number;}
    * number | null
    * Foldable & Printable
    * typeof valueIdentifier

*type level binding* `type` `interface`
    type Name = typeExpresion

*type level parameter*: generics `Array<T>`

*using generic* `type a = Array<number>`

union ==> type narrowing
    discriminated union type

subtyping:
    super type  vs.  union type
    casting     vs.  refinement/narrowing(`typeof`, `instanceof`, switch for type literal)

intersection

array

readonly array

tuple: normally have fixed length.

readonly tuple

```ts
// array
number[]
(number | string)[]
unknown[]
any[]

// tuple
[number]
[string, number, string]
[number, number?] // equivalently [number] | [number, number]
[string, ...string[]] // array with minimum length

// readonly array and tuple
readonly number[]
readonly [number, string]
```

inference rule for array and tuple
    * array type become more specific in the same scope with adding elements
    * tuple need to explicitly declared

const enum with only string value. and preserveConstEnums

```ts
function n(): never {
    throw new Error('error')
}

type A = typeof n
```

how import and export works with type level binding?

companion pattern: a value and a type have same name.

```ts
// lib.ts

// type Color = 'red' | 'green'
export const Color = {
    RED:'red',
    GREEN:'green'
} as const

export type Color = typeof Color[keyof typeof Color]
```

```ts
// main.ts
import { Color } from "./example.ts";

function displayColor(color: Color): void { // using the type Color
    console.log(color)
}

displayColor(Color.GREEN) // using the value Color
```

some declaration create both type level binding and value level binding. (class, enum)

some operator works in both type position and value position (typeof)

---

declaration: alter environment(type checking env and runtime env)

    pattern/assignment: bind variable

statement: executed to take action, one by one, wait if necessary, alter state

expression: evaluated to compute some value


how to see the type of some thing?

* type A = typeof someThingIdentifier
* vscode hover
* npx tsc --declaration src/functions.ts
* deno doc src/functions.ts

and this three is not consistent.
