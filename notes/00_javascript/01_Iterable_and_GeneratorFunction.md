for-of
...


# old way

```js
var colors = ['red', 'green', 'blue'];

for(var i = 0, len = colors.length; i < len; i++) {
    console.log(colors[i])
}
```

# `Iterator` interface

a standard way to produce a sequence of values (either finite or infinite),
and potentially a return value when all values have been generated

`next()`: A zero-argument function that returns an object with at least the following two properties:

{
    done: boolean;
    value: any;
}

# `Iterable` interface array string set map

`[Symbol.iterator]()`: returns an object, conforming to Iterator interface

```javascript
function isIteratable(obj) {
    return typeof obj[Symbol.iterator] === 'function';
}
```

collections:

* all three, keys can not be duplicated
* array is numeric key, map and set is value key
* set value can not be duplicated

    * array 
    * map
    * set
        * entries()
        * values()
        * keys()

```javascript
// for -- of and destructuring
const data = new Map([['title', 'Understanding EMACSCript'],
['format', 'ebool']]);

for(const [k, v] of data) {
    console.log(`key: ${k}, value: ${v}`)
}
```

# `IterableIterator`


```javascript

function createIterator(items) {
    let i = 0;
    return {
        next() {
            let done = (i >= items.length);
            let value = !done ? items[i++] : undefined;
            return {
                done,
                value
            };
        }
    };
}

const iterator = createIterator([1, 2, 3])

// for(const value of iterator) { // not work
//     console.log(value)
// }

console.log(iterator.next())
```

# `GeneratorFunction` => `Generator`

```javascript

function* createGenerator(items) {
    for (let i = 0; i < items.length; i++) {
        yield items[i];
    }
}

// or

const createGenerator = function* (items) {
    for (let i = 0; i < items.length; i++) {
        yield items[i];
    }
};

// creating an arrow function that is also a generator is not possible

// generator method

const o = {
    * createGenerator(items) {
        for (let i = 0; i < items.length; i++) {
            yield items[i];
        }
    }
}

const generator = createGenerator([1, 2, 3])

for(const value of generator) {
    console.log(value)
}

// generator function expression

function* createGenerator(items) {
    items.forEach(function* (item) {
        yield item // error , yield inside createGenerator
    })
}

// block scope ==> break, continue
// try with resource scope
// function scope ==> yield, return, throw

```



# generator function magic

```js

function* hello(a) {
    let i = yield 1; // i = 4
    let l = yield 2; // l = 4
    yield a; 
    yield i + l;
    return 'hello'
}

let i = hello('world')

i.next(4) // ==> i  {done:false, value: 1}
i.next(4) // ==> l {done:false, value 2}
i.next(4) // ignored {done: false, value: world}
i.next(4) // ignored {done: false, value: 8}
i.next(4) // {done: true, value: hello}
i.next(4) // {done: true, value: undefined}

for (const v of hello('world')) {
    console.log(v) // 1, 2, world, NaN(undefined + undefined)
}
```

# typescript definitions

```ts
// Iterable<T>

interface IteratorYieldResult<TYield> {
    done?: false;
    value: TYield;
}

interface IteratorReturnResult<TReturn> {
    done: true;
    value: TReturn;
}

type IteratorResult<T, TReturn = any> = IteratorYieldResult<T> | IteratorReturnResult<TReturn>;

interface Iterator<T, TReturn = any, TNext = undefined> {
    // NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.
    next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
    return?(value?: TReturn): IteratorResult<T, TReturn>;
    throw?(e?: any): IteratorResult<T, TReturn>;
}

interface Iterable<T> {
    [Symbol.iterator](): Iterator<T>;
}

interface IterableIterator<T> extends Iterator<T> {
    [Symbol.iterator](): IterableIterator<T>;
}

```

```ts

// Generator<T>
interface Generator<T = unknown, TReturn = any, TNext = unknown> extends Iterator<T, TReturn, TNext> {
    // NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.
    next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
    return(value: TReturn): IteratorResult<T, TReturn>;
    throw(e: any): IteratorResult<T, TReturn>;
    [Symbol.iterator](): Generator<T, TReturn, TNext>;
}

```

Iterator only required to have next()
generator required to have next(), return() throw()