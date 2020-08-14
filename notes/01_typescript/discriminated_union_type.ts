interface Square {
    kind: "square";
    size: number;
}

interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}

interface Circle {
    kind: "circle";
    radius: number;
}

type Shape = Square | Rectangle | Circle;

function area(s: Shape): number {
    // In the following switch statement, the type of s is narrowed in each case clause
    // according to the value of the discriminant property, thus allowing the other properties
    // of that variant to be accessed without a type assertion.
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.width * s.height;
        case "circle": return Math.PI * s.radius * s.radius;
    }
}

// in haskell
// data Shape = Square {size:: Double} | Rectangle {width:: Double, height:: Double} | Circle {radius:: Double}

interface shape {
    square: {size: number}
    rectangle: {width: number, height: number}
    circle: {radius: number}
}

type AddKind<T> = {
    [K in keyof T]: T[K] & {kind: K}
}

type Shape2 = AddKind<shape>[keyof shape]