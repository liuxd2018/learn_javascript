 function add(a: number, b: number): number{
    return a + b;
}

//  interface Context  {
//     appId?: string;
//     userId?: string;
// }

//  function log(message:string, context: Context = {}): void{
//     let time = new Date().toISOString()
//     console.log(time, message, context.userId)
// }

function sum(...numbers: number[]): number {
    return numbers.reduce((total, n) => total + n, 0)
}

const r = sum(1, 2, 3)
console.log(r)

add(100, 200)
add.call(null, 100, 200,)
add.apply(null, [100, 200])
add.bind(null, 100, 200)()

let obj = {
    hello() {
        console.log(this.hello)
    }
}

function fancyDate(this: Date): string {
    return `${this.getDate}/${this.getMonth()}/${this.getFullYear()}`
}

fancyDate.call(new Date())

export function* fib(): IterableIterator<number> {
    let a = 0
    let b = 1
    while (true) {
        yield a;
        [a, b] = [b, a + b]
    }
}

let numbers = {
    *[Symbol.iterator](): IterableIterator<number>  {
        for(let n = 1; n <= 10; n++) {
            yield n
        }
    }
}

for (let a of numbers) {
    // ...
}

let allNumbers = [...numbers]

let [one, two, ...rest] = numbers

type A = typeof log;


type Log = (message: string, userId?: string) => void

const log: Log = (message, userId = 'Not signed in') => {
    let time = new Date().toISOString()
    console.log(time, message, userId)
}

function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number) {
    if(d !== undefined && y !== undefined) {
        return new Date(y, mOrTimestamp, d);
    } else {
        return new Date(mOrTimestamp)
    }
}

const d1 = makeDate(12345678)
const d2 = makeDate(5, 5, 5)

type O = typeof makeDate


function filter<T>(arr: T[], f: (item: T) => boolean): T[] {
    let result = [];
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        let item = arr[i]
        if(f(item)) {
            result.push(item)
        }
    }
    return result;
}

let li = filter([1, 2, 3, 4], number => number < 3)

console.log(li)

let promise = new Promise<number>(resolve => resolve(45))

promise.then(result => { // if you don't annotate previously, this will be {}
    result * 4
})

// tree

type TreeNode = {
    value: string;
}
type LeafNode = TreeNode & {
    isLeaf: true;
}
type InnerNode = TreeNode & {
    children: [TreeNode] | [TreeNode, TreeNode];
}

let a: TreeNode = {value: 'a'}
let b: LeafNode = {value: 'b', isLeaf: true}
let c: InnerNode = {value: 'c', children: [b]}

// we preserve the input type(TreeNode, LeafNode, InnerNode) after the operation
// T has to be at least a TreeNode
function mapNode<T extends TreeNode>(node:T, f: (value: string) => string): T {
    return {
        ...node,
        value: f(node.value)  // bound enable safely reading of value
    }
}

// multiple constraints
type HasSides = {numberOfSides: number}
type SidesHaveLength = {sideLength: number}

function logPerimeter<Shape extends HasSides & SidesHaveLength>(s: Shape): Shape {
    console.log(s.numberOfSides * s.sideLength)
    return s;
}

type Square = HasSides & SidesHaveLength
let square: Square = {numberOfSides: 4, sideLength: 3}
logPerimeter(square);


function fill(length: number, value: string): string[] {
    return Array.from({length}, () => value)
}

function call<T extends unknown[], R>(
    f: (...args: T) => R,
    ...args: T
): R {
    return f(...args)
}

call(fill, 5, 'a') // T infers to [number, string], R infers to string[]
call(fill, 5, 5) // Error
call(fill, 5, 'a', 5) // Error

type MyEvent<T extends Element = Element> = {
    target: T;
    type: string;
}

// now we don't have to bind MyEvent T to Element
let myEvent: MyEvent = {
    target: document.querySelector('#myButton')!,
    type: 'click'
}


function is<T>(...args: T[]): boolean {
    const [one, two, ...rest] = args;
    if(one === two) {
        return is(two, ...rest)
    } else {
        return false
    }

}

is('string', 'otheri')
is(true, false)
is(10, 'foo')

is([1], [1, 2], [1, 2, 3])


function reserve(destination: string, from: Date = new Date(), to?: Date) {
    if(to !== undefined) {
        // round trip
    } else {
        // one way trip
    }
}

reserve('h')
reserve('h', new Date())
reserve('h', new Date(), new Date())

let aa : number[] = []

let bb: [number, ...number[]] = [1]