import {listenAndServe, ServerRequest } from 'https://deno.land/std@v0.56.0/http/server.ts'
import {acceptWebSocket, acceptable} from 'https://deno.land/std@v0.56.0/ws/mod.ts'
import {chat} from './chat.ts'

listenAndServe({port: 3000}, async (req: ServerRequest) => {
    if(req.method === 'GET' && req.url === '/ws') {
        if(acceptable(req)) {
            acceptWebSocket({
                conn: req.conn,
                bufReader: req.r,
                bufWriter: req.w,
                headers: req.headers
            }).then(chat)
        }
    }
})

console.log("Server started at port 3000")