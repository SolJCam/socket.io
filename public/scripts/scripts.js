$(document).ready(function(){
	
	console.log("scripts are being read")

	const socket = io();

	var extImg;
	var lclImg = ""
	var imgFile;
	let member = {}
	
	$('#modal1').openModal({
		dismissible: false,
		ready: function(){
			$('#agree').on('click', function(e){
				const name = $('input[type=text]').val();
				// name = name_val+'('+ip+')'

				if (name.length == 0){
					
					e.preventDefault();
					$('#error').css({"display": "block", "color": "red", "font-family": "Source Code Pro"}).text("Please provide a username then continue");

				} else {
					// Catching, if passed, the external url value for user image
					extImg = $('input[type=url]').val();
								
					// Accessing, if provided, local file objects representing the image files selected by the user : https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications
					imgFile = $('input[type=file]')[0].files[0];

					// creating url for local images
					if(imgFile){
						reader = new FileReader();
						reader.onloadend = function () {
							// Necessary for function to follow though not clear why
							lclImg = reader.result;
						};
						// Not entirely sure how this function works in conjuction with the previous assignment :S
						lclImg = reader.readAsDataURL(imgFile);	
					};
					
					// if (lclImg) {
					// 	member = {
					// 		"name": name,
					// 		"pic": "",
					// 		"pic_id": socket.id)
					// 	}
					// } else if (extImg) {
					// 	member = {
					// 		"name": name,
					// 		"pic": extImg
					// 	}					
					// } else {
					// 	member = {
					// 		"name": name,
					// 		"pic": ""
					// 	}
					// }

					// socket.emit('joining chat', member);

					$('#messages').append($('<li>').text(`You joined the chat`));

					$('#modal1').closeModal();
				}
			});		
		}		
	});
	
	if (lclImg) {
		member = {
			"name": name,
			"pic": "",
			"pic_id": socket.id
		}
	} else if (extImg) {
		member = {
			"name": name,
			"pic": extImg
		}					
	} else {
		member = {
			"name": name,
			"pic": ""
		}
	}

	socket.emit('joining chat', member);
	
	function appendMessage(userMsg) {
		const pic = userMsg[0]["pic"]
		const name = userMsg[0]["name"]	
		const msg = userMsg[1]	
		if (pic.length > 0) {
			$('#messages').append($('<li>').append($('<img>').attr('src', pic)).append(name).css("color", "red"));
		} else {
			$('#messages').append($('<li>').append($('<img>').attr('src', 'imgs/noPic.jpg')).append(name).css("color", "red"));
		}
		$('#messages').append($('<li>').text(msg));
		$('#mine').scrollTop($('#messages').height());
	}

			
	socket.on('connnected to chat', member => {
		$('#messages').append($('<li>').text(`${member["name"]} joined the chat`));
	});


	$("#send").click(function(){
		msg = $('#chat').val();
		socket.emit('sending chat message', msg);
	});

	
	socket.on('chat message', userMsg => {
		appendMessage(userMsg);
	});


});



