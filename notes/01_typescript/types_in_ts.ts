// unknown
// number, string, bigint, boolean, symbol
// never
// object
// Function

type a = string

// nominal type aliases, even if types have the same data
// you cannot assign across types
type PersonId = number & {_type?: 'PersonId'}
type BlogPostId = number & {_type?: 'BlogPostId'}

let personId: PersonId = 12
let blogPostId: BlogPostId = 13

personId + blogPostId // works
personId = blogPostId // error

type Branding<T> = {
    _type? : T
}
type Brand<T, BrandTag> = T & Branding<BrandTag>

type PersonId = Brand<number, 'PersonId'>

// escape hatch: any

// type literal
type b = 'hello'

// `|`, need refinement to work with the value of this type
type c = 'hello' | 'world'
type d = string | number
// discriminated union

// `&`
type e = string & number
type f = (string | number) & string
type h = {a: string} & {b: number}
// simulating nominal type
type i = string & {_brand?: 'id'} // using `i` to explicit annotate variable

// value declaration
let a = 'hello'
const b = 'hello'
// typeof type operation 'get the type of value variable'
type g = typeof b

// reference type (shape) `readonly` `?` `[key: type]: type`
type Gender = 'male' | 'female'
type ShapeType = {
    readonly age: number;
    name: string;
    gender?: Gender;
    [key: number]: number;
}

// array `readonly`, `?` `...`
type arr1 = number[]
type arr2 = (number | string)[]
type arr3 = readonly number[]
type arr4 = [string, ...string[]] // array with minimum length
type tuple1 = [number]
type tuple2 = [string, number, string]
type tuple3 = [number, number?] // equivalently [number] | [number, number]
type tuple4 = readonly [number, string]

// function type `?` `...`

// shorthand notation
type Log1 = (message: string, userId?: string) => void

// full notation
type Log2 = {
    (message: string, userId?: string): void
}
// interface notation
interface Log3 {
    (message: string, userId?: string): void
}

// optional parameter and rest parameter
type O = (message: string, userId?: string, ...rest: number[]) => void

// special type for function
// number | undefined optional input

// never

// void               finish signal
// Promise<void>           async finish signal

// number | null      optional output
// Promise<number | null>  async optional output

// IterableIterator<number>
// IterableIterator<number | null>
// AsyncIterableIterator<number>
// AsyncIterableIterator<number | null>

// generic `extends` constrait, default

// generic functions
type Filter1 = <T>(arr: T[], f: (item: T) => boolean) => T[]
type Filter<T> = {
    (arr: T[], f: (item: T) => boolean): T[]
}
interface Filter2<T> {
    (arr: T[], f: (item: T) => boolean): T[]
}

// generic shape
type MyEvent<T>  = {
    target: T;
    type: string;
}
interface MyEvent1<T> {
    target: T;
    type: string;
}

// shape extending each other: `extends` `&`

// type aliase
type Food = {
    calories: number;
    tasty: boolean;
}
type Sushi = Food & {
    // tasty: number;  // this place create `never` type
    salty: boolean;
}
// interface
interface Food1 {
    calories: number;
    tasty: boolean;
}
interface Sushi1 extends Food1 {
    // tasty: number; // this place create error
    salty: boolean;
}

// value level binding
// let const function class

// type level binding
// type interface class

// type expression
// shape {}
// array []
// function () =>
// or `|`
// and  `&`
// typeof

// operation on object type
// key in `[]`
// `keyof`
// mapped  `{[k in keyof t]: t[k]}`

// assertion
// as const
// as type
// as any
// !

// optional type operation
// t extends u ? i : v