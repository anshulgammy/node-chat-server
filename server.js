const express = require('express');
const app = express();
const port = '9999';

app.use(express.static('public'));

// routing
app.get('/', (req, res) => {
	res.send('Chat server is running!');
});

// server creation.
var server = app.listen(port, () => {
	console.log("Listening on port: " + port);
});

// socket.io instantiation
var io = require('socket.io').listen(server);

// listen on every connection
// socket is synonymous to a new connection
io.on('connection', (socket) => {
	// when new user is connected.
	socket.on('new_user', (msg) => {
		console.log('New User Connected : ' + msg);
		io.emit('new_user', msg);
	});
	// when new message is received.
	socket.on('new_msg', (msg) => {
		socket.broadcast.emit('new_msg', {message: msg.message, username: msg.username});
	});
	// when user is typing something.
	socket.on('typing', (msg) => {
		socket.broadcast.emit('typing', {username: msg.username});
	});
});