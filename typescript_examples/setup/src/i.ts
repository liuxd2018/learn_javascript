import { Unit, Currency } from "./types";

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


let a = [1, true] // (number, boolean)[]

let aa: [number, boolean] = [1, true]
// type assertion
let as = [1, true] as [1, true]
// const assertion
let ac = [1, true] as const

function tuple<T extends unknown[]>(...ts: T): T {
    return ts;
}

let at = tuple(1, true) // [number, boolean]

function isString(a: unknown): a is string {
    return typeof a === 'string'
}

function parseInput(input: string | number) {
    if(isString(input)) {
        input // string | number
    }
}