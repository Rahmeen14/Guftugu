var socket = io();
		socket.on('connect', function(){
			console.log("connected to server");

			
			

		socket.on('disconnect', function(){
			console.log("Disconnected from server");
		});
			socket.on("newMessage", function(mail){
				console.log("Hey Beautiful, you've a New message", mail);
				li= $('<li></li>');
				li.text(`${mail.from}: ${mail.text}`);
				$("#chats").append(li);
				});
		});

	
  
		

		$("#formu").on('submit', function(e){
			e.preventDefault();

  	socket.emit("createMessage", {
  		from: $("#from").val(), 
  		text: $("#text").val()
  	}, function(obj){
			console.log("Received from server: ", obj);
		});
 
		});