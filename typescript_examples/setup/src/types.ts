// // let a = 'x' //string
// // let b = 3   //number
// // let c = true//boolean
// // const d = {x: 3} // {x: number}

// // more strict

// // const a = 'x'
// // const b = 3
// // const c = true
// // const d: {x: 3} = {x : 3}

// // const e = d;
// // let f = c

// type Options = {
//     baseURL: string;
//     cacheSize?: number;
//     tier?: 'prod' | 'dev';
// }

// class API {
//     constructor(private options: Options) {}
// }

// new API({
//     baseURL: 'http://api.com',
//     tier: 'prod'
// })

// new API({
//     baseURL: 'http://api.com',
//     tierr: 'prod' // Error object literal may only specifiy known properties
// })

// new API({
//     baseURL: 'http://api.com',
//     tierr: 'prod'
// } as Options)

// let badOption = {
//     baseURL: 'http://api.com',
//     tierr: 'prod'
// }
// new API(badOption)

// let badOption1: Options = {
//     baseURL: 'http://api.com',
//     tierr: 'prod' // Error object literal may only specifiy known properties
// }
// new API(badOption1)

// type Unit = 'cm' | 'px' | '%'
// const units: Unit[] = ['cm', 'px', '%']

// function parseUnit(value: string): Unit | null {
//     for(const unit of units) {
//         if(value.endsWith(unit)) {
//             return unit
//         }
//     }
//     return null
// }

// type Width = {
//     unit: Unit;
//     value: number;
// }
// function parseWidth(width?: number | string): Width | null {
//     if(width == null) { // nullish checking
//         return null;
//     }
//     // if input is number, unit default to px
//     if(typeof width === 'number') { // typeof checking
//         return {unit: 'px', value: width}
//     }

//     let unit = parseUnit(width)
//     if(unit) { // truthy checking
//         return {unit, value: Number.parseFloat(width)}
//     }
//     return null
// }

// type UserTextEvent = {type: 'TextEvent'; value: string, target: HTMLElement}
// type UserMouseEvent = {type: 'MouseEvent'; value: [number, number], target: HTMLElement}
// type UserEvent = UserTextEvent | UserMouseEvent

// function handle(event:UserEvent) {
//     if(event.type === 'TextEvent') {
//         event.value // string
//         event.target // HTMLInputElement
//     }

//     event.value // [number, number]
//     event.target //  HTMLElement
// }
// let a: HTMLElement = document.getElementById('#id')!
// let e: UserTextEvent = {value: 'h', target: a}

// type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'
// type Day = Weekday | 'Sat' | 'Sun'

// // type map = Record<Weekday, Day>
// type map1 = {
//     name: string;
//     [K in Weekday]: Day;

// }
// const nextDay: {[K in Weekday]: Day} = {
//     // ...
// }

// function getNextDay(w: Weekday): Day {
//     switch(w) {
//         case 'Mon':
//             return 'Tue';
//         case 'Tue':
//             return 'Wed';
//         case 'Wed':
//             return 'Thu';
//         case 'Thu':
//             return 'Fri';
//         case 'Fri':
//             return 'Sat';
//     }
// }

// function isBig(n: number) {
//     if( n>= 100 ) {
//         return true
//     }
// }

// type APIResponse = {
//     user: {
//         userId: string
//         friendList: {
//             count: number
//             friends: {
//                 firstName: string
//                 lastName: string
//             }[]
//         }
//     }
// }

// type Ap = APIResponse['user']['friendList']['friends'][number]

// type FriendList = APIResponse['user']['userId' | 'friendList']
// type Friend = APIResponse['user']['friendList']['friends'][5]

// function get<O extends object,
//              K1 extends keyof O>(o: O, k1: K1): O[K1];
// function get<O extends object,
//              K1 extends keyof O,
//              K2 extends keyof O[K1]>(o: O, k1: K1, k2: K2): O[K1][K2];
// function get<O extends object,
//              K1 extends keyof O,
//              K2 extends keyof O[K1],
//              K3 extends keyof O[K1][K2]>(o: O, k1: K1, k2: K2, k3: K3): O[K1][K2][K3];
// function get(obj: any, ...keys: string[]) {
//     let result = obj;
//     keys.forEach(k => result = result[k])
//     return result;
// }

