var expect = require('expect');
var {generateMessage} = require("./message");

describe('generateMessage', ()=>{
	it('should generate a Message object', ()=>{

		var from="Sarina";
		var text="Nice message";
		var message= generateMessage(from,text);

		expect(message).toInclude({from, text});

	});
});