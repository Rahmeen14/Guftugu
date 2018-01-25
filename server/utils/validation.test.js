var expect = require('expect');
var {isRealString} = require("./validation");

describe('isRealString', ()=>{
	
	it('should reject non-string values', ()=>{
		
		var value= isRealString(1263748);

		expect(value).toBe(false);

	});
	it('should reject empty strings', ()=>{
		
		var value= isRealString("                        ");

		expect(value).toBe(false);

	});
	it('should accept strings', ()=>{
		
		var value= isRealString("1263748");

		expect(value).toBe(true);

	});
});

