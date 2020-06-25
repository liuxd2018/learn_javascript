# import and export

## the module semantic

* read-only bindings to variables, functions, and classes,
  even thougth the module that imports the binding can't
  change the binding's value, the module exports that identifier
  can.
* executed only one in dependency graph
* can't used inside block and function, can't use variable
  in module specifier


## the module loader

```html

<script type="module" src="module.js"></script>

<script type="module">
    import {sum} from './example.js'
    let result = sum(1, 3)
</script>
```

* no name pollution on global scope
* defered execution (don't block html)
    `<script type="module">` acts as though the defer attribute is
    applied. the module file begins downloading as soon as the HTML
    parser encounters it, but doesn't execute until after the document
    has been completely parsed.
* async attribute cause module to race to execute
    normally executed in the order of appearance in HTML file

```js
// loading modules as workers

const worker = new Worker("./module.js", {type: "module"})

```
don't use self.importScripts() to load additinal scripts
use `import` inside `./module.js`

## module specifier

* absolute path from root directory `/`
* relative path from current directory `./` `../`
* URL

## all scenario


```js

/// export:

// Named exports
export function f() {}
export const one = 1;
export {foo, b as bar};
// Re-exporting from another module
export * from './some-module.mjs';
export {foo, b as bar} from './some-module.mjs';


/// ----------------

/// imports:

// Named imports
import {foo, bar as b} from './some-module.mjs';
// Namespace import
import * as someModule from './some-module.mjs';
// Empty import (for modules with side effects)
import './some-module.mjs';



/// ---------------

/// not recomanded default export and import

// Default exports
export default function f() {} // declaration with optional name
// Replacement for `const` (there must be exactly one value)
export default 123;
// Default import
import someModule from './some-module.mjs';
// Combinations:
import someModule, * as someModule from './some-module.mjs';
import someModule, {foo, bar as b} from './some-module.mjs';
import {default as h,foo, bar as b} from './some-module.mjs'; // renaming default
```

## best practice

```javascript

/// export (1)
export function f() {}
export const one = 1

/// re-export (1+1=2)
/// (for deps.ts file, aggregating modules)
export {foo, bar} from './some-module.mjs' // some

/// import (1+2=3)
import {foo, bar} from './some-module.mjs' //using binding

```

## acceptable

```js

/// re-export (1)
export * from './some-module.mjs'  // all

/// import (2)
import './some-module.mjs' // using side effects
import * as someModule from './some-module.mjs'; // for name collision

/// dynamic import _runtime_ (1)
// only use this for "front end code splitting"
const modulePath = './some-module.mjs';
cosnt module = await import(modulePath);
module.foo()
```


## not ok

* renaming `as`


## avoid

* default


----------------------

# file as module

`import.meta`

main module and module graph

# features

dynamic binding

import for same file only executed once