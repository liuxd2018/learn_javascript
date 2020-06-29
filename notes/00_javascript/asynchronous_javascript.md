# asynchronous javascript

how async javascript works?

callbacks

the event loop

threading

makes an HTTP request using the `XMLHttpRequest`

```javascript
// make an async HTTP request
let async = true;
let xhr = new XMLHttpRequest();
xhr.open('get', 'data.json', async);
xhr.send();
// create a three second delay
let timestamp = Date.now() + 3000;
while (Date.now() < timestamp);

// now that three seconds have passed
// add a listener to the xhr.load and xhr.error events

function listener() {
    console.log('greetings from listener');
}
xhr.addEventListener('load', listener);
xhr.addEventListener('error', listener);
```

this code is ok, `xhr` can't emmit event when other code is running.

* callbacks

```javascript
let cities = ['Tokyo', 'London', 'Boston', 'Berlin', 'Chicago', 'New York'];
// inline function value
cities.forEach(function callback(city) {
    console.log(city);
});
```

a callback is a function provided to other code for invocation.
callbacks do not have to be declared inline.

```javascript
function callback(city) {
    console.log(city);
}
// function reference to a function value
cities.forEach(callback);
```

callbacks can be invoked synchronously or asynchronously.

sync --> `array.forEach()`
async --> `window.requestAnimationFrame()`

```js
function repositionElement() {
console.log('repositioning!');
    // ...
}
window.requestAnimationFrame(repositionElement); // call returns immediately, and schedule a task to run
console.log('I am the last line of the script');

// Console output:
// I am the last line of the script
// repositioning!
```

Synchronous code can be easier to understand because it executes in the order it is
written.

```js
const fs = require('fs');
const timestamp = new Date().toString();

fs.writeFileSync('date.txt', timestamp);
const contents = fs.readFileSync('date.txt');

console.log('Checking the contents'); // 1
console.assert(contents == timestamp); // 2
console.log('I am the last line of the script'); // 3
// Console output:
// Checking the contents
// I am the last line of the script

const fs = require('fs')
const timestamp = new Date().toString();

fs.writeFile('data.txt', timestamp, function(err) { // return immediately, provides hook to the completion event
    if(err) throw err;
    fs.readFile('data.txt', function(err, contents) {
        if(err) throw err;
        console.log('Checking the contents'); // 2
        console.assert(contents == timestamp); // 3
    })
})
console.log('I am the last line of the script'); // 1
```

Programmers need the ability to write async code so long-running tasks such as network requests
do not block other parts of the program while incomplete. Without that ability, you
couldn’t type in an editor at the same time your document was being autosaved or
scroll through a web page while the browser was still downloading images.

**callbacks are used to manage the execution order of any code that depends on an async task**
putting code that relies on the completion of an async task inside callback.

when design functions:

Functions that invoke a callback synchronously in some cases and
asynchronously in others create forks in the execution path that
make your code less predictable.

* run to completion and the event loop

js itself is single threaded -- javascript code you wirte all runs on a single thread.
async task is handled by underlying system call or addtional native thread.

once the task completes the result needs to be provided to the javascript thread.
at this point the callback is placeed in a queue. after the callback is added to
the queue, there is no guarantee how long it will have to wait. How long it takes
the current code to run to completion and what else is in the queue controls the time.
The JavaScript runtime simply continues
in an endless cycle of pulling an item off the queue if one is available, running the
code that the item triggers, and then checking the queue again. This cycle is known as
the event loop.

run-to-completion: your javascript code runs without interruption until it passes
control back to the host environment by returning from the function that the host
initially called. at that point the callback can be removed from the queue and invoked.

all other threads communicate with your code by placing items on the queue.


## promises (placeholder object to register callbacks that will run when the operation succeeds or an error occurs)

managing execution order through a series of steps and handling any errors that arise.

working with functions that return promises

using promises to manage a sequence of asynchronous steps


### creating promise

```js
function loadImage(url, success, error) {
    var img = new Image(); // loading a HTML Image object by setting its src
    img.onload = function () {
        success(img);
    };
    img.onerror = function (e) {
        error(e);
    };
    img.src = url;
}
loadImage('shadowfacts.png',
    function onsuccess(img) {
        // Add the image to the current web page
        document.body.appendChild(img);
    },
    function onerror(e) {
        console.log('Error occurred while loading image');
        console.log(e);
    }
);
```

