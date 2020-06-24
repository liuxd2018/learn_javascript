// file serving
// serve static files

import {createServer} from 'http' // using .mjs
import {parse} from 'querystring'
import { createReadStream } from 'fs'
import {getPwd} from './pwd.mjs'

// import {dirname} from 'path';
// import {fileURLToPath} from 'url';


// console.log(import.meta.url)
// function getPwd(url) {
//     return dirname(fileURLToPath(url))
// }


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

function respondStatic(req, res) {
    const filename = `${getPwd(import.meta.url)}/public${req.url.split('/static')[1]}`

    createReadStream(filename)
    .on('error', () => respondNotFound(req, res)) // stream, data sources and data destinations
    .pipe(res)
}

const port = process.env.PORT ?? 1337 // Nullish Coalescing

const server = createServer((req, res) => {
    if(req.url === '/') return respondText(req, res)
    if(req.url === '/json') return respondJson(req, res)
    if(req.url.match(/^\/echo/)) return respondEcho(req, res)
    if(req.url.match(/^\/static/)) return respondStatic(req, res)
    respondNotFound(req, res)
})

server.listen(port)

console.log(`Server listening on port ${port}`)