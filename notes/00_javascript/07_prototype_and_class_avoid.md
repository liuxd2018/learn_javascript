you should avoid inheritance all together

so there is no reason to use class (constructor function)

use normal function instead

```js
function makeStudent(name, grade) {
    return {
        name,
        grade,
        hello() {
            console.log("hello my name is" + this.name);
        },
    }
}
```