```js
// promise
function loadImage(url) {
    var promise = new Promise(
        function resolver(resolve, reject) {
            var img = new Image();
            img.src = url;
            img.onload = function () {
                resolve(img);
            };
            img.onerror = function (e) {
                reject(e);
            };
        }
    );
    return promise;
}
loadImage('security_holes.png').then(function (img) {
    document.body.appendChild(img);
}).catch(function (e) {
    console.log('Error occurred while loading image');
    console.log(e);
});
```

create a promise, used when create a promisefied api

```
new Promise((resolve, reject) => {
  // do something asynchronous which eventually calls either:
  //
  //   resolve(someValue)        // fulfilled
  // or
  //   reject("failure reason")  // rejected
})
```

two convenience methods for creating a promise that is immediately resolved or rejected

* Promise.resolve()
* Promise.reject()


```js
// Equivalent ways to create a resolved promise
new Promise(function (resolve, reject) {
    resolve('the long way')
});
Promise.resolve('the short way');

// Equivalent ways to create a rejected promise
new Promise(function (resolve, reject) {
    reject('long rejection')
});
Promise.reject('short rejection');
```

### chaining promises to execute a sequence of steps

```js
step1().then(
    function step2(resultFromStep1) {
    // ...
    }
).then(
    function step3(resultFromStep2) {
    // ...
    }
).then(
    function step4(resultFromStep3) {
        // ...
    }
);
```

Each call to then returns a new promise you can use to attach another callback.
Whatever value is returned from that callback resolves the new promise. This pattern
allows each step to send its return value to the next step. If a step returns a promise
instead of a value, the following step receives whatever value is used to fulfill that
promise.


```js
Promise.resolve('ta-da!').then(
    function step2(result) {
        console.log('Step 2 received ' + result);
        return 'Greetings from step 2'; // Explicit return value
    }
).then(
    function step3(result) {
        console.log('Step 3 received ' + result); // No explicit return value
    }
).then(
    function step4(result) {
        console.log('Step 4 received ' + result);
        return Promise.resolve('fulfilled value'); // Return a promise
    }
).then(
    function step5(result) {
        console.log('Step 5 received ' + result);
    }
);
// Console output:
// Step 2 received ta-da!
// Step 3 received Greetings from step 2
// Step 4 received undefined
// Step 5 received fulfilled value
```

Promises are primarily used to manage the order in which code is run relative to
other tasks.

understanding the execution
order is a key part of using promises effectively.

```js
var promise = new Promise(function (resolve, reject) {
    console.log('Inside the resolver function'); // 1
    resolve();
});
promise.then(function () {
    console.log('Inside the onFulfilled handler'); // 3
});
console.log('This is the last line of the script'); // 2
// Console output:
// Inside the resolver function
// This is the last line of the script
// Inside the onFulfilled handler
```

### error propagation and handling

one `catch` function is used at the end of a
chain to handle all rejections. This approach treats the chain as a
single unit that the fulfilled or rejected final promise represents.

```js
Promise.reject(Error('bad news')).then(
    function step2() {
        console.log('This is never run'); // this never runs
    }
).then(
    function step3() {
        console.log('This is also never run'); // this never runs
    }
).catch(
    function (error) {
        console.log('Something failed along the way. Inspect error for more info.');
        console.log(error); // Error object with message: 'bad news'
    }
);
// Console output:
// Something failed along the way. Inspect error for more info.
// [Error object] { message: 'bad news' ... }
```

Rejecting a promise by throwing an error in the constructor callback, or an error
is thrown in a callback passed to then.

```js
function rejectWith(val) {
    return new Promise(function (resolve, reject) {
        throw Error(val);
        resolve('Not used'); // This line is never run
    });
}

rejectWith('bad news').then(
    function step2() {
        console.log('This is never run');
    }
).catch(
    function (error) {
        console.log('Foiled again!');
        console.log(error); // Error object with message: 'bad news'
    }
);
// Console output:
// Foiled again!
// [Error object] { message: 'bad news' ... }
```

