import {createServer} from 'http' // using .mjs


const port = process.env.PORT ?? 1337 // Nullish Coalescing

const server = createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({text: 'hi', numbers: [1,2,3]}))
})

server.listen(port)

console.log(`Server listening on port ${port}`)
