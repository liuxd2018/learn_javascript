// @ts-nocheck

let ws;
let chatUsers = document.querySelector('#chatUsers')
let chatUsersCount = document.querySelector('#chatUsersCount')
let sendMessageForm = document.querySelector('#messageSendForm')
let messageInput = document.querySelector('#messageInput')
let chatMessages = document.querySelector('#chatMessages')
let leaveGroupBtn = document.querySelector('#leaveGroupBtn')
let groupName = document.querySelector('#groupName')


window.addEventListener('DOMContentLoaded', () => {
    ws = new WebSocket(`ws://localhost:3000/ws`);
    ws.addEventListener('open', onConnectionOpen);
    ws.addEventListener('message', onMessageReceived);
})

sendMessageForm.onsubmit = (e) => {
    e.preventDefault();
    if(!messageInput.value) {
        return;
    }
    const event = {
        event: 'message',
        data: messageInput.value
    }
    ws.send(JSON.stringify(event))
    messageInput.value = '';
}

leaveGroupBtn.onclick = () => {
    window.location.href = 'chat.html';
}


function onConnectionOpen() {
    console.log(`Connection Open`);
    const queryParams = getQueryParams();
    if(!queryParams.name || !queryParams.group) {
        window.location.href = 'chat.html'
        return;
    }
    groupName.innerHTML = queryParams.group;
    const event = {
        event: 'join',
        group: queryParams.group,
        name: queryParams.name
    }
    ws.send(JSON.stringify(event))
}

function onMessageReceived(e) {
    console.log("Message received")
    const event = JSON.parse(e.data);
    console.log(event)
    switch (event.event) {
        case 'users':
            chatUsersCount.innerHTML = event.data.length;
            chatUsers.innerHTML = '';
            event.data.forEach(u => {
                const userEl = document.createElement('div')
                userEl.className= 'chat-user';
                userEl.innerHTML = u.userName;
                chatUsers.appendChild(userEl)
            });
            break;
        case 'message':
            const el = chatMessages;
            const scrollToBottom = Math.floor(el.offsetHeight + el.scrollTop) === el.scrollHeight
            appendMessage(event.data);
            if(scrollToBottom) {
                el.scrollTop = 10000000;
            }
            break;
        case 'previousMessages':
            event.data.forEach(appendMessage);
            break;
        default:
            break;
    }
}

function getQueryParams() {
    const param = {};
    const search = window.location.search.substring(1);
    const pairs = search.split('&')
    for (const pair of pairs) {
        const parts = pair.split('=')
        param[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
    }
    return param;
}

function appendMessage(message) {
    const messageEl = document.createElement('div');
    messageEl.className = `
        message message-${
            message.sender === 'me'? 'to': 'from'
        }
        `;
    messageEl.innerHTML = `
        ${message.sender === "me" ? "" : `<h4>${message.userName}</h4>`}
        <p class="message-text">${message.messageText}</p>
        `
    chatMessages.appendChild(messageEl);
}