js Error object, Although any value, including undefined, can reject promises, we recommend
using an error object. Creating an error can capture the call stack for troubleshooting
and makes it easier to treat the argument the catch handler receives in a
uniform way.

### the promise api

* constructor `new Promise(function (resolve, reject) { … }) returns promise`
* then `promise.then([onFulfilled], [onRejected]) returns promise`, only use onFulfilled callback
* catch `promise.catch(onRejected) returns promise`
* `Promise.resolve([value|promise]) returns promise`
* `Promise.reject([reason]) returns promise`
* `Promise.all(iterable) returns promise` iterable of promises, all fulfilled
* `Promise.race(iterable) returns promise` any fulfilled

**iterables and iterators**

Promises can be combined to orchestrate async tasks and structure code in various
ways.
- sequential workflow: run sequential asynchronous steps using promise chains

## working with promises

when you have one async function(function returns promise), any code that
calls (`ayncTask().then(() => {})`) that function now contains an async step.

As a general rule, any function that uses a promise should also return a promise.
When a promise is not propagated, the calling code cannot know when the promise
is fulfilled and thus cannot effectively perform work after the fact.



### consolidating parallel tasks into a single outcome

```js
var accounts = ['Checking Account', 'Travel Rewards Card', 'Big Box Retail Card'];
var requests = accounts.map(function (account) { // array of promises
    return ajax(/*someurl for account*/);
});
// Update status message once *all requests are fulfilled*
Promise.all(requests).then(function (balances) {
    console.log('All ' + balances.length + ' balances are up to date');
}).catch(function (error) {
    console.log('An error occurred while retrieving balance information');
    console.log(error);
}

// all operations represented by some promises to settle regardless
// of whether they succeeded or failed

function settled(promises) {
    let alwaysFulfilled = promises.map(function(p) {
        return p.then(
            function onFulfilled(value) {
                return {state: 'fulfilled', value: value};
            },
            function onRejected(reason) {
                return {state: 'rejected', reason: reason};
            }
        );
    });
    return Promise.all(alwaysFulfilled);
}

// update status message once all requests finish
settled(requests).then(function (outcomes) {
    let count = 0;
    outcomes.forEach(function (outcome) {
        if(outcome.state == 'fulfilled') count++;
    });
    console.log(cout + ' out of ' + outcomes.length + ' balances were updated');
});
```

### dynamically build a chain of promises to run tasks in sequential order (async generator function)

run tasks in parallel

```js
var products = ['sku-1', 'sku-2', 'sku-3'];
products.forEach(function (sku) {
    getInfo(sku).then(function (info) {
        console.log(info)
    });
});
function getInfo(sku) {
    console.log('Requested info for ' + sku);
    return ajax(/*someurl for sku*/);
}
// Console output:
// Requested info for sku-1
// Requested info for sku-2
// Requested info for sku-3
// Info for sku-1
// Info for sku-2
// Info for sku-3
```

build a sequential chain using a loop or recursion

```js
// Build a sequential chain of promises from the elements in an array
function sequence(array, callback) {
    return array.reduce(function chain(promise, item) {
        return promise.then(function () {
            return callback(item);
        });
    }, Promise.resolve());
};
var products = ['sku-1', 'sku-2', 'sku-3'];
sequence(products, function (sku) {
    return getInfo(sku).then(function (info) {
        console.log(info)
    });
}).catch(function (reason) {
    console.log(reason);
});

function getInfo(sku) {
    console.log('Requested info for ' + sku);
    return ajax(/*someurl for sku*/);
}
// Console output:
// Requested info for sku-1
// Info for sku-1
// Requested info for sku-2
// Info for sku-2
// Requested info for sku-3
// Info for sku-3


// Replaces sequence in previous example with a recursive implementation
function sequence(array, callback) {
    function chain(array, index) {
        if (index == array.length) return Promise.resolve();
        return Promise.resolve(callback(array[index])).then(function () {
            return chain(array, index + 1);
        });
    }
    return chain(array, 0);
};
```

The recursive approach adds to the chain on demand
after resolving the preceding promise. A major benefit of the on-demand approach is
the ability to decide whether to continue chaining promises based on the result from
the preceding promise.

