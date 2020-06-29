class A {a = 0}
class B {b = 0}

function say(a: A, b: B): void;
function say(b: B, a: A): void;
function say(x: A|B, y: A|B): void {
    if(x instanceof A && y instanceof B) {
        console.log('ab');
    } else if (x instanceof B && y instanceof A) {
        console.log("ba");
    } else {
        throw new Error("Fail!");
    }
}

const a = new A();
const b = new B();

say(a, b)
say(b, a)
// say(a, a) // error


function process(input: null): void;
function process(input: String): String;
function process(input: null | String): void | String {
    if(typeof input === 'string') {
        return input;
    }
}

function print(str: String): void {
    console.log(str)
    console.log('---' + str + '---');
}

print(process('hello'))

// print(process(null))// error