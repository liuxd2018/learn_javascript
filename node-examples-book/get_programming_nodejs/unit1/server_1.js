const {createServer} = require('http')
const httpStatus = require('http-status-codes')
const port = 3000;
createServer((req, res) => {
    console.log('Received an incoming request!')
    res.writeHead(httpStatus.OK, {
        "Content-Type": "text/html"
    })
    const responseMessage = '<h1>Hello, Univers!</h1>'
    res.write(responseMessage)
    res.end()
    console.log(`Sent a response : ${responseMessage}`)

}).listen(port, () => {
    console.log(`The server has started and is listening on port numer: ${port}`)
})
