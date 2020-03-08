let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);
let fs = require('fs');
app.use(express.static('public'));


app.get('/', function (req, res) {
	fs.readFile('views/index.html', 'utf8', function (err, content) {
		res.send(content);
	});
});

const users = {}

io.on('connection', function (socket) {
	socket.on('joining chat', member => {
		users[socket.id] = member;
		console.log(users);
		socket.broadcast.emit('connnected to chat', member)
	})

	socket.on('sent chat message', function (msg) {
		const member = users[socket.id]
		console.log(member);
		socket.broadcast.emit('send my chat message', [member, msg])
		socket.emit('display my chat message', [member, msg])
		// io.emit('post chat message', [member, msg])
	});

	socket.on('disconnect', () => {
		socket.broadcast.emit('user-disconnected', users[socket.id]);
		delete users[socket.id];
		console.log(users);
	})
});

server.listen(process.env.PORT || 3000);
