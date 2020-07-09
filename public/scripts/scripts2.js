$(document).ready(function(){
	console.log("scripts are being read")

	var extImg, lclImg, imgFile, name;
	console.log("this as well"+extImg)


	$('#modal1').openModal({
		dismissible: false,
		ready: function(){
			// name = $('input[type=text]').val();
			
			// extImg = $('input[type=url]').val();
								
			// // Accessing, if provided, local file objects representing the image files selected by the user : https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications
			// imgFile = $('input[type=file]')[0].files[0];
			// debugger
			// // creating url for local images
			// if(imgFile){
			// 	reader = new FileReader();
			// 	reader.onloadend = function () {
			// 		// Necessary for function to follow though not clear why
			// 		lclImg = reader.result;
			// 	};
			// 	// Not entirely sure how this function works in conjuction with the previous assignment :S
			// 	lclImg = reader.readAsDataURL(imgFile);
			// };

			$('#agree').on('click', function(e){
				name = $('input[type=text]').val();

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

					var socket = io();
					$('form').submit(function(){
						socket.emit('chat message', $('#chat').val());
						$('#chat').val('');
						return false
					});

					socket.on('chat message', function(msg){
						sessionStorage.setItem("id", socket.id);
						if (lclImg) {
							$('#messages').append($('<li>').append($('<img>').attr({'src': lclImg, "id": socket.id})).append(name).css("color", "red"));
							// $('#messages').append($('<li>').append($('<img>').attr('src', lclImg)).append(name).css("color", "red"));
						} else if (extImg) {
							$('#messages').append($('<li>').append($('<img>').attr('src', extImg)).append(name).css("color", "red"));
						} else {
							$('#messages').append($('<li>').append($('<img>').attr('src', 'http://i.kinja-img.com/gawker-media/image/upload/s--Z8-FvAOx--/18eyurj9shxzkjpg.jpg')).append(name).css("color", "red"));
						}
						$('#messages').append($('<li>').text(msg));
						$('#mine').scrollTop($('#messages').height());
					});
					
					$('#modal1').closeModal();
				}
			});
		}
	});
});



