new EventSource('/sse').onmessage = function (event) {
    document.querySelector('#messages').innerHTML += `<p>${event.data}</p>`
}

document.querySelector('#form').addEventListener('submit', function(evt) {
    evt.preventDefault()

    const input = document.querySelector('#input')
    fetch(`/chat?message=${input.value}`)
    input.value = ''

})