import {getPwd} from './pwd.mjs'
import { createReadStream, appendFile, readFile} from 'fs'
import { EventEmitter } from "events";

const chatEmitter = new EventEmitter();
chatEmitter.on('message', (msg) => {
    appendFile('message.txt', `\n${msg}`, 'utf8', (err, fd) => {
        if(err) throw err;
        console.log(`the message ${msg} was appended to file message.txt`)
    })
})

import express from 'express';

const port = process.env.PORT ?? 1337

const app = express();

app.get('/', respondText)
app.get('/json', respondJson)
app.get('/echo', respondEcho)
app.get('/static/*', respondStatic)
app.get('/chat', respondChat)
app.get('/chatHistory', respondChatHistory)
app.get('/sse', respondSSE)

app.listen(port, () => {console.log(`Server listening on port ${port}`)})


function respondText(req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.end('hi')
}

function respondJson(req, res) {
    res.json({text: 'hi', numbers: [1,2,3]})
}

function respondNotFound(req, res) {
    res.writeHead(404, {'Content-Type': 'text/plain'})
    res.end('Not Found')
}


// ?input={input}
function respondEcho(req, res) {
    const {input = ''} = req.query
    res.json({
        normal: input,
        shouty: input.toUpperCase(),
        characterCount: input.length,
        backwards: input.split('').reverse().join('')
    })
}

function respondChat(req, res) {
    const {message = ''} = req.query

    chatEmitter.emit('message', message)
    res.end()
}

function respondStatic(req, res) {
    // console.log(req.params[0])

    const filename = `${getPwd(import.meta.url)}/public/${req.params[0]}`

    createReadStream(filename)
    .on('error', () => respondNotFound(req, res)) // stream, data sources and data destinations
    .pipe(res)
}

function respondSSE(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive'
    })
    const onMessage = msg => res.write(`data: ${msg}\n\n`)

    chatEmitter.on('message', onMessage)

    // disconnect out onMessage handler form our charEmitter object
    // prevents us from writing messages to a closed connection
    res.on('close', () => {
        chatEmitter.off('message', onMessage)
    })
}

function respondChatHistory(req, res) {
    readFile('./message.txt', 'utf8', (err, data) => {
        if(err) throw err;
        const arr = data.split('\n')
        res.json(arr);
    })

    // res.json({text: 'hi', numbers: [1,2,3]})
}