const fs = require('fs')

fs.readdir(directoryPath, (err, fileList) => {
    if(err) return console.error(err)

    console.log(fileList)
})