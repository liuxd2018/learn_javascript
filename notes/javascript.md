# js ecosystem

## front end

a stack of four languages

1. declarative languages define the DOM
   * HTML(including SVG)
   * CSS
2. imperative languages modify the DOM
   * JavaScript
   * WebAssembly

## tools for javascript development

vscode (with tsserver)

node

npm

webpack (bundler, build server)

devtools

react

local HTTP server

## js ts compare

## the essential of js

variables

functions

asynchronous(async and event driven)

objects

modules

## async js

* event

* error-first callback

* promise/future/awaitable

* stackless corountine(asnyc+await)

* observable

A normal function, input -> return value / exception / sideeffect
 B normal function + callbacks (error first callbacks in nodejs, event handler in browser)
  C normal funciton + promise
    D iterator and iterable
     E generator function
      F async function
       G async iterator and iterable
        F async generator function

general theory of reactive programming in js

* defination side:

                     sync            async
single value        normal func       async func

multiple values     generator func      async generator func

* call side:         func()                   await func()
                     for(let i of func()) {}    for await (let i of func()) {}


* promise
    * throw in then
    * return in then
    * return in catch
* iterator/iterable
* asyncIterator/asyncIterable

destructing (creating binding, making copy, pattern matching), extracting value from structure

arrow function

## form in browser

how to structure an HTML form

    An HTML form is made of one or more widgets. Most of the time widgets are paired with a label that describes their purpose. 
    The data collected by the form is sent to a web server.
    
    Designing forms is an important step when you are building a site
    or application
    
the native form widgets
    text fields(single line or multiline)
    select boxes
    buttons
    checkboxes
    radio buttons

sending form data
form validation
how to build custom form widgets
sending forms through javascript
HTML forms in legacy browsers
styling HTML formd
advanced styling for HTML forms

## js

JavaScript® (often shortened to JS) is 
a lightweight, 
interpreted, 
object-oriented language 
with first-class functions, 
most known as the scripting language for Web pages, but used in many non-browser environments as well such as node.js or Apache CouchDB.


core functionality
prototype-based object system
animations
regular expressions
closures
array library
DOM(traversal/selector)
ajax
event system
function as first-class objects
math library
string library

retrieve DOM element by ID
```javascript
document.getElementById('test-table');
var e = document.getElementByTagName('span');
e.opacity = 1;
(function fade() {
    (s.opacity -= .1) < 0 ? s.display = 'none' : setTimeout(fade, 40)
})();
```

```javascript
var request = new XMLHttpRequest();
request.open('POST', 'path/to/api', true);
request.onreadystatechange = function(){
    if (request.readyState !=4 || request.status != 200) return;
    alert('Success: ' + request.responseText);
} ;
request.send('banana=yellow');
```

Chapter I Vue.Js Fundamentals
Chapter 1. Install Vue.Js
Chapter 2. Getting Started
Chapter 3. A Flavor Of Directives
Chapter 4. List Rendering
Chapter 5. Interactivity
Chapter 6. Filters
Chapter 7. Components
Chapter 8. Custom Events
Chapter 9. Class And Style Bindings

Chapter II Consuming An Api
Chapter 10. Preface
Chapter 11. Working With Real Data
Chapter 12. Integrating Vue-Resource
Chapter 13. Pagination

Chapter III Building Large-Scale Applications
Chapter 14. Ecmascript 6
Chapter 15. Advanced Workflow
Chapter 16. Working With Single File Components
Chapter 17. Eliminating Duplicate State
Chapter 18. Swapping Components
Chapter 19. Vue Router

state management: vuex
router: vue-router

## js 2

comma and semicolon in js

#Types:

- Dynamic typing

- Primitive types (no methods, immutable)

    undefined
    null
    boolean
    number
    string
    (symbol)

- objects
- typecasting, coercion

    explicit vs. implicit coercion
    
    ```js
    const x = 42
    const explicit = String(x)
    const implicit = x + ''
    ```

- comparing values (equality)

    == coreces the types
    === requires equivalent types

    ```js
    // equality for object
    const a = {b: 'b'}
    const b = {b: 'b'}
    const c = a
    console.log(a === b) // false
    console.log(a === c) // true
    ```

- coercion, cont.

    falsy value:
    - undefined
    - null
    - false
    - +0 -0 NaN
    - ''
- Objects, Arrays, Functions
    - Primitives vs.Object
      - primitive are immutable
      - Objects are mutable and stored by reference
      - Passing by reference vs. passing by value
    - Prototypal Inheritance
      - Non-primitive types have a few properties/methods associated with them
        - Array.prototype.push()
        - String.prototype.toUpperCase()
      - Each object stores a reference to its prototype
      - Properties/methods defined most tightly to the instance have priority
      - Most primitive types have object wrappers
        - String()
        - Number()
        - Boolean()
        - Object()
        - (Symbol())
         ```js
         42.toString() // syntax error, because dot can be part of number
         const num = 42; num.toString() // works
         'h'.toUpperCase() // works
         ```

      - JS will automatically 'box'(wrap) primitive values so you have access to methods
      - don't auto box when use 'instanceof' operator
  ```js
  const x = 42
  x.toString()
  x instanceof Number // false
  ```

- Scope
  - variable lifetime
    - lexical scoping(var): from when they're declared until when their function ends
    - block scoping(const, let): until the next } is reached
    - reassignment and modification in const and let
    - prevent declare same identifier multiple times
    - prevent using before declare
- JavaScript Engine

Before executing the code, the engine reads the entire file and will throw a syntax error if one is found
- Any function definition will be saved in memory
- Variable initializations will not be run, but lexically-scoped variable names wil be declared.

- The Global Object
  All variables and functions are actually parameters and methods on the global object
  - Browser global object is the `window` object
  - Node.js global object is the `global` object

- Closures

Functions that refer to variables declared by parent function
Possible because of scoping

 __function can use variable outside of  itself__

## values and types

* primitives
    * boolean
    * null
    * undefined
    * number
    * string
    * symbol
    * wrapper object
* object
    * constructors
        * Object
        * Function
        * Array
        * Date
        * RegExp
    * wrapper constructors
        * Boolean
        * Number
        * String
    * objects
        * Math
        * JSON