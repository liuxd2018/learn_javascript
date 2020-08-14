# subtype relationship between types

objects, classes, arrays:
    covariant in its member

functions(require less specific, provides more specific):
    same or lower arity, contravariant in this type and parameter type;
    convariant in return type

# assignability

is A assignable to B?

* A is subtype of B
* A is the same type of B
* A is `any`

# widening/lenient inference rule

`as const` assertion

# excess property checking when object literal is assigned to typed position

* function parameter
* variable has type annotation

when freshness lost

* assigned to a annotation less variable
* type assertion

# control-flow-based typechecking

## refinement

### union of primitive types

if(nullable)

typeof

```ts
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

### user-defined type guards

refinement does not cross over scope

default type guard: typeof instanceof

`is` operator

```ts
function isString(a: unknown): a is string {
    return typeof a === 'string'
}

function isLegacyDialog(dialog: LegacyDialog | Dialog): dialog is LegacyDialog {
    // ...
}
```

### union of literal types

switch

if and ===

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


## discriminated union types (union of structure types)

```ts
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

## totality

```ts
export interface IVec<T> {
    get(index: number): T;
    len(): number;
}

export class Point implements IVec<number> {
    #a: number
    #b: number
    #c: number
    constructor(a: number, b: number, c: number) {
        this.#a = a;
        this.#b = b;
        this.#c = c;
    }
    get(index: number): number {
        if(index > 2 || index < 0) {
            throw new Error('index outof bound');
        } 
        switch (index) {
            case 0:
                return this.#a
            case 1:
                return this.#b
            case 2:
                return this.#c
            default:  // if lack, ts will report error
                throw new Error("index is not integer"); 
        }
    }
    len():number {
        return 3;
    }
}

export function norm2(list: IVec<number>): number {
    let result = 0;
    for(let i = 0; i < list.len(); i++) {
        result += list.get(i) * list.get(i)
    }
    return Math.sqrt(result)
}

let p = new Point(1, 2, 2)
console.log(norm2(p))
```

# keying-in operator

`typeIdentifier[acc]`:
`acc` can ben string literal type `user`, `number` type, string literal union
return object type, array type, union type.

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
type FriendList = APIResponse['user']['friendList']
type Friend = APIResponse['user']['friendList']['friends'][number]
type FriendList = APIResponse['user']['userId' | 'friendList']
```

# `keyof` operator

get the keys of object type to an union

```ts
// type safe getter
function get<O extends object, K extends keyof O>(o: O, k: K): O[K] {
    return o[k];
}
```

## simulating typesafe enum

companion object pattern + `typeof` + keying in:

```ts
const Color = {
    RED: 'red',
    BLUE: 'blue',
} as const

type Color = typeof Color[keyof typeof Color]
// (typeof Color)[keyof (typeof Color)]
```

# mapped type (operation on object type / shape)

```ts
type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'
type Day = Weekday | 'Sat' | 'Sun'

type map = {[K in Weekday]: Day}

type Record<Keys extends keyof any, Value> = {
    [k in Keys]: Value
}
type map2 = Record<Weekday, Day>
```

together with `keyof` operator and keying in operator,
let you modify object types.

```ts
/**
 * Make all properties in T optional
 */
type Partial<T> = {
    [P in keyof T]?: T[P];
};

type Account0 = {
    id: number
    isEmployee: boolean
    notes: string[]
}

type OptionalAccount = Partial<Account0>
```

# companion object and function pattern

can import one name, get two things a value and a type

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

# improving type inference for tuples

take advantage of how ts infer types for rest parameters

```ts
function tuple<T extends unknown[]>(...ts: T): T {
    return ts;
}

let at = tuple(1, true) // [number, boolean]
```

# conditonal types

returns a type

```ts
type IsString<T> = T extends string ? true : false

type A = IsString<string> // true
type B = IsString<number> // false

// distributive -- operation for unions


type ToArray<T> = T[]
type A = ToArray<number> // number[]
type B = ToArray<number | string> // (number | string)[]

type ToArray2<T> = T extends unknown ? T[] : T[]
type C = ToArray2<number | string> // nubmer[] | string[]

type Without<T, U> = T extends U ? never : T;
type D = Without<
    boolean | number | string,
    boolean>

// infer
type ElementType<T> = T extends (infer U)[] ? U : T;
type E = ElementType<string[]>; // string
type F = ElementType<[string]>; // string
type G = ElementType<[string | number]>; // string | number

// to get the element type of array, just using keying in
type arr = [string, number, ...string[]][number] // string | number

// operation on function type
type SecondArg<F> = F extends (a: any, b: infer B) => any ? B : never
// get the type of Array.slice
type Fun = typeof Array['prototype']['slice']
type A = SecondArg<Fun> // number | undefined
```

# type assertions

* as string
* as any
* non-null assertion
* definite assignment assertion

# opaque type aliases / nominal type for *string or number aliases*

the problem:

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

type branding

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
