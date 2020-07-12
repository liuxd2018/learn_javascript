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

// for loop

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

// forEach

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

// map

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

// filter

// `await` in `filter`  doesn’t work at all.
// the callback always returns a promise. 
// Since promises are always truthy, everything item in the array passes the filter.

// filter according to the promise result's criteria

// 1. use map to return an array of promises
// 2. await on Promise.all
// 3. filter the result

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

// reduce

// reduce is also problematic

// best way to do it

// 1. use map to return an array of promises
// 2. await on Promise.all
// 3. reduce the result

async function _() {
    console.log('Start')
  
    const promises = fruitsToGet.map(getNumFruit)
    const numFruits = await Promise.all(promises)
  
    const sum = numFruits.reduce((sum, fruit) => sum + fruit, 0)
  
    console.log(sum)
    console.log('End')
}
_()

// If you want to execute await calls in series, use a for-loop (or any loop without a callback).

// Don’t ever use await with forEach. Use a for-loop (or any loop without a callback) instead.

// Don’t await inside filter and reduce. Always await an array of promises with map, 
// then filter or reduce accordingly.