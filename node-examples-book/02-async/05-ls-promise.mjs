import { readFile, readdir } from "fs/promises";
import { join } from "path";

// readFile('./05-ls-promise.mjs')
//     .then(data => console.log(`${data.length}`))
//     .catch(err => console.error(err))

// readdir('./')
//     .then(fileList => Promise.all(
//         fileList.map(file => readFile(file).then(data => [file, data.length]))
//     ))
//     .then(results => {
//         results.forEach(([file, length]) => console.log(`${file}: ${length}`))
//         console.log('done!')
//     })
//     .catch(err => console.error(err))

const targetDirectory = process.argv[2] || './'

getFileLengths(targetDirectory)
    .then(results => {
        results.forEach(([file, length]) => console.log(`${file}: ${length}`))
        console.log('done!')
    })
    .catch(err => console.error(err))

function getFileLengths(dir) {
    return readdir(dir).then(fileList => {
        const readFiles = fileList.map(file => {
            const filePath = join(dir, file)
            return readFileLength(filePath)
        })
        return Promise.all(readFiles)
    })
}

function readFileLength(filePath) {
    return readFile(filePath)
        .then(data => [filePath, data.length])
        .catch(err => {
            if(err.code === 'EISDIR') return [filePath, 0]
            throw err
        })
}