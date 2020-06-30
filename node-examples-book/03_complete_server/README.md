* connecting to a database
* handling authentication
* logging
* deployment

* listing
    * paging
    * filtering

## es module

* add `"type": "module"` to `package.json` to use import feature.
* use `.mjs` file extension

### syntax

```js
// addTwo.mjs

export function addTwo(num) {
    return num + 2;
}

// app.mjs
import {addTwo} from './addTwo.mjs'

console.log(addTwo(4))
```

### importing

The specifier of an import statement (the string after the from keyword)
can either be an URL-style relative path like './file.mjs'
or a package name like 'fs'

only the 'default export' is supported for CommonJS file or packages

```js
import packageMain from 'commonjs-package'; // Works

import { method } from 'commonjs-package'; // Errors

// ./node_modules/pkg/index.cjs
const state = require('./state.cjs');
module.exports.state = state;
// ./node_modules/pkg/index.mjs
import state from './state.cjs';
export {
  state
};
```

Builtin modules will provide named exports of their public API.
A default export is also provided.

```js
import EventEmitter from 'events';

import fs, { readFileSync } from 'fs';
```

### no __filename __dirname

```js
import {fileURLToPath} from 'url'
import {dirname} from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)
```

## commonjs module

must not have `"type": "module"` inside `package.json`

### `require(module_path)`

* core modules
* with absolute or relative path
    `const circle = require('./circle.js');`
    * own files: module_path begins with `./` or `/`
        you can ommit file extension
    * own directory
        * a directory has `package.json, main field`
        * `index.js file`
* installed module
    `const express = require('express')` from `node_modules` directory

### npm

npm i express
npm rm express
npm view express

### package.json manifest

each application or package should have a manifest file.

name
version
dependencies

```json
{
"name": "myapp",
"version": 1.0.0,
"dependencies": {
    "request": "*",
    "async": "*"
    }
}
```

version semver and version specifiers(version range)

* pinned version `"4.17.1"`
* version range `"^4.17.1"`

distributed software should use pinned version

### exporting

`module.exports` `exports` for defining what a module
exports and makes available through `require()`

```js
// cjsmodule

// assign the exported object to `module.exports`
// can be assigned once
module.exports = (str) => console.log(str)
// modify the exported function
module.exports.log = (str) => console.log(`logging... ${str}`)

// same to
function print(str) {
    console.log(str)
}
print.log = (str) => console.log(`logging... ${str}`)
module.exports = print
```

```js
// usecjsmodule

const print = require('./cjsmodule.js');

print('hello')
print.log('hello')

const {log} = require('./cjsmodule.js')
log('hello')
```

```js
// an aggregating module

var moduleA = require('./moduleA');
var moduleB = require('./moduleB');

var myFunc = function() {
    return "doing some crazy stuff";
}

module.exports = {
    funcA: moduleA.funcA,
    funcB: moduleB.funcB,
    funcC: myFunc
}
```