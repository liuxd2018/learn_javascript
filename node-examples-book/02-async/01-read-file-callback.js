const fs = require('fs')

const filename = '01-read-file-callback.js.no'

fs.readFile(filename, (err, fileData) => {
    if(err) return console.log(err) // if err is falsy

    console.log(`${filename}: ${fileData.length}`)

    console.dirxml(fileData)
})