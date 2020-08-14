function norm(list: number[]): number {
  let result = 0;
  for (let i = 0; i < list.length; i++) {
    result += list[i] * list[i];
  }
  return Math.sqrt(result);
}

let l = [3, 4];
console.log(norm(l));

export interface IVec<T> {
  get(index: number): T;
  len(): number;
}

export class Point implements IVec<number> {
  #a: number;
  #b: number;
  #c: number;
  constructor(a: number, b: number, c: number) {
    this.#a = a;
    this.#b = b;
    this.#c = c;
  }
  get(index: number): number {
    if (index > 2 || index < 0) {
      throw new Error('index outof bound');
    }
    switch (index) {
      case 0:
        return this.#a;
      case 1:
        return this.#b;
      case 2:
        return this.#c;
      default:
        throw new Error('index is not integer');
    }
  }
  len(): number {
    return 3;
  }
}

export function norm2(list: IVec<number>): number {
  let result = 0;
  for (let i = 0; i < list.len(); i++) {
    result += list.get(i) * list.get(i);
  }
  return Math.sqrt(result);
}

let p = new Point(1, 2, 2);
console.log(norm2(p));

const Color = {
  RED: 'red',
  BLUE: 'blue',
} as const;

type Color = typeof Color[keyof typeof Color];
// (typeof Color)[keyof (typeof Color)]

type a = keyof any;

type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';
type Day = Weekday | 'Sat' | 'Sun';

type map = { [K in Weekday]: Day };

type Record<Keys extends keyof any, Value> = {
  [k in Keys]: Value;
};

type map2 = Record<Weekday, Day>;

type Account0 = {
  id: number;
  isEmployee: boolean;
  notes: string[];
};

type OptionalAccount = Partial<Account0>;

type aa<T> = string | number | boolean extends T ? 'A' : 'B';
// equivalent to
type bb<T> =
  | (string extends T ? 'A' : 'B')
  | (number extends T ? 'A' : 'B')
  | (boolean extends T ? 'A' : 'B');

type t = aa<boolean>;
type t2 = bb<boolean>;

type ToArray<T> = T[];
type A = ToArray<number>; // number[]
type B = ToArray<number | string>; // (number | string)[]

type ToArray2<T> = T extends unknown ? T[] : T[];
type C = ToArray2<number | string>; // nubmer[] | string[]

type ElementType<T> = T extends (infer U)[] ? U : T;
type E = ElementType<string[]>; // string
type F = ElementType<[string]>; // string
type G = ElementType<[string | number]>; // string | number

type arr = [string, number, ...string[]][number];
