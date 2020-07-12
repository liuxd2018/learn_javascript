import { add } from './lib';
import { readFile } from 'fs/promises';
import { TextDecoder } from 'util';

console.log(add(4, 5));

async function _() {
  const content = await readFile('test.txt');
  const text = new TextDecoder('utf8').decode(content);
  console.log(text);
}

_().catch((error) => {
  console.log(error.message);
});

// console.log(import.meta)

let a = 1 + 2
let b = a + 3
let c = {
  apple: a,
  banana: b,
}
let d = c.apple * 4
console.log(d)

let obj : unknown = 'hello'
obj.toUpperCase()