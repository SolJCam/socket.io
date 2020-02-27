$(document).ready(function(){
	console.log("scripts are being read")

	// Using user ip addresses as ids 
	ip = ''
	fetch('https://freegeoip.app/json/')
		.then((response)=>{
			return response.json();
		})
		.then((myJson)=>{
			ip = myJson.ip;
			return myJson.ip;
		})

	$('#modal1').openModal({
		dismissible: false,
		ready: function(){
			$('#agree').on('click', function(e){
				name_val = $('input[type=text]').val();
				name = name_val+'('+ip+')'

				debugger
				let imgLen;
				let imgEle;
				let ok;

				if (name.length == 0){
					
					e.preventDefault();
					$('#error').css({"display": "block", "color": "red", "font-family": "Source Code Pro"}).text("Please provide a username then continue");

				} else {
				// Catching the url value for user image
					img1 = $('input[type=url]').val();
				
				
				// Accessing file objects representing the image files selected by the user : https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications
					imgLen = $('input[type=file]')[0].files.length;
					imgEle = $("<img></img>");

				// Instance of FileReader object that asynchronously reads contents of files stored on the user's computer : https://developer.mozilla.org/en-US/docs/Web/API/FileReader
					reader = new FileReader();

				// onloadend Event handler that returns file data in the form of a URL
					reader.onloadend = function () {
						imgEle.src = reader.result;
						ok = imgEle.src
					};

					if(imgLen > 0){
						img = $('input[type=file]')[0].files[0]
						imgId = img.size
						// Not entirely sure how this function works :S
						ok = reader.readAsDataURL(img);
					} else {
						// imgEle.src = ""
						imgId = 'user_'+imgEle
					}

					var socket = io();
					$('form').submit(function(){
						socket.emit('chat message', $('#chat').val());
						$('#chat').val('');
						return false
					});
					debugger

					socket.on('chat message', function(msg){
						if (typeof(imgId) === "number") {
							$('#messages').append($('<li>').append($('<img>').attr('src', ok)).append(name).css("color", "red"));
						} else if (img1.length > 0) {
							$('#messages').append($('<li>').append($('<img>').attr('src', img1)).append(name).css("color", "red"));
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



