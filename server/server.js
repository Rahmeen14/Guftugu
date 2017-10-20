var express = require('express');
const path= require('path');
const http= require('http');
const socketIO=require('socket.io');
const public_path= path.join(__dirname, "../public");
const {generateMessage} = require("./utils/message");

var app= express(); 
//^^^this is our http server

var server= http.createServer(app);

var io = socketIO(server); 
//^^^ This is our web sockets server
const port= process.env.PORT || 3000;
app.use(express.static(public_path));

io.on('connection', function(socket){
	console.log("New User enters tadaaaa");
	socket.emit("newMessage", generateMessage("admin", "Welcome to chat_app"));	
	socket.broadcast.emit("newMessage",generateMessage("admin", "New user joined chat_app"));
	socket.on("createMessage", function(mail,callback){
		console.log("Created Message", mail);
		socket.broadcast.emit("newMessage", generateMessage(mail.from, mail.text));
		callback({text: "Yay sent", status: "fair enough"});
	});

socket.on('currentLocation', function(location){
	var text= location.latitude + "," + location.longitude;
    io.emit('findMap', {from: "admin", text: text});
  });
socket.on('disconnect', function(){
			console.log("Client Disconnected");
			});
	
});


server.listen(port, function(){
	console.log("server on duty, mallady");
});