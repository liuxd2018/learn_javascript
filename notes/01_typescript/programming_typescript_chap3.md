top type: unknown

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
    * infer rule for let and const
    * comparision (==, ===) between different type literal always return false error

subtyping and type compatibility
    a string value assigned to a unknown variable, you can't call string method on it.

bottom type: never

other bottom like type:
    void for sideeffect function signal completion  Promise<void>
    null together with union type to express optional  number | null Promise<number | null>
    undefined

reference type / shape(structured compatibable, mutable, alias semantic for assignment operator)

defining shape:
    * required and readonly
    * required
    * optional
    * index signature

empty shape --- object

you can't assign null to structure type: strictNullCheck

escape hatch type: any

type level expression
    * 1 'txt'
    * number, string
    * {a: number;}
    * number | null
    * Foldable & Printable
    * typeof valueIdentifier
type level binding
    type Name = typeExpresion

union ==> type narrowing
    discriminated union type
intersection

array

readonly array

tuple

readonly tuple

const enum with only string value. and preserveConstEnums

```ts
function n(): never {
    throw new Error('error')
}

type A = typeof n
```

how import and export works with type level binding?

```ts
// lib.ts
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


type-level code
    code that exclusively of types and type operators