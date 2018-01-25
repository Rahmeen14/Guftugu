var expect = require('expect');
var {Users} = require("./users");

describe('Users', ()=>{
	var users;
	beforeEach(()=>{
		users = new Users();
		users.users = [{
			id: '1',
			name: 'rahmeen',
			room: 'mushroom'
		},
		{
			id: '2',
			name: 'namreen',
			room: 'broom'
		},
		{
			id: '3',
			name: 'arusha',
			room: 'mushroom'
		}];
	});
	it('should show a list of mushrooms', ()=>{
		var value = users.getUserList('mushroom');
		expect(value).toEqual(['rahmeen', 'arusha']);
	})

	it('should add new user', ()=>{
		
		var users= new Users();
		var user = {
			id: 12334,
			name: "Sarina",
			room: "broom"
		};
		var value = users.addUser(user.id, user.name, user.room);
		expect(users.users).toEqual([user]);

	});
	it('should return arusha', function(){
		var value = users.getUser('3');
		expect(value.name).toBe("arusha");
	});
	it('should return 2', function(){
		var value = users.removeUser('1');
		expect(users.users.length).toBe(2);
	});
	
});

