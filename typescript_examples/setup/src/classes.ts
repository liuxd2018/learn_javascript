class Hello {
    readonly hello: string = 'default';
    num?: number;
    constructor(number: number);
    constructor(hello: string);
    constructor(hello: string|number) {
        if(typeof hello === "string") {
            this.hello = hello
        } else {
            this.num = hello
        }
    }
        


}

type O = typeof Hello;

interface A {
    p: string | number;
    good(x: number):string;
    bad(x: number):string;
}
interface B extends A {
    p: number;
    good(x: string | number): string; 
    // bad(x: string): string; // Error
}

interface User {
    name: string
}

interface User {
    age: number;
}

// interface Animal {
//     readonly name: string;
//     eat(food: string): void;
//     sleep(hours: number):void;
// }

// interface Feline {
//     meow(): void;
// }

class Cat {
    #name = "MeowMeow"
    eat(food: string) {
        console.info(`${this.#name} ate some ${food}. Mmm!`)
    }
    sleep(hours: number) {
        console.info(`${this.#name} slept for ${hours} hours`)
    }
    meow() {
        console.info(`${this.#name} Meow`)
    }
}

function make(cat:Cat) {
    cat.meow();
}

make(new Cat())

// let obj = {
//     #name : 'm',
//     eat(food: string){

//     },
//     sleep(hours: number) {
//     },
//     meow() {
//         console.log('hello')
//     },
// }

// make(obj)


type State = {
    [key: string]: string;
}

class StringDataBase {
    state: State
    constructor(state: State = {}) {
        this.state = state;
    }
    get(key: string): string | null {
        return key in this.state ? this.state[key] : null
    }
    set(key: string, value: string): void {
        this.state[key] = value
    }
    static from(state: State) {
        let db = new StringDataBase();
        for (let key in state) {
            db.set(key, state[key])
        }
        return db;
    }
}

// instance type

interface StringDataBase {
    state: State;
    get(key: string): string | null;
    set(key: string, value: string): void;
}

// constructor type
// typeof StringDataBase
interface StringDataBaseConstructor {
    new(state?: State): StringDataBase;
    from(state: State): StringDataBase;
}


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

class User {
    #id: number;
    #firstName: string;
    #lastName: string;
    constructor(id: number, firstName: string, lastName: string) {
        this.#id = id;
        this.#firstName = firstName;
        this.#lastName = lastName;
    }

    getDebugValue() {
        return {
            id: this.#id,
            name: `${this.#firstName} ${this.#lastName}`
        }
    }
}

const DebugUser = withDebug(User)

let user = new DebugUser(3, 'hello', 'world')

console.log(user.debug())
console.log(User.name)