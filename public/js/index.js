var socket = io();
		socket.on('connect', function(){
			console.log("connected to server");

			
			socket.on("newMessage", function(mail){
				console.log("Hey Beautiful, you've a New message", mail);
				});
		});
		socket.on('disconnect', function(){
			console.log("Disconnected from server");
		});