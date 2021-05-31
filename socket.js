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

const trial = ""		// not sure why this variable was created. Slated for removal
const users = {}

io.on('connection', function (socket) {
	socket.on('joining chat', member => {
		users[socket.id] = member;
		socket.broadcast.emit('connnected to chat', member)
	})

	socket.on('sent chat message', function (msg) {
		const member = users[socket.id]
		socket.broadcast.emit('send my chat message', [member, msg])
		socket.emit('display my chat message', [member, msg])
	});

	socket.on('disconnect', () => {
		socket.broadcast.emit('user-disconnected', users[socket.id]);
		delete users[socket.id];
	})
});

server.listen(process.env.PORT || 3000);
