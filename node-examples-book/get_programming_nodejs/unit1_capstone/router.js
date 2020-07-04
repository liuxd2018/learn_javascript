import httpStatus from 'http-status-codes'
import {contentTypes} from './content_type.js'
import {readFile} from 'fs'

const routes = {
    GET: {},
    POST: {},
}

export function getFile(file, res) {
    readFile(`./${file}`, (err, data) => {
        if(err) {
            res.writeHead(httpStatus.INTERNAL_SERVER_ERROR. contentTypes.html);
            res.end("There was an error serving content!")
            return
        }
        res.end(data);
    })
}

export function handle(req, res) {
    try {
        routes[req.method][req.url](req, res);
    } catch (e) {
        res.writeHead(httpStatus.OK, contentTypes.html);
        getFile('views/error.html', res)
    }
}

export function get(url, handler) {
    routes["GET"][url] = handler
}

export function post(url, handler) {
    routes["POST"][url] = handler
}


// exports = {
//     getFile,
//     handle,
//     get,
//     post,
// }

// module.exports = {
//     getFile,
//     handle,
//     get,
//     post,
// }