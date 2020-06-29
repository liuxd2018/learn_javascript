const x = 42

console.log(typeof x) //typeof operator

console.log(typeof null) // should output null, but output object

const a = {b: 'b'}
const b = {b: 'b'}
const c = a
console.log(a === b)
console.log(a === c)