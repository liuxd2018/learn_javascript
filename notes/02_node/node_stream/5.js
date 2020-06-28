'use strict'

const {Readable} = require('stream')

const {promisify} = require('util')
const sleep = promisify(setTimeout)

async function* generate() {
    for(let i = 1; i < 1025; i++) {
        yield i
    }
}
async function run() {
    // const rs = Readable.from(generate())
    // for await(let chunk of rs) {
    //     console.log(chunk)
    // }
// or
    for await(let chunk of generate()) {
        await sleep(100)
        console.log(chunk)
    }
}

run()