# node notes

## get programming with nodejs 2019

### foreword

practical ubiquity

the largest code repository ever for any programming language by
more than 6 times

API handling
databases
authentication
and more

an asynchronous event driven javascript runtime

event driven:
    on launch. the program sits in an event-loop waiting for events to occur;
    when they do, each event is placed at the end of an event-queue.
    the runtime removes each event from the head of the queue and 'handles' it
    by invoking the event handler functions which have been bound to the event.

event listeners:
    some functions runs when an event with a matching name is emitted.

event emitters:
    objects that fire event names

non-blocking I/O:
    when input is requested(e.g., disk-access), the program doesn't
    wait for the data from disk. it continues on with 'something else'.
    the code to be executed when the disk data is finally available is placed
    in a 'callback function' and that function is invoked when the data-available
    event occurs

web application:
    * a series of linked static pages and assets
    * pages which were dynamically generated from a database(templating)
    * pages which send significant amounts of new data and can ask for
      updates for parts of a page without refreshing the page(ajax, client-side templating)
    * pages which need constant communication;
        * updates without asking
        * talking to each other(chat)

```js
const {createServer} = require('http')
// binds the event handler function with the 
// incoming HTTP request event

// serverRequest object
// method
// url
// headers
// trailers
// httpVersion
// setEncoding(encoding=null)
// pause()
// resume()
// connection
function logRequest(req) {
    console.log(`REQUEST: ${req.method} HTTP ${req.httpVersion} ${req.url}`)
    console.dir(req.headers)
}

createServer((req, res) => {
    logRequest(req)
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('Hello World\n')
}).listen(1337, () => {
    console.log('Server running on port 1337')
})

```

```js
// serve a static file
const {createServer} = require('http')
const {readFile} = require('fs')
createServer((req, res) => {
    readFile('./home.html', (err, data) => {
        if(err) {
            res.writeHead(200, {'Content-Type': 'text/plain'})
            res.end('Error\n')
            return
        }
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end(data)
    })
}).listen(1337, () => {
    console.log('Server running on port 1337')
})

```



the use of events as a way for the server to execute most of an application's tasks,
run parts of tasks and continue to other tasks before the first task completes.
instead of waiting for an operation from start to finish, nodejs register event
listeners, which are called when teh task the was sent off is complete.

Node.js handles only one task at a time and uses more threads only for tasks that can't
be handled by the main thread.

a pool of processes or threads (an operating-system resource dedicated to running
a series of commands, handling every single tasks, and blocking other tasks from completion)

the inner working of a web applicaiton, and how everything fits together

how a web application is architected

build your development skills through repetition and practice

consider working through an exercise three times.

### unit 0

* terminal and bash
    * PATH: index for finding executable files
    * `which node`
* node.js (node and npm/npx)
    * nvm(node version manager)
        * nvm list
        * nvm ls-remote
        * nvm install 11.0.0
        * node -v
* text editor
* git
    * git --version


*core modules*

.load
.save
.help
.exit
.break
.editor

`console` a global object

### unit 1

`require()` create a variable point to `module.exports` object in other file

`exports` is a variable point to `module.exports` object
`module.exports`

so you cann't do this `exports = () => console.log('hello')`
you can do this `module.exports = () => console.log('hello')`

npm commands

npm init -y
npm i <package>
    npm i express
    npm i express-generator -g
npm rm  <package>
npm docs <package>
npm start
npm stop
npm publish

HTTP methods

GET
POST form redirect to another page after processing your data

HTTPS https://letsencrypt.org certificates must be renewed every 90 days


middleware

routes:
    code logic to match requests with appropriate response

handler function

data chunks and streams