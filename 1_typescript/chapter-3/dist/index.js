"use strict";
// any is the set of all values, you can do anything with any
// don't use it 
let a = 666;
let b = ['danger'];
let c = a + b; // runtime error
// unknown is the set all values, you can compare them to find out the exact type(Refinement)
// == === || && ? ! typeof instanceof
// use it as placeholder to fill in
let d = 30;
let e = d === 123;
//let f = d + 10 // ts error
if (typeof d === 'number') {
    let g = d + 10;
}
// boolean and boolean literal
// ts infers different types for let and const, Type Widening
let h = true; // boolean
const i = true; // true
let j = true; // true
// number
let k = 1; // number
const l = 2; // 2
let m = 3; // 3
// biginit
let n = 1234n;
const o = 1234n;
let p = 1234n;
//# sourceMappingURL=index.js.map