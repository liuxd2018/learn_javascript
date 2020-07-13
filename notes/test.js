async function hello() {
    throw new Error('rejection')
}

function hello2() {
    throw new Error('exception')
}



// try {
//     await hello()
//     hello2()
// } catch (error) {
//     console.log(error.message)
// }
// console.log('hello')

async function main() {
    try {
        await hello() // if you ommit `await` rejection will not be caught
        // hello2()
    } catch (error) {
        console.log(error.message)
    }
    console.log('hello')
}

main()

