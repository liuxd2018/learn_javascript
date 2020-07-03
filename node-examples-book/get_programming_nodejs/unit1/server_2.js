const {createServer} = require('http')
const httpStatus = require('http-status-codes')
const port = 3000;

function getJSONString(obj) {
    return JSON.stringify(obj, null, 2)
}

const app = createServer();

app.on('request', (req, res) => {
    let body = []

    req.on('data', bodyData => {
        body.push(bodyData)
    })

    req.on('end', () => {
        body = Buffer.concat(body).toString();

        console.log(`Request Body contents: ${body}`)
    })

    // req.method
    // req.url 
    // ==> routing
    console.log(`Method: ${getJSONString(req.method)}`)
    console.log(`URL: ${getJSONString(req.url)}`)
    console.log(`Headers: ${getJSONString(req.headers)}`)

    res.writeHead(httpStatus.OK, {
        'Content-Type': 'text/html'
    });

    res.end('<h1>hello world!</h1>')
})

app.listen(port, () => {
    console.log(`The server has started and is listening on port numer: ${port}`)
})