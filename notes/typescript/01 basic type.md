# boolean

let isDone: boolean = false;

# number

let decimal: number= 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

*all numbers in typescript are floating point values*

# string(textual data)

## old string

let color: number = "blue";
color = 'red';

## template strings

- span multiple lines (`)
- have embedded expressions (${ expr })

let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ fullName }.

I'll be ${age + 1} years old next month.`;

# array

- two ways to write array type annotation

let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];

# tuple

let x: [string, number] = ["hello", 10];

- when accessing an element outside the set known indices, a union type is used

x[3] = "world"; // ok 'string' can be assigned to 'string|number'
console.log(x[5].toString()); // ok 'string' and 'number' both have 'toString'
x[6] = true; // error, 'boolean' isn't 'string|number'

# enum

**
- enum is a way of giving more friendly names to sets of numeric values

enum Color {Red, Green, Blue}
let c: Color = Color.Green;

# any

- describe the type of varibles is not kown
- opt-out type checking
- `Object` play a similar role in other languages

let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false;

let list: any[] = [1, true, 'free'];

# void

- the absence of having any type at all
- return type of functions that do not return a value

funciton warnUser(): void {
    console.log("This is my warning message");
}

# null and undefined

let u: undefined = undefined;
let n: null = null;

- in `--strictNullChecks` null and undefined are only assignable to void and their respective types
- you want to pass in either a string or null or undefined, you can use union type string|null|undefined

# never

- the return type for a function expression or an arrow function expression that always throws an exception
- variables acquire the type never when narrowed by any type guards that never be true

function error(message: string): never {
    throw new Error(message);
}

function infiniteLoop(): never {
    while(true) {

    }
}

# object

- non-primitive type, any thing that is not number, string, boolean, symbol, null, or undefined

declare function create(o: object|null): void;

create({prop: 0}); // ok
create(null) // ok

create(undefined); // error
create(42); // error

# type assertions

- like type cast in other languages, but performs no special checking or restructing of data.
- no runtime impact, and is used purely by the compiler

let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;





 