// type Account0 = {
//     id: number
//     isEmployee: boolean
//     notes: string[]
// }

// // all properties optional
// type OptionalAccount = {
//     [K in keyof Account0]? : Account0[K]
// }
// // all properties nullable
// type NullableAccount = {
//     [K in keyof Account0]: Account0[K] | null
// }
// // all properties read-only
// type ReadonlyAccount = {
//     readonly [K in keyof Account0] : Account0[K]
// }

// // all properties writable again
// type Account2 = {
//     -readonly [K in keyof ReadonlyAccount]: ReadonlyAccount[K]
// }
// // all properties required again
// type Account3 = {
//     [K in keyof OptionalAccount]-?: OptionalAccount[K]
// }

export const Unit = {
  EUR: 'EUR',
  GBP: 'GBP',
  JPY: 'JPY',
  USD: 'USD',
} as const;

export type Unit = typeof Unit[keyof typeof Unit];

export type Currency = {
  unit: Unit;
  value: number;
};
export const Currency = {
  DEFAULT_UNIT: 'USD',
  from(value: number, unit?: Unit): Currency {
    if (unit == null) {
      unit = this.DEFAULT_UNIT as Unit;
    }
    return { unit, value };
  },
};

// type ToArray<T> = T[]
// type A = ToArray<number> // number[]
// type B = ToArray<number | string> // (number | string)[]

// type ToArray2<T> = T extends unknown ? T[] : T[]
// type C = ToArray2<number | string> // nubmer[] | string[]

// type a = {a: number} | {a: string}

// let a: a = {a : '1'}

// works for union type
// type Without<T, U> = T extends U ? never : T;
// type A = Without<
//     boolean | number | string,
//     boolean>
// type A1 = Without<boolean, boolean>
//         | Without<number, boolean>
//         | Without<string, boolean>
// type A2 = (boolean extends boolean ? never : boolean)
//         | (number extends boolean ? never : number)
//         | (string extends boolean ? never : string)
// type A3 = never | number | string

// type ElementType<T> = T extends (infer U)[] ? U : T;
// type A = ElementType<string[]>; // number
// type v = string[][number]

// type SecondArg<F> = F extends (a: any, b: infer B) => any ? B : never
// // get the type of Array.slice
// type Fun = typeof (Array[]prototype.slice)
// type A = SecondArg<Fun> // number | undefined

// type Dialog = { id?: string };
// function closeDialog(dialog: Dialog) {
//   if (!dialog.id) {
//     return;
//   }
//   setTimeout(() => removeFromDOM(dialog, document.getElementById(dialog.id!)!));
// }
// function removeFromDOM(dialog: Dialog, element: Element) {
//   element.parentNode?.removeChild(element);
//   delete dialog.id;
// }

// let userId!: string;
// fetchUser();
// userId.toUpperCase(); // OK
// function fetchUser() {
//   userId = globalCache.get('userId');
// }

// type CompanyID = string;
// type OrderID = string;
// type UserID = string;
// type ID = CompanyID | OrderID | UserID;

// function queryForUser(id: UserID) {
//   // ...
// }

// let id: CompanyID = 'b4843361';
// queryForUser(id); // OK (!!!)

type CompanyID = string & { readonly brand: unique symbol };
type OrderID = string & { readonly brand: unique symbol };
type UserID = string & { readonly brand: unique symbol };
type ID = CompanyID | OrderID | UserID;

function CompanyID(id: string) {
  return id as CompanyID;
}
function OrderID(id: string) {
  return id as OrderID;
}
function UserID(id: string) {
  return id as UserID;
}

// function queryForUser(id: UserID) {
//   // ...
// }
let companyId = CompanyID('8a6076cf');
let orderId = OrderID('9994acc1');
let userId = UserID('d21b1dbf');
// queryForUser(userId); // OK
// queryForUser(companyId); // Error

const obj = {
  helo: 'helo',
  hi: 'hi',
} as const;

type aaa = typeof obj['helo'];
