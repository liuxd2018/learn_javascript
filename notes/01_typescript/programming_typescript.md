## preface

variables, functions, classes, and errors

scale your application across more users, engineers, and servers

types and type operators, type definition and type expression

* latest javascript features
* keep data structures immutable with spread ...
    add a property `k` to object `obj`
    * mutate: `obj.k = 3`
    * create a new object: `const p = {...obj, k: 3,}`
* make sure everything has a type, inferred when possible
* keep code reusable and generic

read-only types,
powerful type inference
deep support for polymorphism
completely structural type system


javascript doesn't expose pointers and references; instead it has
value type and reference type. values are immutable, and include
things like strings, numbers, and booleans, while references point to
often-mutable data structures like arrays, objects, and functions.

copying and aliasing

## chap1

type safety:
    using types to prevent programs from doing invalid things

linter

unit tests and end-to-end tests

typescript gives you error messages in your text editor, as you type.

* sketching out a program at the *type level* before you fill it in at the
    *value level*;
* think about edge cases as you design your program, not as an afterthought.

## chap2

typescript's features and the patterns

typescript's type annotation and type expression are only used by
`typechecker`, no runtime representation

typechecker:
    a program that verifies that your code is typesafe
type system:
    a set of rules that a typechecker uses to
    assign types to your program.

`let a: number = 1`
`modifer name: type = value`

building a mental model of how typescript/langauges works

strong type system do not allow implicit type convertion except in a few cases.

typescript throws both syntax-related errors and type-related errors at compile time.

incrementally compiled ==> instant feedback in editor

lots of errors that typescript can't catch 
* stack overflows
* broken network connections
* malformed user inputs

### setup

* code editor -- vscode
* node/npm 
* git
* terminal

#### typescript + node

* typescript: tsc command
* @types/node: ambient types for node
* ts-node: running typescript code directly without having to wait for it be compiled
* nodemon: watch for changes to our code and automatically restart
* rimraf: a cross-platform tool that acts like the `rm -rf`

```shell
npm init -y
npm i -D typescript @types/node ts-node nodemon rimraf
npx tsc --init --rootDir src --outDir build \
--esModuleInterop --resolveJsonModule --lib es6 \
--module commonjs --allowJs true --noImplicitAny true
```

ambient types are types that get added to the global execution
scope.

##### tsconfig.json

`lib` option adds ambient types to project, allowing us to rely
on features from different ecmascript versions.

`noImplicitAny` every varible needs to either have a specific type
or be explicitly declared `any`. no implicit `any`s

##### nodemon.json

```json
{
    "watch": ["src"],
    "ext": ".ts,.js",
    "ignore": [],
    "exec": "ts-node ./src/index.ts"
}
```

##### package.json

development startup script

```json
"start:dev": "nodemon",
```

production build script

```json
"build": "rimraf ./build && tsc",
```

production startup script

```json
"start": "npm run build && node build/index.js",
```

#### eslint

* eslint: the core ESLint linting library
* @typescript-eslint/parser: the parser that will allow ESLint to lint TypeScript code
* @typescript-eslint/eslint-plugin: a plugin that contains a bunch of ESLint rules that are TypeScript specific

```shell
npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

##### .eslintrc.json

```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "ignorePatterns": ["build", "node_modules"]
}
```

##### lint script

```json
"lint": "eslint . --ext .ts"
```

#### prettier

* prettier


```shell
npm i -D prettier
```

script

```json
"fmt": "prettier --write src/**/*.ts",
```

#### integration with editor(save and paste in event) and git(commit hook)

#### reading

[1](https://zhuanlan.zhihu.com/p/62401626)
[2](https://glebbahmutov.com/blog/configure-prettier-in-vscode/)

### setup summary

the trick is not to repeat configuration for same thing in diferent tool

type checker: code correctness, syntax rules and type rules  == git commit hook, live feedback in editor
linter: code conventions, code quality rules == git commit hook, live feedback in editor
formatter: formatting rules == git commit hook, stage files for commit and file save event
editorconfig: == live formatting

editor
git

[editorconfig](https://editorconfig.org/)
[prettier](https://prettier.io/)
[eslint](https://eslint.org/)
[typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)
[husky](https://github.com/typicode/husky)

[tutorial_0](https://khalilstemmler.com/blogs/typescript/node-starter-project/)
[tutorial_1](https://khalilstemmler.com/blogs/typescript/eslint-for-typescript/)
[tutorial_2](https://khalilstemmler.com/blogs/tooling/prettier/)
[tutorial_3](https://khalilstemmler.com/blogs/tooling/enforcing-husky-precommit-hooks/)
[starter_0](https://github.com/stemmlerjs/simple-typescript-starter)


source map
type definition file
debugger

babel(using tsc to type check and use babel to compile)
webpack bundler


### ts ecosystem

[ts](https://github.com/microsoft/TypeScript)
[wiki](https://github.com/Microsoft/TypeScript/wiki)
[handbook](https://github.com/microsoft/TypeScript-Handbook)
[new handbook](https://github.com/microsoft/TypeScript-New-Handbook)
[blog](https://devblogs.microsoft.com/typescript/)

starter

[starter ts node](https://github.com/microsoft/TypeScript-Node-Starter)
[starter ts node babel](https://github.com/microsoft/TypeScript-Babel-Starter)
[babel announce](https://devblogs.microsoft.com/typescript/typescript-and-babel-7/)
[blog entry](https://iamturns.com/typescript-babel/)
[starter ts react](https://github.com/microsoft/TypeScript-React-Starter)
[react ts conversion](https://github.com/microsoft/TypeScript-React-Conversion-Guide)
[ts samples](https://github.com/microsoft/TypeScriptSamples)

d.ts generation

[dts-gen](https://github.com/microsoft/dts-gen)
[webidl gen](https://github.com/microsoft/TSJS-lib-generator)
[linting .d.ts](https://github.com/microsoft/dtslint)
[tsd test](https://github.com/SamVerschueren/tsd)

plugin

[styled component](https://github.com/microsoft/typescript-styled-plugin)
[lit-html](https://github.com/microsoft/typescript-lit-html-plugin)

tsdoc

[tsdoc](https://github.com/microsoft/tsdoc)

ts-parsec

[ts-parsec](https://github.com/microsoft/ts-parsec)

editor

integration typescript language server, don't bother with eslint and prettier.

### emacs for development

typescript.el

    font-locking/syntax-highlighting
    auto indenting

https://github.com/emacs-typescript/typescript.el

ts-comint

https://github.com/emacs-typescript/ts-comint

tide: an interface between the typescript tools (tsc, tsserver) and emacs

    error checking
        type checking
        lint checking
    type display
    code completion
    source jumping/definition jump
    and more!

    flycheck
    eldoc
    company-mode


lsp-mode


http://redgreenrepeat.com/2018/05/04/typescript-in-emacs/
https://blog.takuchalle.dev/post/2018/10/17/emacs_typescript_setup/
https://www.reddit.com/r/emacs/comments/8s801f/best_package_for_working_with_typescript/
http://wikemacs.org/wiki/TypeScript
https://github.com/ananthakumaran/tide
https://github.com/theia-ide/typescript-language-server
https://github.com/emacs-lsp/lsp-mode
