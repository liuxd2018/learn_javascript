// dynamic

// changes responses according to input from the client

// pulling data out of a database or other resource according
// to specific queries sent by the client and filtered by 
// authorization rules

// query parameter

import {createServer} from 'http' // using .mjs
import {parse} from 'querystring'

function respondText(req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.end('hi')
}

function respondJson(req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({text: 'hi', numbers: [1,2,3]}))
}

function respondNotFound(req, res) {
    res.writeHead(404, {'Content-Type': 'text/plain'})
    res.end('Not Found')
}


// ?input={input}
function respondEcho(req, res) {
    console.log(parse(req.url.split('?').slice(1).join('')))
    const {input = ''} = parse(req.url.split('?').slice(1).join(''))
    res.setHeader('Content-Type', 'application/json')
    res.end(
        JSON.stringify({
            normal: input,
            shouty: input.toUpperCase(),
            characterCount: input.length,
            backwards: input.split('').reverse().join('')
        })
    )
}

const port = process.env.PORT ?? 1337 // Nullish Coalescing

const server = createServer((req, res) => {
    if(req.url === '/') return respondText(req, res)
    if(req.url === '/json') return respondJson(req, res)
    if(req.url.match(/^\/echo/)) return respondEcho(req, res)
    respondNotFound(req, res)
})

server.listen(port)

console.log(`Server listening on port ${port}`)