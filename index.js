const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const socket = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);
const cors = require('cors');
const BACKEND_ENDPOINT = 'localhost:8080/api/messages'

app.use(cors());
app.use(express.json());

server.listen('8081', () => {
	console.log('Server Running on Port 8081...');
});

app.get('/', (req, res) => {
	res.sendFile(join(__dirname, 'index.html'));
  console.log(__dirname)
});

io.on('connection', socket => {
	console.log(socket.id);

	console.log('User Joined Room: ' + socket.id);

	axios.get(BACKEND_ENDPOINT).then(response => {
		console.log(response);
	});

	socket.on('chat message', msg => {
		console.log('message: ', msg);
		io.emit('chat message', msg);
	});

	socket.on('disconnect', () => {
		console.log('USER DISCONNECTED');
	});
});
