var moment = require('moment');
var generateMessage = function(from, text){
	return {
		text: text,
		from: from,
		createdAt: moment().valueOf()
	};
}
var generateLocationMessage = function(from, text){
	console.log( 'http://www.google.com/maps?q='+text);
	return {
		from: from,
		url: 'http://www.google.com/maps?q='+text,
		createdAt: moment().valueOf()
	
	};
};
module.exports = {generateMessage, generateLocationMessage};