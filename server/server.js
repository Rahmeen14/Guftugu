var express = require('express');
const path= require('path');
const http= require('http');
const socketIO=require('socket.io');
const public_path= path.join(__dirname, "../public");


var app= express(); 
//^^^this is our http server

var server= http.createServer(app);

var io = socketIO(server); 
//^^^ This is our web sockets server
const port= process.env.PORT || 3000;
app.use(express.static(public_path));

io.on('connection', function(socket){
	console.log("New User");

	socket.emit("newMessage", {
		text: "Yayy",
		from: "Nemoz@gmail.com"
	});
	socket.on("createMessage", function(mail){
		console.log("Created Message", mail);
	});

	socket.on('disconnect', function(){
			console.log("Client Disconnected");
			});
});


server.listen(port, function(){
	console.log("server on duty, mallady");
});