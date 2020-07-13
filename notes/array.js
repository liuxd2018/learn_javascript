const arr = [,,1]

for(const e of arr) {
    if(e === undefined || e === null) {
        continue
    }
    console.log(e)
}

// try catch can't across async barrier
// try {
//     setTimeout(() => {
//         throw new Error('hell')
//     }, 100);
// } catch (error) {
//     console.error(error.message)
// }

setTimeout(() => {
    try {
        throw new Error('hell')
    } catch (error) {
        console.error(error.message)
    }
    
}, 100);

console.log('hello')
