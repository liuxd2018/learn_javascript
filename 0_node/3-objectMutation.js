const o = {
    a: 'a',
    b : 'b',
}

const o2 = o  // this is what happens when passing  a. aliasing

o.a = 'new value'

console.log(o2.a)

// b. copying

const o3 = Object.assign({}, o)

// this copying is shallow

const o = {
    a: 'a',
    b: 'b',
    obj: {
        key: 'key',
    },
}

const o2 = Object.assign({}, o)
o2.obj.key = 'new value'
console.log(o.obj.key) //--> new value

// deep copy

function deepCopy(obj) {
    // check if vals are objects
    // if so, copy that object (deep copy)
    // else return the value
    const keys = Object.keys(obj)
    const newObject = {}
    for (let key of keys) {  //for...in is not recommended
        if(typeof obj[key] === 'object') {
            newObject[key] = deepCopy(obj[key])
        } else {
            newObject[key] = obj[key]
        }
    }
    return newObject
}