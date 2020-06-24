// type options = 'hello' | 'world'

// function process(input: options): void {
//     console.log(input);
// }

// process('hello') // how do you know the possible value?


const Options = {
    HELLO: 'hello',
    WORLD: 'world'
} as const;

type a = typeof Options  // typeof 

type b  = typeof Options['HELLO'] // []

type c  = keyof typeof Options // keyof

type Options = typeof Options [ keyof typeof Options]

function process2(input: Options): void {
    console.log(input);
}

process2(Options.HELLO)

const v = null;
// type [type] = typeof [identifier]
type e =  typeof process2; // typeof used of type operator

// typeof [value] => string
console.log(typeof null)// typeof used of value operator

