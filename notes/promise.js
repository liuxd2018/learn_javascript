const {open} = require('fs').promises;

var leakedFd  = false;

// by avoiding mixing callbacks and promises, we keep the code
// easier to read, easier to reason about, and easier to avoid
// bugs

async function openAndClose() {
    let fd;
    try {
        fd = await open(__filename, 'r+')
        leakedFd = true;
        functionThatDoesNotExist()
    } finally {
        if(fd) await fd.close()
        leakedFd = false
    }
}

openAndClose()
    .catch(err => console.log('err occurred: ', err.message ))