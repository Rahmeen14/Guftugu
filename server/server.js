var express = require('express');
const path= require('path');
const public_path= path.join(__dirname, "../public");
var app= express();
const port= process.env.PORT || 3000;
app.use(express.static(public_path));

app.listen(port, function(){
	console.log("server on duty, mallady");
});