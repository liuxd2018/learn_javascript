import { Option } from './error';

let result = Option(6)
  .map((n) => Option(n * 3))
  .map(() => Option())
  .getOrElse(7);

console.log(result);
