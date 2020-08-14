[blog](https://devblogs.microsoft.com/typescript/)

[old doc](https://www.typescriptlang.org/docs/home.html)

# typescript in 5 minutes

```shell
npm i -g typescript

tsc greeter.ts
```

type annotations

```ts
function greeter(person: string): string { // type annotation
    return `Hello, ${person}`
}

let user = 'Jane User' // type inference

greeter(user)
```

structure compatible(subtyping rule) for object

```ts
interface Person {
    firstName: string
    lastName: string;
}

function greeter(person: Person) {
    return `Hello, ${person.firstName} ${person.lastName}`
}
// implements will make sure your class compatible with the interface specified
class Student implements Person {
    // firstName: string;
    // lastName: string;
    fullName: string;
    constructor(public firstName: string, middleInitial: string, public lastName: string) { // using public avoid declaring and assignment
        this.fullName = `${firstName} ${middleInitial} ${lastName}`
        // this.firstName = firstName
        // this.lastName = lastName
    }
}

let user1 = {firstName: 'Jane', lastName: 'User'}
let user2 = new Student('Jane', 'M.', 'User')

greeter(user1)
greeter(user2)
```

toolings

* hover over identifiers to see their type
* completion list: typing .
* parameter help: typing ()
* go to definition
* refactoring -- rename a symbol

type checking js

--checkJs

// @ts-check

type defiitions for third part module

DefinitelyTyped

npm i -D @types/node


# migrating from javascript

# react & webpack