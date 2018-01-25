var socket = io();
function scrollToBottom(){
	var messages = $("#chats");
	var newMessage = messages.children("li:last-child");
	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMsgHeight = newMessage.innerHeight();
	var lastMsgHeight = newMessage.prev().innerHeight();

	if(clientHeight+scrollTop+newMsgHeight+lastMsgHeight >= scrollHeight)
		messages.scrollTop(scrollHeight);
}
		socket.on('connect', function(){
			console.log("connected to server");
			var paramz = $.deparam(window.location.search);
			console.log(paramz);
			socket.emit('join', paramz, function(err){
				if(err)
				{
					alert(err);
					window.location.href = "/chatTab.html" ;
				}
				else
				{
					console.log("Welcome to chatApp");
				}
			});

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
				scrollToBottom();
				});

		socket.on('disconnect', function(){
			console.log("Disconnected from server");
		});

		socket.on("updateUserList", function(users){
			console.log(users);

			var ol = $('<ol></ol>');
			users.forEach(function(user){
				ol.append($('<li></li>').text(user));
			});
			$('.users').html(ol);
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