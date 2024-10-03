const socket = io()
const form = document.getElementById('formulario')
const logi = document.getElementById('login')
const cvs = document.getElementById('conversa')

const logArea = document.querySelector('.Login')
const chatArea = document.querySelector('.chat')

var username = '';

logi.addEventListener('submit',(e)=>{
    e.preventDefault();
    logArea.style.display = 'none'
    chatArea.style.display = 'block'
    username = document.getElementById('name').value
    socket.emit('command', username)
})

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    cvs.scrollTop = cvs.scrollHeight;
    var inpt = document.getElementById('input').value
    if(inpt.trim() !== ""){
        document.getElementById('input').value = '';
        socket.emit('chat message', `${username}: ${inpt}`)
    } else{
        alert('mensagem vazia');
    }
    
})
socket.on('chat message', (msg) => {
    var item = document.createElement('li')
    item.textContent = msg
    cvs.appendChild(item)
})