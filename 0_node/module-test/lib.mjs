import {pt} from './deep-lib.mjs'
export {hello} from "./deep-lib.mjs"
console.log("hello module")
export const repeat = (string) => `${string} ${string}`;
export function shout(string) {
  console.log("hek");
  return `${string.toUpperCase()}!`;
}

pt(); // -> 1
