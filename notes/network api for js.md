# javascript APIs for networking

[whatwg](https://spec.whatwg.org/)

[file api](https://w3c.github.io/FileAPI/)

Blob and File

[service worker](https://w3c.github.io/ServiceWorker/)

Cache

[fetch](https://fetch.spec.whatwg.org/)

fetch()

[dom](https://dom.spec.whatwg.org/)

AbortController, AbortSignal

[XMLHttpRequest](https://xhr.spec.whatwg.org/)

FormData

[URL](https://url.spec.whatwg.org/)

URL
URLSearchParams

data: URLs

[encoding](https://encoding.spec.whatwg.org/)

TextDecoder
TextEncoder

TextDecoderStream
TextEncoderStream

[html](https://html.spec.whatwg.org/multipage/)

communication

* MessageEvent
    * EventSource server-sent events
    * WebSocket
    * cross-document messaging
    * channel messaging
    * broadcasting to other browsing contexts

being able to make network requests in response to user actions

`fetch()`, promise-based API for making HTTP and HTTPS requests

*Sever-Sent Events*, event-based interface for "long polling"
techniques where web server holds the network connection open
so that it can send data to the client whenever it wants

*WebSockets*, a networking protocol that is designed to inter-
operate with HTTP. It defines an asynchronous message-passing
API where clients and servers can send and receive messages from
each other in a way that is similar to TCP network sockets

## fetch

```js
fetch('/api/users/current')
    .then(respose => response.json())
    .then(currentUser => {
        displayUserInfo(currentUser)
    })


async function isServiceReady() {
    let response = await fetch('/api/service/status')
    let body = await response.text()
    return body === 'ready'
}
```

handling error

network errors, status codes, response headers

```js
fetch('/api/users/current')
.then(response => {
    if(response.ok && response.headers.get('Content-Type') === 'application/json') {
        return response.json() // return a new promise for the body
    } else {
        // throw an error, create a rejected promise
        throw new Error(
            `Unexpected response status ${response.status} or content type`
        )
    }
})
.then(currentUser => {
    displayUserInfo(currentUser)
})
.catch(error => {
    // if the user's browser is offline, fetch() itself will reject
    // if the server returns a bad response then we throw an error above
    console.log("Error while fetching current user: ", error)
})

```

`fetch()` only rejects the promise it returns if it cannot contact the web server at all.
    
    * user device is offline
    * server is unresponsive
    * the URL specifies a hostname that does not exist

`fetch()` resolves its promise when the server's response starts to arrive, as soon as the HTTP
status and response headers area available, but typically before the full response body has arrived.

* response
    * ok: is true if status is 200 or any code between 200 and 299 and is false for any other code.
    * status  404, 500
    * statusText 'Not Found', 'Internal Server Error'
    * headers
        has() test for the presence of a header
        get() get the value of a header
        header names are case-insensitive
        headers object is also iterable
        
        ```js
        fetch(url).then(response => {
            for(const [name, value] of response.headers) {
                console.log(`${name}: ${value}`);
            }
        })
        ```

### request parameters

####  adding name/value pairs at the end of a URL after a ?

URL and URLSearchParams

fetch() function accepts URL objects

```js
async function search(term) {
    let url = new URL("/api/search");
    url.searchParams.set("q", term);
    let response = await fetch(url);
    if (!response.ok) throw new Error(response.statusText);
    let resultsArray = await response.json();
    return resultsArray;
}
```

#### setting request headers

two-argument version of fetch()

Headers object

Request object

```js
let authHeaders = new Headers();
// Don't use Basic auth unless it is over an HTTPS connection.
authHeaders.set("Authorization",
                `Basic ${btoa(`${username}:${password}`)}`);
fetch("/api/users/", { headers: authHeaders })
    .then(response => response.json()) // Error handling omitted...
    .then(usersList => displayAllUsers(usersList));

// second way
let request = new Request(url, { headers });
fetch(request).then(response => ...);
```

### parsing response bodies

Response object

#### completed response body (in bulk)

* json()

* text()

* arrayBuffer()
    returns a promise that resolves to an ArrayBuffer,
    use the ArrayBuffer to create a typed array or a DataView object

* blob()
    returns a promise that resolves to an Blob object,
    browser may stream the response data to a temporary file and then
    return a Blob object that represents that temporary file.
    Therefore, Blob objects do not allow random access to the response
    body the way that an ArrayBuffer does
    
    obtaining the content of a Blob
    * create a URL that refers to it with `URL.createObjectURL()`
    * event-based `FileReader` API to asynchronously obtain the content
    of the Blob as string or an ArrayBuffer

* formData()
    `FormData` object
    expect the body of the Response to be encoded in 'multipart/form-data'

#### streaming response body (in sequential chunks)

processing the chunks of the response body as they arrive over the network
or display a progress bar so that the user can see the progress of the download

* body property `ReadableStream`
    .getReader()
        .read() => {done: boolean; value: Uint8Array | undefined}
* bodyUsed
    if you have already called a response method like text() or json() => true

```js
fetch('big.json')
    .then(response => streamBody(response, updateProgress))
    .then(bodyText => JSON.parse(bodyText))
    .then(handleBigJSONObject)

async function streamBody(response, reportProgress, processChunk) {
    // How many bytes are we expecting, or NaN if no header
    let expectedBytes = parseInt(response.headers.get("Content-Length"));
    let bytesRead = 0; // How many bytes received so far
    let reader = response.body.getReader(); // Read bytes with this function
    let decoder = new TextDecoder("utf-8"); // For converting bytes to text
    let body = ""; // Text read so far
    while(true) { // Loop until we exit below
        let {done, value} = await reader.read(); // Read a chunk
        if (value) { // If we got a byte array:
            if (processChunk) { // Process the bytes if
                let processed = processChunk(value); // a callback was passed.
                if (processed) {
                    body += processed;
                }
            } else { // Otherwise, convert bytes
                body += decoder.decode(value, {stream: true}); // to text.
            }
            if (reportProgress) { // If a progress callback was
                bytesRead += value.length; // passed, then call it
                reportProgress(bytesRead, bytesRead / expectedBytes);
            }
        }
        if (done) { // If this is the last chunk,
            break; // exit the loop
        }
    }
    return body; // Return the body text we accumulated
}
```

there are plans to make `ReadableStream` objects asynchronously iterable so
that they can be used with `for/await loops`

### specifying the request method and request body

two-argement version of `fetch()`, with an options object

```js
fetch(url, {method: 'POST'}).then(r => r.json()).then(handleResponse);
```

POST and PUT typically have a request body containing data to be sent to the server.

```js
fetch(url, {
    method: 'POST',
    body: "hello world"
})
```

the browser automatically adds an appropriate "Content-Length" header
when the body is a string, the browser defaults the "Content-Type" to "text/plain;chatset=UTF=8"

```js
fetch(url, {
    method: "POST",
    headers: new Headers({"Content-Type": "application/json"}),
    body: JSON.stringify(requestBody)
})
```

body property of the fetch() options object does not have to be a string

* typed array, DataView object, ArrayBuffer, specify an appropriate "Content-Type"

* blob, blob have a type property that specifies their content type

* name/value pair
    * URLSearchParams => "application/x-www-form-urlencoded;charset=UTF-8"
    * FormData => "multipart/form-data;boundary=..." with unique boundary string

FormData objects can be created and initialized with values
by passing a <form> element to the FormData() constructor

invoking the FormData() constructor
with no arguments and initializing the name/value pairs it represents with the
set() and append() methods.

## file upload with fetch()

using a FormData object as the request body

obtain a File object

* <input type="file">, "change" event, files array of the input element should contain
    at least one File object
* HTML drag-and-drop API, get files from the dataTransfer.files "drop" event

allows user to create drawings in a <canvas> element, upload user's drawing as PNG

```js
// The canvas.toBlob() function is callback-based.
// This is a Promise-based wrapper for it.
async function getCanvasBlob(canvas) {
    return new Promise((resolve, reject) => {
        canvas.toBlob(resolve);
    });
}
// Here is how we upload a PNG file from a canvas
async function uploadCanvasImage(canvas) {
    let pngblob = await getCanvasBlob(canvas);
    let formdata = new FormData();
    formdata.set("canvasimage", pngblob);
    let response = await fetch("/upload", { method: "POST", body: formdata });
    let body = await response.json();
}
```

### cross-origin requests

origin: protocol + hostname + port

same-origin requests: request data from their own web server
URL passed to fetch() has the same origin as the document that
contains the script that is making the request

web browsers generally disallow (though there are exceptions
for images and scripts) cross-origin network requests.

CORS(Cross-Origin Resource Sharing) enables safe cross-origin requests.

When fetch() is used
with a cross-origin URL, the browser adds an “Origin” header to the request (and
does not allow it to be overridden via the headers property) to notify the web server
that the request is coming from a document with a different origin. If the server
responds to the request with an appropriate “Access-Control-Allow-Origin” header,
then the request proceeds. Otherwise, if the server does not explicitly allow the
request, then the Promise returned by fetch() is rejected.

### aborting a request

AbortController and AbortSignal

```js
function fetchWithTimeout(url, options={}) {
    if(options.timeout) {
        let controller = new AbortController();
        options.signal = controller.signal;

        setTimeout(() => {controller.abort();}, options.timeout);
    }
    return fetch(url, options);
}
```

### miscellaneous options in option object

as second argument to fetch(), Request() constructor

specify the request method, headers, and body

cache: "default" | "no-store" | "reload" | "no-cache" | "force-cache"
redirect: "follow" | "error" | "manual" | "referrer"

