const httpStatus = require('http-status-codes')
const contentTypes = require('./content_type.js')
const {readFile} = require('fs')

const routes = {
    GET: {},
    POST: {},
}

function getFile(file, res) {
    readFile(`./${file}`, (err, data) => {
        if(err) {
            res.writeHead(httpStatus.INTERNAL_SERVER_ERROR. contentTypes.html);
            res.end("There was an error serving content!")
            return
        }
        res.end(data);
    })
}

function handle(req, res) {
    try {
        routes[req.method][req.url](req, res);
    } catch (e) {
        res.writeHead(httpStatus.OK, contentTypes.html);
        getFile('views/error.html', res)
    }
}

function get(url, handler) {
    routes["GET"][url] = handler
}

function post(url, handler) {
    routes["POST"][url] = handler
}


// exports = {
//     getFile,
//     handle,
//     get,
//     post,
// }

module.exports = {
    getFile,
    handle,
    get,
    post,
}