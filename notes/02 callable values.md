## categorizing callable values

- what role does callable value play?
  
  - real function
  - method
  - class(constructor function)

- what mode does a callable value operate in?
  
  - synchronous or asynchronous?
  - generator or not?


## real function

- synchronous function
#### syntax

```js

// named
function Hello() {
  return 'hello'
}
// anonymous

function() {
  return 'hello'
}

// prefer named

```

#### name and length(arity)


\#name

\#length

used in function body 

arguments.length

\<name\>

#### parameters
#### return

#### exception

try catch finally

handling a specific error

```js
try {
  foo.bar();
} catch (e) {
  if (e instanceof EvalError) {
    console.log(e.name + ': ' + e.message);
  } else if (e instanceof RangeError) {
    console.log(e.name + ': ' + e.message);
  }
  // ... etc
}
```
throw
Error class
.name
.message
.toStirng()
.stack

custom error object

```js
class MyError extends Error {
  constructor(message) {
    super(message);
    // 注意这里, 如果不加, .name 会返回 Error
    this.name = this.constructor.name;
  }
}

// this doesn't work if you are using ES6 features via a transpiler
```

destructure
spread
closures
  functions can access binding outside the function body

  __function stay connected to their birth scope.__ (lexical scope/ static scope)

hoisting(use let and const instead)

- generator
- asynchronous function
- asynchronous generator function
  

## arrow function

- synchronous arrow function


- asynchronous arrow function


### IIFE pattern (create a closue)
 
- hiding variables from global scope

```js
<script>
  (function IIFE() {
    var tmp = generateData()
    processData(tmp)
    persistData(tmp)
  })()
</script>
```

- create fresh environment, avoiding sharing

```js
function f(){
  var result = []
  for(var i = 0; i < 3; i++) {
    (function IIFE(n) {
      var func = function() {
        return n
      }
      result.push(func)
    })(i)
  }
  return result
}
console.log(f()[1]())
```

- attaching data to object

```js
var obj = (function IIFE() {
  // private
  var privateData = ...
  function privateFunction(...) {
    privateData = ...
    self.publicData = ...;
    self.publicMethod(...)
  }

  // public

  var self = {
    publicMethod: function(...) {
      privateDate = ...
      privateFunction(...)
    },
    publicData: ...
  }
  
  return self

})()
```

- attaching data to function

```js
var obj = {
  method: (function() {
    var invocCount = 0
    return function() {
      invocCount++
      console.log('Invocation #' + invocCount)
      return 'result'
    }
  })()
}
```

### pay attention to callback funciton

high-order function determine the arguments passed to the callback function

```js
// wrong
['1', '2', '3'].map(Number.parseInt)
// right
['1', '2', '3'].map(function(e) {
  return Number.parseInt(e, 10)
})
// right
function unary(f) {
  return function(e) {
     return f(e)
  }
}
['1', '2', '3'].map(unary(Number.parseInt))
```

```js
// wrong
let name = 'Li Lei'
let target = document.getElementById('h')
target.addEventListener('click', function reactToClick(name) {
  console.log('Hello, my name is' + name);
})

// right
let target = document.getElementById('h')
target.addEventListener('click', function reactToClick(event) {
  let name = 'Li Lei'
  console.log('Hello, my name is' + name);
})

```