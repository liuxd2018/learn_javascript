//console.log(thisIsALet) //error!
console.log(thisIsAVar) // => undefined __hositing__ var, function definition
thisIsHoisted()
thisIsNotHoisted() // const/let => reference error var => type error

const thisIsAConst = 50

//thisIsAConst = 51 //error!

const constObj = {}
constObj.a = 'a'

let thisIsALet = 51
thisIsALet = 50

//let thisIsALet = 51 // error!

var thisIsAVar = 50
thisIsAVar = 51
var thisIsAVar = 'new value' // __shadowing__

console.log(thisIsAVar) // => new value

thisIsAGlobalVar = 80

function thisIsHoisted() {
    console.log('this is a function declared at the bottom of a file')
}

const thisIsNotHoisted = function() {
    console.log("this is not hosited")
} 