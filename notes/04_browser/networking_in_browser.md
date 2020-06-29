making server requests and evaluating the responses

# working with xhr api

[promisify xhr](https://stackoverflow.com/questions/30008114/how-do-i-promisify-native-xhr)

## error first call back

```js
function makeRequest(method, url, cb) {
    const xhr = new XMLHttpRequeset()
    xhr.open(method, url)
    xhr.onload = () => {
        done(null, xhr.response);
    }
    xhr.onerror = () => {
        done(xhr.response);
    }
    xhr.send()
}

makeRequest('GET', 'http://example.com', (err, data) => {
    if(err) {throw err;}
    console.log(data)
})
```

## promise

```js
function request(method, url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = resolve;
        xhr.onerror = reject;
        xhr.send();
    });
}

request('GET', 'http://google.com')
    .then(function (res) {
        console.log(res.target.response);
    })
    .catch(e => {
        // handle errors
    })
```

# fetch API

