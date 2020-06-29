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