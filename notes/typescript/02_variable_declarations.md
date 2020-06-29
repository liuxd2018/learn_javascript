# quirks of var

- var is function-scoped, has no respect for block scope. parameters are also function scoped.
- you can redelare the var binding in the same function scope, create shadowing 
  
```javascript
function sumMatrix(matrix: number[][]) {
    var sum = 0;
    for (var i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i];
        for (var i = 0; i < currentRow.length; i++) {
            sum += currentRow[i];
        }
    }
    return sum;
}
// second i shadowing the first i, result in error
```

```javascript
for (var i = 0; i < 10; i++) {
    setTimeout(function() { console.log(i);}, 100 * i);
}
// without block scope , every function expression we pass to setTimeout actually refers to the same i from the top scope
```

# let declarations

- block-scope, block-scoped variables are not visible outside of their nearest containing block or for-loop
- no hositing of names, 'temporal dead zone'
- no shadowing in the same scope (shadowing = re-declaration)

# const declarations

- like let, add that can not be re-assigned
- not necessary be immutable( because you can re-assign to properties of the const)
- the internal state of a const variable is still modifiable, you can specify that members of an object are readonly in typescript

```javascript
const numLivesForCat = 9;
const kitty = {
    name: "Aurora",
    numLives: numLivesForCat, // primary, make a copy
}

// Error
kitty = {
    name: "Danielle",
    numLives: numLivesForCat
};

// all "okay"
kitty.name = "Rory";
kitty.name = "Kitty";
kitty.name = "Cat";
kitty.numLives--;
```

# alias or copy

every thing is a copied, but the content is different, primary -- the value itself, object -- the reference/point to the object

# destructuring assigment

array
object
 - property renaming
 - default values
rest
ignoring
used in function declaration

anything but the simplest destructuring expression is confusing  


# rest and spread







