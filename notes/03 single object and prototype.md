# object and class

[exploringjs](https://exploringjs.com/impatient-js/ch_single-objects.html)

## single objects

a set of properties(key-value entries), key can only be a string or a symbol.

generally three categories

* fields
* accessors(getter and setter)
* method

usage/roles

* records (fixed number of properties, whose keys are known at development time)
* dictionaries (all values should have the same type, not required, whenever possiblly use Map)


### object literals: data field (property value shorthands, accessing)

```js
const jane = {
    first: 'Jane',
    last: 'Doe', // optional trailling comma
}
```

static property keys must follow the rules of javascript variable name.

```js
function createPoint(x, y) {
    return {x, y} // whenever the value of a property is defined via a variable and that name is
    // the same as the key, you can omit the key.
}
```

getting properties

```js
jane.first // . operator
```

setting properties

```js
jane.first = 'jenny' // if we set an unknown property, we create a new property
```

### object literal: methods

methods are properties whose values are functions

```
const obj = {
  property( parameters...) {},
  *generator( parameters ...) {},
  async property( parameters ...) {},
  async* generator( parameters… ) {},

  //  with computed keys
  [property]( parameters ...) {},
  *[generator]( parameters ...) {},
  async [property]( parameters ...) {},
  async* [generator]( parameters ...) {},
};
```

```js
const jane = {
    first: 'Jane',
    last: 'Doe',
    says(text) {
        return `${this.first} says "${text}"` // this
    },
}
```

#### `this`

##### `.call` specify `this` via a parameter

```js
const obj = {
  method(x) {
    assert.equal(this, obj); // implicit parameter
    assert.equal(x, 'a');
  },
};

obj.method('a'); // receiver is `obj`
// bascally this
obj.method.call(obj, 'a')

function func(x) {
  assert.equal(this, undefined); // implicit parameter
  assert.equal(x, 'a');
}

func('a');
// bascally this
func.call(undefined, 'a');
```

##### `.bind()` pre-filling `this` and parameters of functions

```js
const boundFunc = someFunc.bind(thisValue, arg1, arg2)

boundFunc('a', 'b')
// equally to 
someFunc.call(thisValue, arg1, arg2, 'a', 'b')

// another way to do bound
const bounFunc2 = (...args) => 
    someFunc.call(thisValue, arg1, arg2, ...args);

// so you can implement bound
function bind(func, thisValue, ...boundArgs) {
  return (...args) =>
    func.call(thisValue, ...boundArgs, ...args);
}
```

##### `this` pitfull: extracting methods

usage, using method as callback

```js
const  jane = {
    first: 'Jane',
    says() {
        console.log(`${this.first} says hi!`)
    }
}

setTimeout(jane.says, 0) //=> undefined says hi!
setTimeout(jane.says.bind(jane)) // => Jane says hi!
// or
setTimeout(() => {jane.says()}, 0)
```

basically *extract method from object is dangerous*

function-calling a method extracted from an object can fail if you are not careful.
because *`this` is dynamic scoped*, depends on how the callable entity is invoked.

* Function call:
    * Ordinary functions: this === undefined (in strict mode)
    * Arrow functions: this is same as in surrounding scope (lexical this)
* Method call: this is receiver of call
* new: this refers to newly created instanc
* <script> element: this === globalThis
* ECMAScript modules: this === undefined
* CommonJS modules: this === module.exports

```js
class ClickHandler {
  constructor(id, elem) {
    this.id = id;
    elem.addEventListener('click', this.handleClick); // (A)
  }
  handleClick(event) {
    alert('Clicked ' + this.id);
  }
}
```
line A should be `elem.addEventListener('click', this.handleClick.bind(this));`

##### `this` pitfull: shadowing this

```js
const prefixer = {
  prefix: '==> ',
  prefixStringArray(stringArray) {
    return stringArray.map(
      function (x) {
        return this.prefix + x; // this is undefined
      });
  },
};
```
arrow function doesn’t have its own `this` and therefore doesn’t shadow anything.

```js
const prefixer = {
  prefix: '==> ',
  prefixStringArray(stringArray) {
    return stringArray.map(
      (x) => {
        return this.prefix + x;
      });
  },
};
```

store `this` in a different variable

```js
prefixStringArray(stringArray) {
  const that = this; // (A)
  return stringArray.map(
    function (x) {
      return that.prefix + x;
    });
}
```

specify a fixed `this` for the callback

```js
prefixStringArray(stringArray) {
  return stringArray.map(
    function (x) {
      return this.prefix + x;
    }.bind(this)); // (A)
},
```

`.map()` lets us sepcify a value for `this`

```js
prefixStringArray(stringArray) {
  return stringArray.map(
    function (x) {
      return this.prefix + x;
    },
    this); // (A)
},
```

##### *avoiding the pitfalls of `this`*


* using arrow function for *function argument aka callback* => linter?
* don't extract method, only call `obj.method()`, callback wrap in arrow function
* don't refer to `this` inside function declarations => linter

static checking ESLint

### object literal: accessors

[accessor](https://en.wikipedia.org/wiki/Property_(programming))

```
const obj = {
  get property() {},
  set property(value) {},

  //  with computed keys
  get [property]() {},
  set [property](value) {},

};
```

```js
// getter
const jane = {
    first: 'Jane',
    last: 'Doe',
    get full() {
        return `${this.first} ${this.last}`;
    },
}

assert.equal(jane.full, 'Jane Doe')
jane.first = 'John'
assert.equal(jane.full, 'John Doe')
jane.full = 'Jenny Doe'  // this doesn't throw, but does not have any effect on `jane`
assert.equal(jane.full, 'John Doe')
```

```js
const jane = {
  first: 'Jane',
  last: 'Doe',
  set full(fullName) {
    const parts = fullName.split(' ');
    this.first = parts[0];
    this.last = parts[1];
  },
};
```

### spreading into object literals (copying, default values for missing properties, non-destructively changing properties) (non-destructively deleting -> desctructive assignment)

```js
const obj = {foo: 1, bar: 2}
const obj0 = {...obj, baz:3}
```

if property keys clash, the property that is mentioned last "wins"

* shallow copying objects
    ```js
    const original = { a: 1, b: {foo: true} };
    const copy = {...original};
    copy.b.foo = false;
    assert.deepEqual(
        original, { a: 1, b: {foo: false} });
    ```
* default values for missing properties
    ```js
    const DEFAULTS = {foo: 'a', bar: 'b'};
    const providedData = {foo: 1}

    const allData = {...DEFAULTS, ...providedData};
    ```
* non-destructively changing properties
    ```js
    const obj = {foo: 'a', bar: 'b'}
    obj.foo = 1; // destructive

    const obj = {foo: 'a', bar: 'b'}
    const updatedObj = {...obj, foo: 1}
    ```

### objects as dictionaries

[mime-db](https://github.com/jshttp/mime-db)

using require to import json, as mime database

#### arbitrary fixed strings as keys

```js
const obj = {
    'Can be any string!': 123, 
}
// Get property
assert.equal(obj['Can be any string!'], 123); // square brackets accessing

// Set property
obj['Can be any string!'] = 'abc';
assert.equal(obj['Can be any string!'], 'abc');

const obj = {
  'A nice method'() {
    return 'Yes!';
  },
};

assert.equal(obj['A nice method'](), 'Yes!');
```

#### dynamically computed keys

```js
const obj = {
  ['Hello world!']: true,
  ['f'+'o'+'o']: 123,
  [Symbol.toStringTag]: 'Goodbye', // (A)
};
assert.equal(obj['Hello world!'], true);
assert.equal(obj.foo, 123);
assert.equal(obj[Symbol.toStringTag], 'Goodbye');
```

square brackets operator for getting and setting properties works with arbitrary expressions

```js
assert.equal(obj['f'+'o'+'o'], 123);
assert.equal(obj['==> foo'.slice(-3)], 123);

const methodKey = Symbol();
const obj = {
  [methodKey]() {
    return 'Yes!';
  },
};

assert.equal(obj[methodKey](), 'Yes!');
```

### pitfalls of using an object as dictionary

* `in` operator also finds inherited properties
* `__proto__`, has special meaning, can not be setted as key

to avoid pitfalls

* using Map
* use an object without a prototype
    ```js
    const dict = Object.create(null); // no prototype

    assert.equal('toString' in dict, false); // (A)

    dict['__proto__'] = 123;
    assert.deepEqual(Object.keys(dict), ['__proto__']);
    ```
### operators

#### `in`, is there a property with a given key?

`in` operator also finds inherited properties

```js
const obj = {foo: 'abc', bar: false}

'bar' in obj //=> true
```

#### `delete` deleting properties

```js
const obj = {foo: 123,}

delete obj.foo
```

#### listing property keys

##### enumerability of own property


### standard methods (contract methods)

methods can be overridden to configure how an object is treated by the language

.toString() how objects are converted to strings
```js
String({toString() { return 'Hello!' }})
//=> 'Hello!'
String({})
//=> '[object Object]'
```
.valueOf() how objects are converted to numbers
```js
Number({valueOf() { return 123 }})
//=> 123
Number({})
//=> NaN
```

## prototype chains

each object has a prototype that is either null or an object.
the object inherits all of the prototype's properties.

```js
const proto = {
  protoProp: 'a',
};
const obj = {
  __proto__: proto,
  objProp: 'b',
};

// obj inherits .protoProp:
assert.equal(obj.protoProp, 'a');
assert.equal('protoProp' in obj, true);
```

all properties:
* getting
* `in`

own properties:

* setting *overriding*
* Object.keys()

### pitfalls

only the first member of a prototype chain is mutated, *overriding*

`__proto__` is not always available, the recommended ways of getting
and setting prototypes
  * Object.getPrototypeOf(obj: Object): Object, getting
  * Object.create(proto: Object): Object or __proto__ in object literal, creating
  * Object.setPrototypeOf(obj, proto)
  * p is in the prototype chain of o
    * p.isPrototypeOf(o)

### sharing via prototypes

```js
const PersonProto = {
  describe() {
    return `Person named ${this.name}`;
  },
};
const jane = {
  __proto__: PersonProto,
  name: 'Jane',
};
const tarzan = {
  __proto__: PersonProto,
  name: 'Tarzan',
};

assert.equal(jane.describe(), 'Person named Jane');
assert.equal(tarzan.describe(), 'Person named Tarzan');
```

## method on `Object`

### object creating and manipulation (prototype, propertyDescriptor)

.create(proto, [propertiesObject]): newObj
.defineProperty(obj, prop, descriptor): obj
.defineProperties(obj, propertiesObject) : obj
.getOwnPropertyDescriptor(obj, prop): descriptor
.getOwnPropertyDescriptors(obj): propertiesObject
.getPrototypeOf(obj): proto
.setPrototypeOf(obj, proto): obj *very slow*
#isPrototypeOf()

.freeze()
.isExtensible()
.isFrozen()
.isSealed()
.preventExtensions()
.seal()

### contract method

#toString
#valueOf
#toLocaleString

### property related (understand property reading behavior is futile)

.fromEntries()

.entries() : own enumerable string-keyed property
.values(): 
.keys(): an array of *own* *enumerable* property *names*


.getOwnPropertyNames: an array of *own* property *names*
.getOwnPropertySymbols
#hasOwnProperty() symbol or string
#propertyIsEnumerale


[enumeration order](https://github.com/tc39/proposal-for-in-order)

### other

.assign() destructive (X)
.is()  (?)

## summary

### object literal

```js
let o = {}
let o = {a: 'foo', b: 42, c: {}}

let a = 'foo', b = 42, c = {}
let o = {a: a, b: b, c: c}

let o = {
  property: function (parameters) {},
  get property() {},
  set property(value) {}
};

// Shorthand property names (ES2015)
let a = 'foo', b = 42, c = {};
let o = {a, b, c}

// Shorthand method names (ES2015)
let o = {
  property(parameters) {}
}

// Computed property names (ES2015)
// for dynamic key and symbol key
let prop = 'foo'
let o = {
  [prop]: 'hey',
  ['b' + 'ar']: 'there'
}
```

method definitions

```js
const obj = {
  get property() {},
  set property(value) {},
  property( parameters… ) {},
  *generator( parameters… ) {},
  async property( parameters… ) {},
  async* generator( parameters… ) {},

  //  with computed keys
  get [property]() {},
  set [property](value) {},
  [property]( parameters… ) {},
  *[generator]( parameters… ) {},
  async [property]( parameters… ) {},
  async* [generator]( parameters… ) {},
};
```

#### optional trailling comma


### property accessors

dot notation or the bracket notation

```js
object.property // property must be a valid JavaScript identifier
object['property']
```

#### `in` `for...in` `delete`

delete vs set to undefined

### optional chaining

[optional chaining](https://github.com/tc39/proposal-optional-chaining)

instead of causing an error if a reference is nullish (null or undefined),
the expression short-circuits with a return value of undefined

```js
obj?.prop // optional static property access
obj?.[expr] // optional dynamic property access
arr?.[index]
func?.(args) // optional function or method call
```

```js
const adventurer = {
  name: 'Alice',
  cat: {
    name: 'Dinah'
  }
};

const dogName = adventurer.dog?.name;
console.log(dogName);
// expected output: undefined

console.log(adventurer.someNonExistentMethod?.());
// expected output: undefined
```

#### optional chaining with function calls

```js
// Written as of ES2019
function doSomething(onContent, onError) {
  try {
    // ... do something with the data 
  }
  catch (err) {
    if (onError) { // Testing if onError really exists
      onError(err.message);
    }
  }
}
// Using optional chaining with function calls
function doSomething(onContent, onError) {
  try {
   // ... do something with the data
  }
  catch (err) {
    onError?.(err.message); // no exception if onError is undefined
  }
}
```

#### combinning with the nullish coalescing operator

[nullish coalescing operator](https://github.com/tc39/proposal-nullish-coalescing)

```js
let customer = {
  name: "Carl",
  details: { age: 82 }
};
const customerCity = customer?.city ?? "Unknown city";
console.log(customerCity); // Unknown city
```

#### optional chaining not valid on the left-hand side of an assignment

```js
let object = {};
object?.property = 1; // Uncaught SyntaxError: Invalid left-hand side in assignment
```

### `this` and method

`this` is dynamic scoped variable




### spread properties to object literals

```js
// syntax
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x; // 1
y; // 2
z; // { a: 3, b: 4 }
let n = { x, y, ...z };
n; // { x: 1, y: 2, a: 3, b: 4 }
```

[object rest spread](https://github.com/tc39/proposal-object-rest-spread)

```js
let obj1 = { foo: 'bar', x: 42 }
let obj2 = { foo: 'baz', y: 13 }

let clonedObj = { ...obj1 }
// Object { foo: "bar", x: 42 }

let mergedObj = { ...obj1, ...obj2 }
// Object { foo: "baz", x: 42, y: 13 }
```
### destructuring assignment

* destructuring and spreading conceptually a pair.
* for both object and iterable

left-hand side of `=` (data sink location)
* variable declaration
* assignment
* parameter definition

```js
const arr = ['a', 'b'];
for (const [index, element] of arr.entries()) {
    console.log(index, element);
}
// Output:
// 0, 'a'
// 1, 'b'
```

#### object destructing(rest)

```js
// level one
const address = {
  street: 'Evergreen Terrace',
  number: '742',
  city: 'Springfield',
  state: 'NT',
  zip: '49007',
};

const { street, city } = address;
assert.equal(street, 'Evergreen Terrace');
assert.equal(city, 'Springfield');


// level two: rename
const { street: s, city: c } = address;
assert.equal(s, 'Evergreen Terrace');
assert.equal(c, 'Springfield');

// level three: rest (must come last)

const obj = { a: 1, b: 2, c: 3 };
const { a: propValue, ...remaining } = obj;

assert.equal(propValue, 1);
assert.deepEqual(remaining, {b:2, c:3});

// remaining can also be viewed as the result of *non-destructively removing* property a from obj.
```

#### iterable-destructuring(skipping, rest, and nest pattern)

```js
const [x, y] = ['a', 'b'];
// skip elements by mentioning holes in side array pattern
const [, x, y] = ['a', 'b', 'c'];

// rest elements (must come last)
const [x, y, ...remaining] = ['a', 'b', 'c', 'd'];
```

#### usage

swapping variable values

```js
let x = 'a';
let y = 'b';

[x,y] = [y,x]; // swap
```

operations that return arrays

```js
// Skip the element at index 0 (the whole match):
const [, year, month, day] =
  /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/
  .exec('2999-12-31');
```

multiple return values (either packaged as an Array or packaged as an object.)

```js
function findElement(arr, predicate) {
  for (let index=0; index < arr.length; index++) {
    const value = arr[index];
    if (predicate(value)) {
      // We found something:
      return { value, index };
    }
  }
  // We didn’t find anything:
  return { value: undefined, index: -1 };
}

const arr = [7, 8, 6];

const {value, index} = findElement(arr, x => x % 2 === 0);
assert.equal(value, 8);
assert.equal(index, 1);
// destructuring also serves us well if we are only interested in one of the two results
const {value} = findElement(arr, x => x % 2 === 0);

```

#### what happens if a pattern does not match anything?

undefined

```js
const {prop: p} = {};
assert.equal(p, undefined);

const [x] = [];
assert.equal(x, undefined);
```

#### default values

```js
const [x=1, y=2] = [];

assert.equal(x, 1);
assert.equal(y, 2);

const {first: f='', last: l=''} = {};
assert.equal(f, '');
assert.equal(l, '');

const {first='', last=''} = {};
assert.equal(first, '');
assert.equal(last, '');
```

* You can’t object-destructure undefined and null => type error
* You can’t Array-destructure non-iterable values => type error

#### parameter definitions(array pattern destructuring)

default values
rest elements

simulating named parameter

```js

function showMenu({title = "Untitled", width = 200, height = 100, items = []}) {
  // title, items – taken from options,
  // width, height – defaults used
  alert( `${title} ${width} ${height}` ); // My Menu 200 100
  alert( items ); // Item1, Item2
}


// we pass object to function
// ...and it immediately expands it to variables

let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};
showMenu(options);

// you can even simulating swif outside name and inside name
function({
  incomingProperty: varName = defaultValue
  ...
})

showMenu({}); // ok, all values are default

showMenu(); // this would give an error

// fix this making {} the default value for the whole object

function showMenu({ title = "Menu", width = 100, height = 200 } = {}) {
  alert( `${title} ${width} ${height}` );
}

showMenu(); // Menu 100 200

```

#### nested destructuring

```js
let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"],
  extra: true
};

// destructuring assignment split in multiple lines for clarity
let {
  size: { // put size here
    width,
    height
  },
  items: [item1, item2], // assign items here
  title = "Menu" // not present in the object (default value is used)
} = options;
```

[mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

[javascript.info](https://javascript.info/destructuring-assignment)

[exploringjs](https://exploringjs.com/impatient-js/ch_destructuring.html#array-destructuring)


----

deepcopy

deepequal

equal
  ==
  ===
  Object.is