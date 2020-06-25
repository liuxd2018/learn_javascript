'use strict'

const {Readable} = require('stream')

const array = []
for(let i = 1; i< 1025; i++) {
    array.push(i)
}

// for testing
const rs = Readable.from(array)

rs.on('data', console.log)