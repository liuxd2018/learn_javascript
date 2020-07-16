
interface Option<T> {
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

function Option<T>(value?: null | undefined): None;
function Option<T>(value: T): Some<T>;
function Option<T>(value: T): Option<T> {
    if(value == null) return new None()
    return new Some(value)
} 

let result = Option(6)
            .map(n => Option(n * 3))
            .map(() => Option())
            .getOrElse(7)

console.log(result);