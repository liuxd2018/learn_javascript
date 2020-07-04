const {createServer} = require('http')
const httpStatus = require('http-status-codes')
const contentTypes = require('./content_type.js')
const {getFile, get, post, handle} = require('./router.js')

const port = 3000;

get('/', (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.html)
    getFile('views/index.html', res)
})

get("/courses.html", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.html);
    getFile("views/courses.html", res);
  });
  
get("/contact.html", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.html);
    getFile("views/contact.html", res);
});
  
post("/", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.html);
    getFile("views/thanks.html", res);
});

get("/graph.png", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.png);
    getFile("public/images/graph.png", res);
});

get("/people.jpg", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.jpg);
    getFile("public/images/people.jpg", res);
});

get("/product.jpg", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.jpg);
    getFile("public/images/product.jpg", res);
});

get("/confetti_cuisine.css", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.css);
    getFile("public/css/confetti_cuisine.css", res);
});

get("/bootstrap.css", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.css);
    getFile("public/css/bootstrap.css", res);
});

get("/confetti_cuisine.js", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.js);
    getFile("public/js/confetti_cuisine.js", res);
});

createServer(handle).listen(port, () => {
    console.log(`The server is listening on port number: ${port}`);
});
 