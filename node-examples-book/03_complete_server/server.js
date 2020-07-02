
import express from 'express'
import { listUsers, getUser } from "./apis.js";

const port = process.env.PORT ?? 1337

const app = express()
app.get('/users', (req, res, next) => {
    listUsers(req, res, next)
        .catch(err => {
            console.log(err)
        })
})
app.get('/users/:id', (req, res, next) => {
    getUser(req, res, next)
    .catch(err => {
        console.log(err)
    })
})
app.listen(port, () => console.log(`Server listening on port ${port}`))
