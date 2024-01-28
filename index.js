const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server, {
	cors: {
		origin: 'http://localhost:4200',
	},
});
const cors = require('cors');

app.use(cors());
app.use(express.json());

server.listen('3002', () => {
	console.log('Server Running on Port 3002...');
	console.log(__dirname);
});

app.get('/', (req, res) => {
	res.sendFile(
		'C:/Users/zckra/Documents/Projects/ng-battle-chat/src/index.html',
	);
});

io.on('connection', socket => {
	console.log('User Joined Room: ' + socket.id);

	socket.on('new-message', (message) => {
		console.log('inside new-message...');
		console.log(message);
		io.emit('new-message', message);
	});

	socket.on('welcome', arg => {
		console.log('hellooooooooo' + arg);
	});

	socket.on('disconnect', () => {
		console.log('USER DISCONNECTED');
	});
});
