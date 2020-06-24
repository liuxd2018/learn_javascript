// import {createServer} from 'http' // using .mjs
// import {parse} from 'querystring'

import {getPwd} from './pwd.mjs'
import { createReadStream } from 'fs'
import express from 'express';

const port = process.env.PORT ?? 1337 // Nullish Coalescing

const app = express();

app.get('/', respondText)
app.get('/json', respondJson)
app.get('/echo', respondEcho)
app.get('/static/*', respondStatic)

app.listen(port, () => {console.log(`Server listening on port ${port}`)})

// const server = createServer((req, res) => {
//     if(req.url === '/') return respondText(req, res)
//     if(req.url === '/json') return respondJson(req, res)
//     if(req.url.match(/^\/echo/)) return respondEcho(req, res)
//     if(req.url.match(/^\/static/)) return respondStatic(req, res)
//     respondNotFound(req, res)
// })

// server.listen(port)

// console.log(`Server listening on port ${port}`)




function respondText(req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.end('hi')
}

function respondJson(req, res) {
    // res.setHeader('Content-Type', 'application/json')
    // res.end(JSON.stringify({text: 'hi', numbers: [1,2,3]}))
    res.json({text: 'hi', numbers: [1,2,3]})
}

function respondNotFound(req, res) {
    res.writeHead(404, {'Content-Type': 'text/plain'})
    res.end('Not Found')
}


// ?input={input}
function respondEcho(req, res) {
    // console.log(parse(req.url.split('?').slice(1).join('')))
    // const {input = ''} = parse(req.url.split('?').slice(1).join(''))
    const {input = ''} = req.query
    // res.setHeader('Content-Type', 'application/json')
    // res.end(
    //     JSON.stringify({
    //         normal: input,
    //         shouty: input.toUpperCase(),
    //         characterCount: input.length,
    //         backwards: input.split('').reverse().join('')
    //     })
    // )
    res.json({
        normal: input,
        shouty: input.toUpperCase(),
        characterCount: input.length,
        backwards: input.split('').reverse().join('')
    })
}

function respondStatic(req, res) {
    console.log(req.params[0])

    const filename = `${getPwd(import.meta.url)}/public/${req.params[0]}`

    createReadStream(filename)
    .on('error', () => respondNotFound(req, res)) // stream, data sources and data destinations
    .pipe(res)
}