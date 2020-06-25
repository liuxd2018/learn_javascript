'use strict'

const {createReadStream} = require('fs')
const {Readable} = require('stream')

const {promisify} = require('util')
const sleep = promisify(setTimeout)

async function run() {
    const rs = createReadStream(__filename)
    rs.setEncoding('utf8')

    for await(let chunk of rs) {
        
        await sleep(10000)
        console.log('-------')
        // read from the disk as full chunk
        console.log(chunk)
    }
}

run()