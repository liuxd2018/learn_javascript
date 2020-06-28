# whatwg streams in nodejs

```js
readableStream.pipeTo(writableSteam)
    .then(() => console.log('All data successfully written'))
    .catch(e => console.error('Something went wrong!', e));
```

* web standards
* fetch()

## conversion between the streams(nodejs stream)

```js
Readable.prototype.acquireStandardStream = function() {
  emitExperimentalWarning('Readable.acquireStandardStream');
  return new ReadableStream({
    start: (controller) => {
      this.pause();
      this.on('data', (chunk) => {
        // double buffer is happening
        controller.enqueue(chunk);
        this.pause();
      });
      this.once('end', () => controller.close());
      this.once('error', (e) => controller.error(e));
    },
    pull: () => {
      this.resume();
    },
    cancel: () => {
      this.destroy();
    },
  }, {
    highWaterMark: this.readableHighWaterMark,
  });
};
```

double buffering as a non-goal

## async iterables

```js
async function print(readable) {
  // This function works the same on both
  // and Node streams can match the WHATWG API
  // for async iterators
  let data = '';
  for await (const k of readable) {
    data += k;
  }
  console.log(data);
}
```

## pipeline

```js
async function run(origin, dest) {
  try {
    // buildWrite is hard
    const write = buildWrite(dest);
    // This is an async iterator
    for await (let chunk of origin) {
      await write(chunk.toString().toUpperCase());
    }
    await promisify(finished)(dest);
  } catch (err) {
    origin.destroy(err);
    dest.destroy(err);
  }
}

async function run(origin, dest) {
function buildWrite(stream) {
  // This is a good way of wrapping stream.write into a Promise.
  // We are waiting for a drain event to resolve, and we are wrapping
  // the error event. A consumer should probably use finished to
  // know if the stream has completed.
  const streamError = null;
  stream.on("error", function(err) {
    streamError = err;
  });

  return write;

  function write(chunk) {
    if (streamError) {
      return Promise.reject(streamError);
    }

    return new Promise(function(resolve, reject) {
      const res = stream.write(chunk);
      if (res) {
        resolve();
      } else {
        stream.once("drain", resolve);
      }
    });
  }
}

```


## summary

* take asyncIterator out of experimental
* solve the "pipeline" problem with an utility in core

proposal

* require('whatwg-stream')
* ecosystem module
* semver-versioned
* support for node 6 8 10

pipeline(
    whatwgReadable,
    nodeTransform,
    whatwgWritable,
    (err) => {}
)

pipeline(
    nodeReadable,
    whatwgTransform1,
    whatwgTransform2,
    nodeWritable,
    (err) => {}
)