$(document).ready(function(){
	
	console.log("scripts are being read")

	window.socket = io();
	
	window.extImg = ""
	window.lclImg = ""
	window.Id = ""
	window.member = {}
	// modal reload bug doesn't happen on url '/?#!'
	$('#modal1').openModal({
		dismissible: false,
		ready: function(){
			$('#agree').on('click', function(e){
				const name = $('input[type=text]').val();

				if (name.length == 0){
					
					e.preventDefault();
					$('#error').css({"display": "block", "color": "red", "font-family": "Source Code Pro"}).text("Please provide a username then continue");

				} else {
					// Catching, if passed, the external url value for user image
					extImg = $('input[type=url]').val();
								
					// Accessing, if provided, local file objects representing the image files selected by the user : https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications
					const imgFile = $('input[type=file]')[0].files[0];
					
					// creating url for local images
					if(imgFile){
						Id = socket.id
						reader = new FileReader();
						reader.onloadend = function () {
							// Necessary for function to follow though not clear why
							lclImg = reader.result;
						};
						// Not entirely sure how this function works in conjuction with the previous assignment :S
						lclImg = reader.readAsDataURL(imgFile);	
					};
					
					if (extImg) {
						member = {
							"name": name,
							"pic": extImg
						}					
					} else if (imgFile) {
						member = {
							"name": name,
							"pic": Id
						}
					} else {
						member = {
							"name": name,
							"pic": "no image"
						}
					}
					
					socket.emit('joining chat', member);

					$('#messages').append($('<li>').text(`You joined the chat`));
					

					$('#modal1').closeModal();
				}
			});		
		}		
	});
	
	function appendMessage(userMsg) {
		const name = userMsg[0]["name"];	
		const msg = userMsg[1];
		const pic = userMsg[0]["pic"]

		if (pic == extImg) {
			$('#messages').append($('<li>').append($('<img>').attr({'src': extImg, 'width': 50, 'height': 20})).append(name).css("color", "red"));
		} else if (pic == Id) {
			$('#messages').append($('<li>').append($('<img>').attr({'src': lclImg, 'id': Id, 'width': 50, 'height': 20})).append(name).css("color", "red"));
		} else {
			$('#messages').append($('<li>').append($('<img>').attr({'src': '/images/noPic.jpg', 'width': 50, 'height': 20})).append(name).css("color", "red"));
		}
		$('#messages').append($('<li>').text(msg));
		$('#mine').scrollTop($('#messages').height());
	}

			
	socket.on('connnected to chat', member => {
		$('#messages').append($('<li>').text(`${member["name"]} joined the chat`));
	});

	$("#send").click(function(){
		msg = $('#chat').val();
		socket.emit('sent chat message', msg);
		$('#chat').val('');
	});

	socket.on('send my chat message', userMsg => {
		appendMessage(userMsg);
	});

	socket.on('display my chat message', userMsg => {
		appendMessage(userMsg);
	});

	socket.on('user-disconnected', member => {
		$('#messages').append($('<li>').text(`${member["name"]} left the chat`));
	});

});



