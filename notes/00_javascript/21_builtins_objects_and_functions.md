# object

.assign() // use spread operator instead


.create()
.fromEntries()

.freeze()
.isFrozen()

.getOwnPropertyNames() // enumeration
.getOwnPropertySymbols() // enumeration
Reflect.ownKeys() // enumeration
.keys() // enumeration

.values() // enumeration values of all enumerable properties

.entries() // enumeration key-value pairs of enumerable properties

for... in // enumeration avoid

|                                | enumerable | non-e. | string | symbol |
| :-----------------------------:| :---------:| :----- :| :----- :| :----- :|
| Object.keys()                  | ✔          |        | ✔      |        |
| Object.getOwnPropertyNames()   | ✔          | ✔      | ✔      |        |
| Object.getOwnPropertySymbols() | ✔          | ✔      |        | ✔      |
| Reflect.ownKeys()              | ✔          | ✔      | ✔      | ✔      |




.getPrototypeOf()
.setPrototypeOf()

.defineProperties() // avoid
.defineProperty() // avoid
.getOwnPropertyDescriptor() // avoid
.getOwnPropertyDescriptors() // avoid






.is() // comparision `==` `===` `Object.is()`


.preventExtensions()
.isExtensible()
.seal()
.isSealed()














\#hasOwnProperty()  // `in`
\#propertyIsEnumerable()
\#isPrototypeOf()


\#toString()   // meant to be overridden

\#toLocaleString() // meant to be overridden

\#valueOf()  // meant to be overridden


# function

\#call()
\#apply()

\#bind()



\#toString()



