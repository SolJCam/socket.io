$(document).ready(function(){
	console.log("scripts are being read")

  $.getJSON('//freegeoip.net/json/?callback=?', function(data){
    console.log(data.ip)
    ip = data.ip
  // debugger
  })

	$('#modal1').openModal({
		dismissible: false,
		ready: function(){
			    $('#agree').on('click', function(e){
						name = $('input[type=text]').val()

						if (name.length == 0){
				      		e.preventDefault();
				      		$('#test').append('<p style="color: red; font-family: Source Code Pro">Please provide a username then continue');
				    	} else {
							img1 = $('input[type=url]').val();
					// Accessing file objects representing the files selected by the user : https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications
							img = $('input[type=file]')[0].files[0]
              imgId = img.size + ip
							imgEle = $('<img>');
							ok = ""

            // debugger
					// Instance of FileReader object that asynchronously reads contents of files stored on the user's computer : https://developer.mozilla.org/en-US/docs/Web/API/FileReader
							reader = new FileReader();

					// onloadend Event handler that returns file data in the form of a URL
							reader.onloadend = function () {
								imgEle.src = reader.result;
								ok = imgEle.src
							}
						// Not entirely sure what's happening here :S
							if (img){
								ok = reader.readAsDataURL(img);
							} else {
								imgEle.src = ""
							}

							var socket = io();
							$('form').submit(function(){
								socket.emit('chat message', $('#chat').val());
								$('#chat').val('');
								return false
							});
							socket.on('chat message', function(msg){
								if (img.size + ip == imgId) {
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



