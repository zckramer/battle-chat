const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected: ', socket.id);

    socket.on('join_room', (data) => {
      socket.join(data);
      console.log('user ', socket.id, ' joined room: ', data);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//         io.emit('chat message', msg);
//     });
// })

// http.listen(3001, () => {
//   console.log('listening on *:3001');
// });

app.listen(3001, () => {
  console.log('listening on *:3001');
});