### enforcing a time limit on possible long running async task (managing latency)

```js
function getData() {
    var timeAllowed = 500; // milliseconds
    var deadline = Date.now() + timeAllowed;
    var freshData = ajax(/*someurl*/);
    var cachedData = fetchFromCache().then(function (data) {
        return new Promise(function (resolve) {
            var timeRemaining = Math.max(deadline - Date.now(), 0);
            setTimeout(function () {
            resolve(data);
            }, timeRemaining);
        });
    });
    var failure = new Promise(function (resolve, reject) {
        setTimeout(function () {
            reject(new Error('Unable to fetch data in allotted time'));
        }, timeAllowed);
    });
    return Promise.race([freshData, cachedData, failure]);
}
```

### functional composition (building a pipelines of functions)

```js
// Generic image processing functions
function scaleToFit(width, height, image) {
    console.log('Scaling image to ' + width + ' x ' + height);
    return image;
}
function watermark(text, image) {
    console.log('Watermarking image with ' + text);
    return image;
}
function grayscale(image) {
    console.log('Converting image to grayscale');
    return image;
}
// Image processing pipeline
function processImage(image) {
    return Promise.resolve(image).then(function (image) {
        return scaleToFit(300, 450, image);
    }).then(function (image) {
        return watermark('The Real Estate Company', image);
    }).then(function (image) {
        return grayscale(image);
    });
}
// Console output for processImage():
// Scaling image to 300 x 450
// Watermarking image with The Real Estate Company
// Converting image to grayscale

// Replaces processImage in previous example
function processImage(image) {
    // Image is always last parameter preceded by any configuration parameters
    var customScaleToFit = scaleToFit.bind(null, 300, 450); // partial applicaiton
    var customWatermark = watermark.bind(null, 'The Real Estate Company');
    // more succinct
    return Promise.resolve(image)
        .then(customScaleToFit)
        .then(customWatermark)
        .then(grayscale);
}

```

Using promise chains in this manner does not require the individual functions to be
async.

### summary

* async functions and promise are contagious.
* process an arbitrary number of tasks sequentially or in parallel
* managing latency

## error handling

### rejecting promises

```js
var rejectedPromise = new Promise(function (resolve, reject) {
    reject(new Error('Arghhhh!')); // Explicit rejection
});
rejectedPromise.catch(function (err) {
    console.log('Rejected');
    console.log(err);
});
// Console output:
// Rejected
// [Error object] { message: 'Arghhhh!' ... }

var rejectedPromise = new Promise(function (resolve, reject) {
    throw new Error('Arghhhh!'); // Implicit rejection
});
```

functions that return promises should not throw synchronous error??

```js
function badfunc(url) {
    var image;
    image.src = url; // Error: image is undefined
    return new Promise(function (resolve, reject) {
        image.onload = resolve;
        image.onerror = reject;
    });
}
function goodfunc(url) { // this is the semantic of async function
    return new Promise(function (resolve, reject) {
        var image;
        image.src = url; // Error: image is undefined
        image.onload = resolve;
        image.onload = reject;
    });
}
```

Any error that occurs in a function that returns a promise should
be used to reject the promise instead of being thrown back to the
caller.

### passing errors

The `catch` function returns a new promise similar to then, but the promise that
catch returns is only rejected if the callback throws an error. In other words, you
must explicitly `rethrow an error` inside a catch callback if you want the rejection to
continue propagating through the promise chain.

```js
var db = {
    connect: function () {/*...*/},
    query: function () {/*...*/}
};
function getReportData() {
    return db.connect().then(function (connection) {
        return db.query(connection, 'select report data');
    });
}
getReportData().then(function (data) {
    data.sort();
    console.log(data);
}).catch(function (err) {
    console.log('Unable to show data');
});


function getReportData() {
    return db.connect().then(function (connection) {
        return db.query(connection, 'select something');
    }).catch(function (err) {
        console.log('An error occurred while getting the data');
        if (err && err.message) console.log(err.message);
        throw err; // Must re-throw if you want the rejection to propagate further, if not getReportData will always return a resolved promise
    });
}
```

### try/catch/finally

