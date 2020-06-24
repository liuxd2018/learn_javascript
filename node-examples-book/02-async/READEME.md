# async in nodejs

non-blocking async runtime

be careful not to unintentionally create blocking behavior

* perform async actions in series
    'after X happens, do Y'
    using a callback to wait until an asynchronous action has completed
* perform a group of async actions in parallel on **array of data**

one and done

* callback
    * callback is always the last argument
    * the error (or null if no error occurred) is the first argument when executing a provided callback
        * programmers are expected to check and handle the error first before moving on
* promise
* async/await


repeated asynchronous work

* event emitter (channel) **intermittent data source** `emit()` `on()`
    handle async behavior when the future action is either uncertain or repetitive

    you can encapsulate filtering behavior into event emitter

    event: a significant change in state
    state change triggers the message emission
    production(client), publishing(to message broker), propagation(inside message broker), detection(to client), consumption(inside client)
    loosely coupled components (process and queue)
        - thread and queue
        - fiber and channel
        - service and message broker
* stream (a specific type of event emitter)
    * readable stream  `data` `error` `end` event Http request
    * writable steram `write()` `end()`  http response
    * using `Transform` to work with large file


`process` object

`fs` callback `fs/promises` promise module

`Buffer`
