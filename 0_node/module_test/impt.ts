// import {hello, Hello, print} from './hello.ts'


//dynamic import don't works with type export
const hello = await import('./hello.ts')

// let hi: Hello = 'hello'

// console.log(hello)

// print(hi);

console.log(hello.Hello)