var socket = io();
		socket.on('connect', function(){
			console.log("connected to server");

		});

			socket.on("newMessage", function(mail){
				console.log("Hey Beautiful, you've a New message", mail);

				var template = $("#message-template").html();
				var formattedTime = moment(mail.createdAt).format("h:mm a");
				var html = Mustache.render(template, {
					text: mail.text,
					createdAt: formattedTime,
					from: mail.from
				});
				/*var li= $('<li></li>');
				li.text(`${mail.from}: ${mail.text}, ${formattedTime}`);*/

				$("#chats").append(html);
				});

		socket.on('disconnect', function(){
			console.log("Disconnected from server");
		});

	    socket.on('findMap', function(mail){
	    	/*a = $('<a></a>');
	    	a.attr('href', "https://google.com/maps?q="+location.text);
	    	a.text("Get Location");*/
	    	console.log(mail);
	    	var template = $("#location-message-template").html();
			var formattedTime = moment(mail.createdAt).format("h:mm a");
			var html = Mustache.render(template, {
				url: mail.url,
				createdAt: formattedTime,
				from: mail.from
			});
	    	$("#chats").append(html);
	    });
  
		

		$("#formu").on('submit', function(e){
			e.preventDefault();
			console.log(e);
		
  	socket.emit("createMessage", {
  		from: $("#from").val(), 
  		text: $("#text").val()
  	}, function(){
			
		});
 
		});

		var getLocation = $("#geoLoc");
    getLocation.on("click", function(){
      if(!navigator.geolocation){
        console.log("Unsupported on your Browser");

      }
      else
      {
      	getLocation.attr('disabled', 'disabled').text("Sending Location...");
        navigator.geolocation.getCurrentPosition(function(Position){
          console.log(location);
        getLocation.removeAttr('disabled').text("Send Location");
          socket.emit('currentLocation', {
          	from: $("#from").val(),
            latitude: Position.coords.latitude,
            longitude: Position.coords.longitude
          });
        }, function(){
          alert("Not permitted");
        });
      }
    });