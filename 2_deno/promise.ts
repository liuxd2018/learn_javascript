// async function as(): Promise<string> {
//     return "h";
// }

// as().then(re => {
    
//     console.log('hello')
// }).catch(e => {
//     console.log(e.message)
// })

const p = new Promise((resolve, reject) => {
    // return 1;
    throw new Error('h')
})

// try {
console.log(await p);
    
// } catch (error) {
//     console.log(error)
// }