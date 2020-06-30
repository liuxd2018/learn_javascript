import {readFile} from 'fs/promises'
import {join, dirname } from 'path'
import {fileURLToPath} from 'url'
import express from 'express'

const port = process.env.PORT ?? 1337

const app = express()
app.get('/products', (req, res) => {
    listProducts(req, res)
        .catch(err => {
            console.log(err)
        })
})
app.listen(port, () => console.log(`Server listening on port ${port}`))

async function listProducts(req, res) {
    const productsFile = join(dirname(fileURLToPath(import.meta.url)), 'products.json')
    try {
        const data = await readFile(productsFile)
        res.status(200).json(JSON.parse(data))
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}