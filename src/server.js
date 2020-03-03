const express = require('express');
const app = express();
const http = require('http');
const socketIO = require('socket.io');
const server = http.Server(app);
const io = socketIO(server);
//const port = process.env.PORT || 3000;
const port = process.env.PORT || 3003;
const routes = require('./routes')

require('./database');

io.on('connection', (socket) => {
    console.log('Socket-io conectado');

    socket.on('chamar-nome', (nome) => {
        console.log('nome: ', nome);
        io.emit('receber-nome', nome);

    })
    socket.emit('teste', { hello: 'world' });
});

var cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(routes);
app.set('socketio', io);

server.listen(port, () => {
    console.log(`Express server ouvindo na porta: " ${port}`);
});