```js
function getData() {
    var timestamp = performance.now();
    try {
        // Fetch data
        // ...
    } catch (err) {
        // Deal with any errors that arise
        // ...
    }
    console.log('getData() took ' + (performance.now() - timestamp));
}
```

Unfortunately this approach swallows the
errors, so the code that calls `getData` never knows when an error occurs. In order to
inform the calling code, the catch block needs to *rethrow the error*, but that will
bypass the log statement. That’s where the finally block comes in.


```js
function getData() {
    var timestamp = performance.now();
    try {
        // Fetch data
        // ...
    } catch (err) {
        // Bubble error up to code that called this function
        throw err;
    } finally {
        // Log time taken regardless of whether the preceding code throws an error
        console.log('getData() took ' + (performance.now() - timestamp));
    }
}
// Console output:
// getData() took 0.030000000158906914
```

any errors thrown within a promise chain are sent to the next catch
callback in the chain.

```js
// Use catch/then to mimic catch/finally
function getData() {
    var dataPromise;
    var timestamp = performance.now();
    dataPromise = new Promise(function (resolve, reject) {
        // ...
        throw new Error('Unexpected problem');
    });
    dataPromise.catch(function (err) {
        // Do not rethrow error
    }).then(function () {
        // Simulates finally block
        console.log('Data fetch took ' + (performance.now() - timestamp));
    });
    // Return data promise instead of catch/then tail to propagate rejection
    return dataPromise;
}
```

### using the call stack, async call stack is truncated

line number and function name

knowing the execution path

```js
function echo(text) {
    console.log(text);
    throw Error('oops');
    // Example of call stack for error when triggered by a mouse click:
    // echo (line:3)
    // showRandomNumber (line:12)
    // handleClick (line:16)
}
function showRandomNumber() {
    echo(Math.random());
}
document.addEventListener('click', function handleClick() {
    showRandomNumber();
});
document.addEventListener('keypress', function handleKeypress() {
    showRandomNumber();
});
```

Remember that a promise invokes each callback in a separate
turn of the event loop. At the beginning of each turn the stack is empty, so none of the
functions called in previous turns appear in the stack when the error occurs.

the Chrome team added an option to show the stack across turns of the
event loop. Now you can see a stack that is stitched together at the points where asynchronous
calls are made.


## es6 features

### destructuring

creating copies(?) / pattern matching / extracting values from arrays or objects

used when declaring function parameters

```js
// Without destructuring
reader.read().then(function (result) {
    // ... Use result.value and result.done
});
// Using destructuring
reader.read().then(function ({value, done}) {
    // ... Use done and value directly
});

// Without destructuring
getAccountStatus().then(function (status) {
    var enabled = status[0];
    var lastLogin = status[1];
    // ...
});
// Using destructuring
getAccountStatus().then(function ([enabled, lastLogin]) {
    // ... Use enabled and lastLogin directly
});

Promise.all([promise1, promise2]).then(function ([result1, result2]) { // result1 and result2 destructuring
// ...
});
```

### arrow functions (shorthand for declaring anonymous functions)

```js
var requests = accounts.map(function (account) {
    return ajax('/balances/' + account);
});
var requests = accounts.map(account => ajax('/balances/' + account));

function processImage(image) {
    return Promise.resolve(image)
        .then(image => scaleToFit(300, 450, image))
        .then(image => watermark('The Real Estate Company', image))
        .then(image => grayscale(image))
        .then(({src}) => console.log('Processing completed for ' + src));
}
```

### iterables and iterators

walking through the items in an array using an index or through the
properties of an object using `for…in`.

Objects that want to expose a series of items can implement the `iterable` interface by
defining a function whose name is the value of `Symbol.iterator`, that is,
`object[Symbol.iterator] = function () {…}`. This function should return an
object with the `iterator` interface.

The iterator interface has one method named `next`. The method returns an object
with two properties named `value` and `done`.

```js
var array = [1, 2];
var iterator = array[Symbol.iterator]();
iterator.next(); // {value: 1, done: false}
iterator.next(); // {value: 2, done: false}
iterator.next(); // {value: undefined, done: true}
```

### generators

A generator is a special type of function that can pause its execution to pass values
back to its caller and later resume executing where it left off. This ability is useful for
generating a series of values.

