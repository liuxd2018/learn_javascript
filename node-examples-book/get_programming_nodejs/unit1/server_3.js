const {createServer} = require('http')
const {readFile} = require('fs')

const httpStatus = require('http-status-codes')

const port = 3000
// get /index
function getFilePath(url) {
    return `views${url}.html`
}

createServer((req, res) => {
    let viewPath = getFilePath(req.url)
    readFile(viewPath, (err, data) => {
        if(err) {
            res.writeHead(httpStatus.NOT_FOUND)
            res.write('<h1>FILE NOT FOUND</h1>')
        } else {
            res.writeHead(httpStatus.OK, {
                'Content-Type': 'text/html'
            })
            res.write(data)
        }
        res.end()
    })
}).listen(port, () => {
    console.log(`The server has started and is listening on port number: ${port}`);
})