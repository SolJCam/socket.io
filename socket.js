var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
app.use(express.static('public'));


app.get('/', function (req, res) {
	fs.readFile('views/index.html', 'utf8', function (err, content) {
		res.send(content);
	});
});

io.on('connection', function(socket){
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
		console.log('message: '+ msg);

	})
});

http.listen(process.env.PORT || 3000);
