// const worker = new Worker('./worker.js', {type: 'module'})

// const mem = new ArrayBuffer(2)

// const view = new Uint8Array(mem)
// view[0] = 0xff;

// console.log(view)

// worker.postMessage({hello: 'e'}, [mem])


import {hello} from './type.js'

hello('str')