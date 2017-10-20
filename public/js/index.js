var socket = io();
		socket.on('connect', function(){
			console.log("connected to server");

		});

			socket.on("newMessage", function(mail){
				console.log("Hey Beautiful, you've a New message", mail);
				li= $('<li></li>');
				li.text(`${mail.from}: ${mail.text}`);
				$("#chats").append(li);
				});

		socket.on('disconnect', function(){
			console.log("Disconnected from server");
		});

	    socket.on('findMap', function(location){
	    	a = $('<a></a>');
	    	a.attr('href', "https://google.com/maps?q="+location.text);
	    	a.text("Get Location");
	    	$("#chats").append(a);
	    });
  
		

		$("#formu").on('submit', function(e){
			e.preventDefault();

  	socket.emit("createMessage", {
  		from: $("#from").val(), 
  		text: $("#text").val()
  	}, function(obj){
			console.log("Received from server: ", obj);
			$("#text").val('');
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
            latitude: Position.coords.latitude,
            longitude: Position.coords.longitude
          });
        }, function(){
          alert("Not permitted");
        });
      }
    });