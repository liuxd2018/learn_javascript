import { readFile, readdir } from "fs/promises";
import { join } from "path";

async function readFileLength(filePath) {
    try {
        const data = await readFile(filePath)
        return [filePath, data.length]
    } catch (error) {
        if(error.code === 'EISDIR') return [filePath, 0]
        throw error
    }
}

async function getFileLengths(dir) {
    const fileList = await readdir(dir)
    const fileLengths = fileList.map(file => readFileLength(join(dir, file))) // await readFileLength(join(dir, file))
    return Promise.all(fileLengths) // you don't need to await it // await Promise.all(fileLengths)
}




const targetDirectory = process.argv[2] || './'

async function main() {
    try {
        const results = await getFileLengths(targetDirectory)
        results.forEach(([file, length]) => {
            console.log(`${file}: ${length}`)
        })
        console.log('done!')
    } catch (error) {
        console.error(error)
    }

    console.log(await getValue());
    console.log(await getValue2());
    
}

main()

// a function return a promise === an async function return normal value

function getValue() {
    return Promise.resolve(42)
}

function getValue2() {
    return 42
}


