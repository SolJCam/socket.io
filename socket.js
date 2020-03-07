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


// io.on('connection', function(socket){
// 	socket.on('sending chat message', function(msg){
// 		io.emit('chat message', msg);
// 		console.log('message: '+ msg);

// 	})
// });

const users = {}

io.on('connection', function (socket) {
	// socket.emit('server message', msg);
	socket.on('joining chat', member => {
		users[socket.id] = member;
		console.log(users);
		socket.broadcast.emit('connnected to chat', member)
	})

	socket.on('sending chat message', function (msg) {
		const member = users[socket.id]
		console.log(member);
		io.emit('chat message', [member, msg])
	});
});


server.listen(process.env.PORT || 3000);
