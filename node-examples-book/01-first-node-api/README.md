fs, http, tcp, dns, events, child_process, crypto

HTTP APIs
distributed systems
command-line tools
cross-platform desktop applications

fetch()

const http = require('http')
http.get('http://www.fullstack.io/', (res) => {//...})


# http server

* routing (request method + url)
* query string
* static file


# module

## http

* createServer
* get

## https

* get

## fs

* createReadStream
* appendFile
* readFile
* readdir
* writeFile
* createWriteStream

## querystring

* parse
* stringify

## path

* dirname
* join

## url

* fielURLToPath

## events

* EventEmitter

## stream

* Transform

## readline

* createInterface

-------

# global object

* process
* Buffer
    .concat