$(document).ready(function(){
	console.log("scripts are being read")
	var socket = io();
	$('form').submit(function(){
		socket.emit('chat message', $('#chat').val());
		$('#chat').val('');
		return false
	});
	socket.on('chat message', function(msg){
		$('#messages').append($('<li>').text(msg));
	});
})