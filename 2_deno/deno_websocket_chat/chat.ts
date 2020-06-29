import { WebSocket, isWebSocketCloseEvent } from "https://deno.land/std@v0.56.0/ws/mod.ts";
import { v4 } from "https://deno.land/std@v0.56.0/uuid/mod.ts";

interface User {
    userId: string;
    userName: string;
    groupName: string;
    ws: WebSocket;
}

interface Messsge {
    userId: string;
    userName: string;
    messageText: string;
}

// userId => user
const usersMap = new Map<string, User>();
// groupName => [user1, user2]
const groupsMap = new Map<string, User[]>();
// groupName => [message1, message2]
const messagesMap = new Map<string, Messsge[]>();



// when user is connected
export async function chat(ws: WebSocket) {

    console.log(`Connected`);

    // generate unique userId
    const userId = v4.generate();


    // listening websocket events
    for await (const data of ws) {

        const event = typeof data == 'string' ? JSON.parse(data) : data;

        // if event is close event
        if(isWebSocketCloseEvent(data)) {
            // take user out of usersMap
            leaveGroup(userId, ws)
            break;
        }

        let userObj;

        switch (event.event) {

            case 'join':
                 userObj = {
                    userId,
                    userName: event.name,
                    groupName: event.group,
                    ws
                };
                // set usersMap
                usersMap.set(userId, userObj);
                // multi map pattern
                // set groupsMap
                const users = groupsMap.get(event.group) || [];
                users.push(userObj);
                groupsMap.set(event.group, users);
                // emit to this user all the user inside this group
                emitUserList(event.group, ws);
                // emit to this user all the previous messages
                emitPreviousMessages(event.group, ws)
                break;
            case 'message':
                userObj = usersMap.get(userId);
                const message = {
                    userId,
                    userName: userObj!.userName,
                    messageText: event.data
                }
                const messages = messagesMap.get(userObj!.groupName) || []
                messages.push(message)
                messagesMap.set(userObj!.groupName, messages)
                emitMessage(userObj!.groupName, message, userId)
                break;
            default:
                break;
        }

    }
}
function leaveGroup(userId: string, ws: WebSocket) {
    const userObj = usersMap.get(userId);
    if(!userObj) {
        return;
    }
    let users = groupsMap.get(userObj.groupName) || [];
    users = users.filter(u => u.userId !== userId);
    groupsMap.set(userObj.groupName, users);

    usersMap.delete(userId)

    emitUserList(userObj.groupName, ws)

}


function emitUserList(groupName: string, ws: WebSocket) {

    function getDisplayUsers(groupName: string) {
        const users = groupsMap.get(groupName) || [];
        return users.map(u => {
            return {userId: u.userId, userName: u.userName}
        })
    }

    const users = groupsMap.get(groupName) || [];

    for(const user of users) {
        const event = {
            event: 'users',
            data: getDisplayUsers(groupName)
        }
        user.ws.send(JSON.stringify(event))
    }
}



function emitMessage(groupName: string, message: Messsge, senderId: string) {
    const users = groupsMap.get(groupName) || [];

    for(const user of users) {
        const tempMessage = {
            ...message,
            sender: user.userId === senderId ? "me" : senderId,
        }
        const event = {
            event: 'message',
            data: tempMessage
        }
        user.ws.send(JSON.stringify(event))
    }
}

function emitPreviousMessages(groupName: string, ws: WebSocket) {
    const messages = messagesMap.get(groupName) || [];
  
    const event = {
      event: "previousMessages",
      data: messages,
    };
    ws.send(JSON.stringify(event));
}