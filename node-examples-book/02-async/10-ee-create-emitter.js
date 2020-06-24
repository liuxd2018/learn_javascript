import { EventEmitter } from "events";
import { get } from "http";

function createEventSource(url) {
    const source = new EventEmitter()
    get(url, res => {
        res.on('data', data => {
            const message = data.toString().replace(/^data: /, '').replace(/\n\n$/, '')

            source.emit('message', message)

            // there is no limit to the number or types of events that we can emit

            const eventType = message.match(/\?$/) ? 'question' : 'statement'

            source.emit(eventType, message)
        })
    })

    return source;
}

const source = createEventSource('http://localhost:1337/sse')

source.on('message', console.log)

source.on('question', q => console.log(`Someone asked, ${q}`))