const o = new Object()
o.firstName = 'Jordan'
o.lastName = 'Hayashi'
o.isTeaching = true
o.greet = function() {
    console.log("hi!")
}

const o2 = {}
o2.firstName = "Jordan"
o2['lastName'] = 'Hayashi'
const key = 'isTeaching'
o[key] = true

const o3 = {
    1: 1,
    firstName: 'Jordan',
    //...
}

// number as property name
// implicit casting to string

o3[1]
o3.'1' // wrong

// dot notation only works for identifier
// bracket works for number and string
// internally key is string