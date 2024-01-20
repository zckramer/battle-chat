const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const socket = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);
const cors = require('cors');

app.use(cors());
app.use(express.json());

server.listen('3002', () => {
	console.log('Server Running on Port 3002...');
});

app.get('/', (req, res) => {
	res.sendFile(join(__dirname, 'index.html'));
  console.log(__dirname)
});

io.on('connection', socket => {
	console.log(socket.id);

	console.log('User Joined Room: ' + socket.id);

	socket.on('chat message', msg => {
		console.log('message: ', msg);
		io.emit('chat message', msg);
	});

	socket.on('disconnect', () => {
		console.log('USER DISCONNECTED');
	});
});
