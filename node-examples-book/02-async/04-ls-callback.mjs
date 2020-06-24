import { readdir, readFile } from "fs"
import { join } from "path"




const targetDirectory = process.argv[2] || './'

getFileLengths(targetDirectory, (err, res) => {
    if(err) return console.error(err)

    res.forEach(([file, length]) => console.log(`${file}: ${length}`))

    console.log('done!')
})

function getFileLengths(dir, cb) {
    readdir(dir, (err, files) => {
        if(err) return cb(err)

        const filePaths = files.map(file => join(dir, file))
        mapAsync(filePaths, readFileLength, cb)
    })
}

function readFileLength(file, cb) {
    readFile(file, (err, fileData) => {
        if(err) {
            if(err.code === 'EISDIR') return cb(null, [file, 0])
            return cb(err)
        }
        cb(null, [file, fileData.length])
    })
}

function mapAsync(arr, fn, onFinish) {
    let prevError
    let nRemaining = arr.length
    const results = []

    arr.forEach((item, i) => {
        fn(item, (err, data) => { 
            if(prevError) return

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