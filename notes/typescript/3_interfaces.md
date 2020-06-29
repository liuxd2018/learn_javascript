# structural subtyping

type-checking focuses on the shap for compatibility.

# object expression and object type annotation

```typescript
{size: 10, label: 'Size 10 Object'} // create a object

{label: string} // create type annotation of object type

// name the type annotation with interface keyword
interface LabelledValue {
    label: string;
}
// use it
function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
}
let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);
```

# optional properties

describe possibly available properties while preventing use of properties that are not part of the interface

?

# readonly properties

