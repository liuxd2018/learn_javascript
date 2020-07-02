
import { list, get } from "./users.js";

export async function listUsers(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    console.log(req.query)
    const {offset = 0, limit = 25} = req.query
    try {        
        res.json(await list({
            offset: Number(offset),
            limit: Number(limit),
        }))
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

export async function getUser(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    const {id} = req.params

    try {
        const user = await get(Number(id))
        if(!user) return next()
        res.json(user)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}