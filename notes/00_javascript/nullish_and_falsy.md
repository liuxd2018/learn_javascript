## short circuiting

## nullish

`null` `undefined`

checking for nullish

```js
value == null

value == undefined

value ==== null || value === undefined
```

optional chaining 

[optional chaining](https://github.com/tc39/proposal-optional-chaining)

nullish coalesing

`value ?? default`

[nullish coalesing](https://github.com/tc39/proposal-nullish-coalescing)

## falsy

`null`, `undefined`, `''`,  `""`, `0`, `-0`, `NaN`, `false`

checking for falsy

`!value`

falsy coalesing

`value || default`

## boolean value

convert other value to boolean

* Boolean(expression)
* !!(expression)

used for

* branching
* ternary operator
* logical operator && || !

produced by

* equals
* comparison (comparator)

## equals and comparison

* ==
* ===
* Object.is()
* SameValueZero

* value equal / deep equal

[equals table](https://dorey.github.io/JavaScript-Equality-Table/)
[4 types of equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
[equality for set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
[floating point number comparison](https://en.wikipedia.org/wiki/Floating-point_arithmetic)

`4.000000000000001 === 4.0` ==> false

`4.0000000000000001 === 4.0` ==> true

## assignment, aliasing and copying

* =
* [a, b] = [1, 2]
* {a, b} = {a: 1, b: 2}

= copy (for value type)
= alias (for reference type)
shallow copy (= for properties)
deep copy