* the generator declaration syntax
* the iterator
* the `yield` keyword

```js
var a = 0;
var b = 1;
function fib() {
    b = a + b;
    a = b - a;
    return b;
}
var i;
for (i = 0; i < 5; i++) console.log(fib());
// Console output:
// 1
// 2
// 3
// 5
// 8
```

```js
function* fib() {
    var a = 0;
    var b = 1;
    while (true) { // an indefinite amount of fibonacci numbers
        yield a + b;
        b = a + b;
        a = b - a;
    }
}
var i;
var result;
var iterator = fib(); // runtime does not start running the code inside fib, return a iterator instead
for (i = 0; i < 5; i++) {
    result = iterator.next();
    console.log(result.value);
}
```

#### sending values to a generator (initial parameters or as an argument to `iterator.next()`)

The `iterator.next()` (undefined)
method accepts a parameter that is used as a result of the `yield` expression inside the
generator.

The argument is always ignored the first
time iterator.next() is called.

the first call to next does
not resume the function from a paused state. The first call starts the initial execution
of the function and there is no mechanism for receiving a value at that point.

```js
function* counter() {
    var count = 0;
    var increment = 1;
    while (true) {
        count = count + increment;
        increment = (yield count) || increment;
    }
}
var iterator = counter();
console.log(iterator.next().value); // 1
console.log(iterator.next().value); // 2
console.log(iterator.next().value); // 3
console.log(iterator.next(10).value); // 13 <- Start counting by 10
console.log(iterator.next().value); // 23
console.log(iterator.next().value); // 33

function* counter(increment) {
    var count = 0;
    increment = increment || 1;
    while (true) {
        count = count + increment;
        increment = (yield count) || increment;
    }
}
var evens = counter(2);
console.log('Even numbers'); // Even numbers
console.log(evens.next().value); // 2
console.log(evens.next().value); // 4
console.log(evens.next().value); // 6
var fives = counter(5);
console.log('Count by fives'); // Count by fives
console.log(fives.next().value); // 5
console.log(fives.next().value); // 10
console.log(fives.next().value); // 15
```

The result that next returns also exposes a done property to indicate when the iterator
has finished executing.

```js
// Substitute for iterator and console.log in previous example
iterator = match(animals, 'legs', 4);
while ((result = iterator.next()).done !== true) {
    console.log(result.value.type);
}
// Better substitute for iterator and loop
for (animal of match(animals, 'legs', 4)) {
    console.log(animal.type);
}
```

#### sending errors to generator

An iterator can cause an error to be thrown when execution resumes inside a generator.

```js
function* languages() {
    try {
        yield 'English';
        yield 'French';
        yield 'German';
        yield 'Spanish';
    } catch (error) {
        console.log(error.message);
    }
}
var greetings = {
    English: 'Hello',
    French: 'Bonjour',
    Spanish: 'Hola'
};
var iterator = languages();
var result;
var word;
while ((result = iterator.next()).done !== true) {
    word = greetings[result.value];
    if (word) console.log(word);
    else iterator.throw(Error('Missing translation for ' + result.value)); // error is throwed inside the generator
}

// Console output:
// Hello
// Bonjour
// Missing translation for German
```

the ability of sending error to generator s needed to write synchronous-looking code using promises and generators.

#### simulating async function

combine promises and generators.

```js
loadImage('thesis_defense.png').then(function (img) {
    document.body.appendChild(img);
}).catch(function (e) {
    console.log('Error occurred while loading image');
    console.log(e);
});

try {
    var img = loadImage('thesis_defense.png');
    document.body.appendChild(img);
} catch (err) {
    console.log('Error occured while loading the image');
    console.log(err);
}

async(function* () {
    try {
        var img = yield loadImage('thesis_defense.png');
        document.body.appendChild(img);
    } catch (err) {
        console.log('Error occurred while loading the image');
        console.log(err);
    }
})();
```

### async function in es7

```js
async function () {
    try {
        var img = await loadImage('thesis_defense.png');
        document.body.appendChild(img);
    } catch (err) {
        console.log('caught in rejection handler');
        console.log(err);
    }
}
```