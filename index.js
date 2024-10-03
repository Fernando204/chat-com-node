const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const path = require('path');

const app = express();
const server = http.createServer(app)
const io = socketIO(server)

var quantidade_de_mensagens = 0;

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

const port = process.env.PORT || 5001
server.listen(port,'0.0.0.0', () => {
    console.log('server ligado na url: http://localhost:5001')
});