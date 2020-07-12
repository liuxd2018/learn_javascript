list/finite sequence/tuple
    a countable number of ordered values, where the same value may occur more than once.
    (potentially) infinite analog of a list is a stream

list semantics
list literal syntax
list operations

[list](https://en.wikipedia.org/wiki/List_(abstract_data_type))
[iterator](https://en.wikipedia.org/wiki/Iterator)
[array](https://en.wikipedia.org/wiki/Array_data_structure)

iterator

array
    index access
    slice
## static method 

* Array.isArray
* Array.of
* Array.from

## readonlyarray method

length
[]
slice
* array to string
    * toString
    * toLocaleString
    * join

* array searching
    * indexOf ===
    * lastIndexOf ===
    ```js
    function findAll(a, x) {
        let results = []
        let len = a.length
        let pos = 0
        while (pos < len) {
            pos = a.indexOf(x, pos)
            if(pos === -1) break
            results.push(pos)
            pos = pos + 1
        }
        return results
    }
    ```
    * includes set membership test
* adding arrays
    * concat
* iterate, map, filter, test, reduce array
    * forEach action functon t -> void
    * map mapper function t -> u
    * filter predicate function t -> boolean
    * find
    * findIndex
    * every
    * some
    * reduce  recuction function
    * reduceRight
* flattening arrays
    * flat
    * flatMap a.flatMap(f) a.map(f).flat(), mapper function return an array
    ```js
    [1, [2, 3]].flat()   // => [1,2,3]
    [1, [2, [3]]].flat() // => [1, 2, [3]]
    ```

## array method

length
[]
* stacks and queues
pop
push
shift
unshift


splice

sort - comparison function
reverse

fill
copyWithin

## `...`

literal syntax for array

spreading iterable into array

array destructuring pattern for iterable, (rest operator)

for of loop for array

## never mutate arrays (using `.slice` or `...`)

adding items to start

```js
const array = [3, 4, 5]
const after = [1, 2, ...array]
```

adding items to end

```js
const array = [3, 4, 5]
const after = [...array, 6, 7]
```

adding to the middle

```js
// add orange after pear

const index = fruits.indexOf('Pear')

// using slice
const result = [
    ...fruits.slice(0, index),
    'Orange',
    ...fruites.slice(index+1),
]
// using splice

const result = fruits.slice() // or [...fruits]
result.splice(index + 1, 0, 'Orange')
```

removing items from the start

```js
const array = [1, 2, 3]
const [, ...result] = array
```

removing items from the end

```js
const array = [1, 2, 3]
const result = array.slice(0, -2)

const array = [1, 2, 3]
const result = array.slice()
result.pop()
```

removing items from the middle

```js
// using slice
const result = [
  ...fruits.slice(0, index)
  ...fruits.slice(index + 1)
]
// using splice
const result = fruits.slice()
result.splice(index, 1)
```

replacing items

```js
const array = [1, 2, 3]
const result = array.slice()
result[1] = 3
```

looping through arrays

`map`, `filter`, `reduce`(only use `reduce` to convert array to primitive)

```js
// Map
const array = [1, 2, 3]
const doubled = array.map(x => x * 2)

// Filter
const array = [1, 5, 10]
const below6 = array.filter(x => x < 6)

// Reducing an array of numbers
const array = [1, 2, 3]
const sum = array.reduce((sum, current) => sum + current, 0)

console.log(sum) // 6
```
turn arrays into objects using `forEach`

```js
const fruits = ['apple', 'apple', 'pear']

// With forEach
const tally = {}
fruits.forEach(fruit => {
  if (tally[fruit]) {
    tally[fruit] += 1
    return
  }
  tally[fruit] = 1
})

console.log(tally)
// {
//   apple: 2,
//   pear : 1
// }

// with Reduce
const tally = fruits.reduce((tally, fruit) => {
  if (tally[fruit]) {
    tally[fruit] += 1
  } else {
    tally[fruit] = 1
  }
  return tally
}, {})

console.log(tally)
// {
//   apple: 2,
//   pear : 1
// }
```

execute something, changle properties

```js
const nodes = document.querySelectorAll('.hey')

// With forEach
[...nodes].forEach(node => { // turn ArrayLike to Array Array.from(nodes)
  node.classList.remove('hey')
})

// With for...of
for (const node of nodes) {
  node.classList.remove('hey')
}

```

## array and promise

[async function as callback](https://zellwk.com/blog/async-await-in-loops/)

callback signature don't have promise, async function and sync function is differet

```js
const fruitBasket = {
    apple: 27,
    grape: 0,
    pear: 14
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function getNumFruit(fruit) {
    return sleep(1000).then(() => fruitBasket[fruit])
}


const fruitsToGet = ['apple', 'grape', 'pear']
```

for loop == execute in series

```js
async function _() {
    console.log('Start')
    // normal loop
    // while
    // for-of
    // execute in series
    for(let index = 0; index < fruitsToGet.length; index++) {
        const numFruit = await getNumFruit(fruitsToGet[index])
        console.log(numFruit)
    }
    console.log('End')
}
```

forEach == don't work

```js
async function _() {
    console.log('Start')
    // forEach is not promise-aware
    // you can not pass a async function to 
    // a position where a sync function is traditionally required
    // and expect things go well
    fruitsToGet.forEach(async (fruit) => {
        const numFruit = await getNumFruit(fruit)
        console.log(numFruit)
    })
    console.log('End')
}
_()
```

map

```js
async function _() {
    console.log('Start')
    // aync function always return a function
    const numFruits = fruitsToGet.map(async (fruit) => {
        const numFruit = await getNumFruit(fruit)
        return numFruit // this will be wrapped inside a promise
    })
    console.log(numFruits) // a list of promise
    console.log('End')
}
_()

async function _() {
    console.log('Start')
    
    // map to an array of promise
    const promises = fruitsToGet.map(fruit => {
        return getNumFruit(fruit)
    })
    const numFruits = await Promise.all(promises)
    console.log(numFruits)
    console.log('End')
}
_()
```

filter

`await` in `filter`  doesn’t work at all.
the callback always returns a promise. 
Since promises are always truthy, everything item in the array passes the filter.

filter according to the promise result's criteria

1. use map to return an array of promises
2. await on Promise.all
3. filter the result

```js
async function _() {
    console.log('Start')
  
    const promises = fruitsToGet.map(fruit => getNumFruit(fruit))
    const numFruits = await Promise.all(promises)
  
    const moreThan20 = fruitsToGet.filter((fruit, index) => {
      const numFruit = numFruits[index]
      return numFruit > 20
    })
  
    console.log(moreThan20)
    console.log('End')
}
_()
```

reduce

reduce is also problematic

best way to do it

1. use map to return an array of promises
2. await on Promise.all
3. reduce the result

```js
async function _() {
    console.log('Start')
  
    const promises = fruitsToGet.map(getNumFruit)
    const numFruits = await Promise.all(promises)
  
    const sum = numFruits.reduce((sum, fruit) => sum + fruit, 0)
  
    console.log(sum)
    console.log('End')
}
_()
```

* If you want to execute await calls in series, use a for-loop (or any loop without a callback).

* Don’t ever use await with forEach. Use a for-loop (or any loop without a callback) instead.

* Don’t await inside filter and reduce. Always await an array of promises with map, 
    then filter or reduce accordingly.