const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const path = require('path');

const app = express();
const server = http.createServer(app)
const io = socketIO(server)

var quantidade_de_mensagens = 0;

app.use(express.static(path.join(__dirname,'public')));

io.on('connection', (socket) => {

    console.log('alguem entrou no chat')

    socket.on('command', (msg)=>{
        console.log(`usuario: ${msg} entrou no chat`)
    })

    socket.on('chat message', (msg) => {
        quantidade_de_mensagens++
        console.log(`quantidade de mensagens: ${quantidade_de_mensagens}`)
        io.emit('chat message', msg)
    })
})


server.listen(5001,'0.0.0.0', () => {
    console.log('server ligado na url: http://localhost:5001')
});