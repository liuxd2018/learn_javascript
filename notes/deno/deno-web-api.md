Deno Web APIs


This directory facilities Web APIs that are available in Deno.

Please note, that some of implementations might not be completely aligned with specification.

Some of the Web APIs are using ops under the hood, eg. console, performance.

Implemented Web APIs



* Console: for logging purposes

* Timer: setTimeout, setInterval, clearTimeout: scheduling callbacks in future and clearInterval

* URL and URLSearchParams: to construct and parse URLSs

* Worker: executing additional code in a separate thread
    Implementation notes: Blob URLs are not supported, object ownership cannot be transferred, posted data is serialized to JSON instead of structured cloning.

* Performance: retrieving current time with a high precision

CustomEvent, EventTarget and EventListener: to work with DOM events
    Implementation notes: There is no DOM hierarchy in Deno, so there is no tree for Events to bubble/capture through.


fetch, Request, Response, Body and Headers: modern Promise-based HTTP Request API
FormData: access to a multipart/form-data serialization
Blob: for representing opaque binary data
Stream for creating, composing, and consuming streams of data
