var express = require('express');
const path= require('path');
const http= require('http');
const socketIO=require('socket.io');
const public_path= path.join(__dirname, "../public");
const {generateMessage, generateLocationMessage} = require("./utils/message");
const {isRealString} = require("./utils/validation");
const {Users} = require("./utils/users");
var app= express(); 
//^^^this is our http server
var users = new Users();
var server= http.createServer(app);

var io = socketIO(server); 
//^^^ This is our web sockets server
const port= process.env.PORT || 3000;
app.use(express.static(public_path));

io.on('connection', function(socket){
	console.log("New User enters tadaaaa");
	
	socket.on('join', function(params, callback){
		if(!isRealString(params.name) || !isRealString(params.room))
		{
			//console.log("Lol why ?");
			return callback("You have made an error filling blank form details");

		}

		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);
		socket.emit('updateUserList', users.getUserList(params.room));
		socket.emit("newMessage", generateMessage("Admin", `Welcome to ${params.room} chat room`));	

		socket.broadcast.to(params.room).emit("newMessage",generateMessage("Admin", `${params.name} joined the room`));

	
		callback();
	});

	socket.on("createMessage", function(mail,callback){
		console.log("Created Message", mail);
		io.emit("newMessage", generateMessage(mail.from, mail.text));
		callback({text: "Yay sent", status: "fair enough"});
	});

	socket.on('currentLocation', function(location){
	var text= location.latitude + "," + location.longitude;
    io.emit('findMap', generateLocationMessage(location.from , text));
	});
	socket.on('disconnect', function(){
			var user = users.removeUser(socket.id);
			io.to(user.room).emit("updateUserList", users.getUserList(user.room));
			io.to(user.room).emit("newMessage", generateMessage('Admin', `${user.name} has left the room`));
			console.log("Client Disconnected");
			//socket.broadcast.emit("newMessage",generateMessage("admin", "A user left the chat"));
			});
	
	});


server.listen(port, function(){
	console.log("server on duty, mallady");
});