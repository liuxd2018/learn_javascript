# class

* class
* classical inheritance

* class for creating custom type


## 'template' for creating object

```js
function PersonType(name) {
    this.name = name;
}
PersonType.prototype.sayName = function() {
    console.log(this.name);
}

let person = new PersonType('John')
person.sayName()

console.log(person instanceof PersonType)
console.log(person instanceof Object)

class PersonClass {
    constructor(name) { // special method name
        this.name = name // instance variable (own properties)
    }
    // no comma
    sayName() {
        console.log(this.name)
    }
}

let person1 = new PersonClass('John')
person1.sayName()

console.log(person1 instanceof PersonClass)
console.log(person1 instanceof Object)
```

* not hoisted, behave like a let
* inside code runs in strict mode
* methods are non-enumerable

[field](https://github.com/tc39/proposal-class-fields)
[private](https://github.com/tc39/proposal-private-methods)
[private class property](https://github.com/tc39/proposal-static-class-features/)

```js
class name [extends otherName] {
  // class body

    // constructor
    constructor([arguments]) { ... }

    // public member
    instanceField = 'instance field';
    static staticField = 'static field' ;
    static methodName() { ... }
    methodName() { ... }

    // private identifiers, only use them in class body
    #privateField;
    #privateMethod() {     
    return 'hello world'
    }
    static #PRIVATE_STATIC_FIELD;
    static #privateStaticMethod() {
        return 42
    }

    // and same for accessor property
    get methodName() {}
    set methodName() {}

    // computed member names
    [propertyName] = '';
    [methodName]() {}

    // and same for async function, generator function, async generator function
 }
```

```js
extends

super([arguments]); // calls the parent constructor, setup inheritance
super.functionOnParent([arguments]);
```

## decorators

[proposal](https://github.com/tc39/proposal-decorators)
[typescript](https://www.typescriptlang.org/docs/handbook/decorators.html)


where
* class
* method
    * accessor
* property
* parameter

## inheritance (subclassing -- type, behavior, state)

[typescript](https://www.typescriptlang.org/docs/handbook/classes.html)
[exploringjs](https://exploringjs.com/impatient-js/ch_proto-chains-classes.html#classes)