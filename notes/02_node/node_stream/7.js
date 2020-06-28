'use strict'


const  {createReadStream} = require('fs')
const {pipeline, finished, Duplex} = require('stream')
const { createServer, request } = require('http')

const server = createServer(function(req, res) { // don't use async function in here
    console.log('>> request')
    // always add a catch handler
    print(req, res).catch(function(err) {
        if(err) {
            res.statusCode = 500
            res.end(err.message)
        }
    })
})

async function print(req, res) {
    req.setEncoding('utf8')
    let total = 0;
    for await(let chunk of req) {
        total += chunk.length
    }
    res.end(`>> received ${total} characters`)
}

server.listen(0, function () {
    console.log('>> listening')
    const duplex = request({
        port: server.address().port,
        method: 'POST'
    })

    pipeline(createReadStream(__filename), duplex, function(err) {
        if(err) {
            console.log(err)
        }
    })

    duplex.on('response', function(res) {
        res.pipe(process.stdout)
        finished(res, function(err) {
            if(err) {
                console.log(err)
            }
            console.log('')
            server.close()
        })
    })
})

