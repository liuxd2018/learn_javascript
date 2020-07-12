function* gen() {
    yield 1;
    yield 2;
    throw new Error('error')
    yield 3;
}

try {

    for (const i of gen()) {
        console.log(i)
    }
    
} catch (error) {
    console.log(error.message)
}


async function* asyncgen() {
    yield 1
    yield 2
    throw new Error('error')
}

async function main() {
    // try {

        for await (const i of asyncgen()) {
            console.log(i)
        }
        
    // } catch (error) {
    //     console.log(error.message)
    // }

    console.log('hello')
}



main().catch(e => console.log(e.message))