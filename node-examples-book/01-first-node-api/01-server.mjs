// const http = require('http')
// import http from 'http'
import {createServer} from 'http' // using .mjs


const port = process.env.PORT ?? 1337 // Nullish Coalescing

const server = createServer((req, res) => {
    res.end('hi')
})

server.listen(port)

console.log(`Server listening on port ${port}`)
