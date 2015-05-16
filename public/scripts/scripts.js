$(document).ready(function(){
	console.log("scripts are being read")

	$('#modal1').openModal();

	$('a').on('click', function(){
		username = $('<p>').append($('input[type=text]').val()).css("color", "red")
		name = $('input[type=text]').val()

		var socket = io();
		$('form').submit(function(){
			socket.emit('chat message', $('#chat').val());
			$('#chat').val('');
			return false
		});
		socket.on('chat message', function(msg){
			$('#messages').append($('<li>').text(name+' '+msg));
			$('#mine').scrollTop($('#messages').height());
		});
	});
})