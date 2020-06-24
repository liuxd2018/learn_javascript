const fs = require('fs')

fs.readdir('./', (err, files) => {
    if(err) return console.error(err)

    console.log(files)

    // not ordered as provided with fs.readdir
    files.forEach(function (file) {
        fs.readFile(file, (err, fileData) => {
            if(err) return console.error(err)

            console.log(`${file}: ${fileData.length}`)
        })
    })
    // this is called before file length
    console.log('done!')
})


const seconds = [5, 2]
seconds.forEach(s => {
    setTimeout(() => {
        console.log(`Waited ${s} seconds`);
    }, 1000 * s);
})
console.log('Done!');

// an array of input data
// performs async operation on them
// return when all async operation are successful and finished

// Promise.all()


function mapAsync(arr, fn, onFinish) { // fn is async
    let prevError
    let nRemaining = arr.length // tracking finish state
    const results = []

    arr.forEach((item, i) => {
        fn(item, (err, data) => { // fn will finish in a different order than the items array 
            if(prevError) return // second error will just return

            if(err) {
                prevError = err
                return onFinish(err)
            }

            results[i] = data

            nRemaining--

            if(!nRemaining) onFinish(null, results)
        })
    })
}

function mapSync(arr, fn) { // fn is sync
    const results = []

    arr.forEach((item, i) => {
        const data = fn(item)
        results[i] = data
    })

    return results
}

// keeps track of how many items from the array have been proccessed
// whether or not there's been an error
// a final callback to run after all items have been successfully processed or an error occurs



// directory list

fs.readdir('./', (err, files) => {
    if(err) return console.error(err)

    mapAsync(files, fs.readFile, (err, results) => {
        if(err) return console.error(err)

        results.forEach((data, i) => console.log(`${files[i]}: ${data.length}`))

        console.log('done!')
    })
})