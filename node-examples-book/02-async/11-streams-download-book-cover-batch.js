const fs = require('fs')
const https = require('https')

const {Transform} = require('stream')

const fileUrl = `https://himg2.huanqiucdn.cn/attachment2010/2020/0602/13/06/20200602010650399.jpg`

https.get(fileUrl, res => {
    const chunks = []

    res.on('data', data => chunks.push(data)).on('end', () => {
        fs.writeFile('book.png', Buffer.concat(chunks), err => {
            if(err) console.error(err)

            console.log('file saved!')
        })
    })
})

https.get(fileUrl, res => { // callback automatically close the readable stream
    const fileStream = fs.createWriteStream('book1.png')
    res.on('data', data => fileStream.write(data))
       .on('end', () => {
           fileStream.end() // close writable stream
           console.log('file saved!')
       })
})

// connect readable streams to writable streams via pipe()

https.get(fileUrl, res => {
    res.pipe(fs.createWriteStream('book2.png'))
        .on('finish', () => console.log('file saved!'))
})

// transform streams
// behaves as both a readable stream and a writable stream

fs.createReadStream('11-streams-download-book-cover-batch.js')
    .pipe(shout())
    .pipe(fs.createWriteStream('loud-code.txt'))

function shout() {
    return new Transform({
        transform(chunk, encoding, callback) {
            callback(null, chunk.toString().toUpperCase())
        }
    })
}