## use as struct(wihout method)

## with method

object is a dynamic collection of properties.

every property has a key string that is unique within that object.

get, set and delete

get
    object.name
    object[expression]
set
    object.name = value;
    object[expression] = value;
delete
    delete object.name
    delete object[expression]
test
    name in object

[key] must be string. automatic type coercion

object literals
an expressive notation for creating objects.

object relationships ( prototypes )

- make an object that you like
- create new instance that inherit from that object
- customize the new object

```js
let mother = {
    a: 1,
    b: 2,
}
let daughter = Object.assign(Object.create(mother), {
    b: 4,
    c: 9,
})

Object.create(null) // create a object, its prototype is `null`
```

## 4 layers of object-oriented programming in javascript

1 single object (object literal) works in isolation

2 prototype chain, each object has a chain of zero or more `prototype objects`. this is the relationships between object, avoid

3 class(constructor function), avoid, need to understand, because libraries are using it 

4 subclassing, avoid

advice:

- avoid inheritance, use composition(object contain object)
- use normal function return a object literal

## object literals

two roles:

- records: objects-as-records have a fixed number of properties, whose keys are
  known at development time.

- dictionaries: objects-as-dictionaries have a variable number of properties, whose
  keys are not known at development time. __Use Maps__


### as records

#### 1 create

.assign()
.create()
.fromEntries()

```js
const jane = {
    first: 'Jane',
    last: 'Doe',
    ['Hello world!']: true,
    ['f'+'o'+'o']: 123,
    [Symbol.toStringTag]: 'goodbye',
}
// whenever the value of a property is defined via a variable name and
// that name is the same as the key, you can omit the key
const x = 4
const y = 1
const obj = {
    x, y,
}
``` 
#### 2 keys enumeration

property keys can be strings and symbols.
If a property key is a string, it is also called a __property name__.
If a property key is a symbol, it is alse called a __property symbol__.

Object.keys(obj): returns all property keys of obj

Object.getOwnPropertyNames(obj)

Object.getOwnPropertySymbols(obj)

#### 3 get and set

`obj.propKey` or `obj[expression]`

if obj does not have a property whose key is `propKey`,
the expression evaluates to `undefined`

`obj.propKey = value` or `obj[expression] = value`

if obj already has a property whose key is propKey,
this statement changes the property. Otherwise, it creates
a new property.



#### 4 method

```js
var obj = {
  property( parameters… ) {},
  *generator( parameters… ) {},
  async property( parameters… ) {},
  async *generator( parameters… ) {},

  // with computed keys(expression):
  [property]( parameters… ) {},
  *[generator]( parameters… ) {},
  async [property]( parameters… ) {},
  async *[generator]( parameters… ) {},
  
};
```
#### 5 `this`

`this` is the context when mehtod be called, is
the implicit input to the mehtod

normal functions have a `this`, but it is set to `undefined`.
use `#call` or `#bind` can explicit set `this` for normal function

`this` pitfall

- extracting methods

```js
const jane = {
  first: 'Jane',
  says(text) {
    return `${this.first} says “${text}”`;
  },
};
const func = jane.says; // extract the method
assert.throws(
  () => func('hello'), // (A)
  {
    name: 'TypeError',
    message: "Cannot read property 'first' of undefined",
  });
```

- shadowing `this`

```js
const obj = {
  name: 'Jane',
  sayHiTo(friends) {
    return friends.map(
      function (friend) { // (A) this is anonymous function expression 
        return `${this.name} says hi to ${friend}`; // (B) `this` is `undefined`
      });
  }
};
```

the value of `this` in various contexts?

depends on how the callable value is invoked and what kind of callable value it is:

- function call
  - normal function this === undefined
  - arrow function this is same as in surrounding scope
- method call
  - receiver of call
- <script> element
  - this === window
- ES modules
  - this === undefined

#### 6 object literals accessors

avoid

#### 7 spreading into other object literals ...

`...` 

- turns the contents of an __iterable__ into arguments
- adds the properties of another object to the current one

```js
const obj = {foo: 1, bar: 2,}
const obj2 = {...obj, baz: 3}
// const obj2 = Object.assign(obj, {baz: 3}) // not the same obj changed, 'copy and merge' vs 'merge'
```

1  a way to create shallow copy of object
`const copy = {...original}`
2  provide default values
```js
const DEFAULTS = {foo: 'a', bar: 'b'};
const providedData = {foo: 1};

const allData = {...DEFAULTS, ...providedData};
const allData = {foo: 'a', bar: 'b', ...providedData};
```
3 non-destructively changing properties

```js
const obj = {foo: 'a', bar: 'b'};
const updatedObj = {...obj, foo: 1};
```

### as dictionaries __use Map instead__

 1 arbitrary strings as property key(other than only identifiers)

```js
const obj = {
  'Can be any string!': 123,
}
```

2 square bracket operator

3 dynamically `computed property keys` ( expressions in square brackets)



4 delete
    `delete` object.name
    `delete` object[expression]
5 test
    name `in` object

6 enumeration

    .getOwnPropertyNames() // enumeration
    .getOwnPropertySymbols() // enumeration
    .keys() // enumeration
    .values() // enumeration
    .entries() // enumeration
    for... in // enumeration avoid

7 pitfalls

- in operator alse finds inherited properties
- you can not use '__proro__' as key

solution

- use Map
- use a lib
- `const dict = Object.create(null)`

