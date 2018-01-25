class Users
{
	constructor ()
	{
		this.users = [];
	}
	addUser(id, name, room)
	{
		var user = {id, name, room};
		this.users.push(user);
		return user;
	}
	getUserList(room)
	{
		var users = this.users.filter(function(user){return user.room === room});
		var userList = users.map(function(user){
			return user.name;
		});
		return userList;
	}
	removeUser(id)
	{
		var user = this.getUser(id);
		if(user)
		this.users = this.users.filter(function(user){
			return user.id !== id;
		});
		return user;

	}
	getUser(id)
	{
		var user = this.users.filter(function(user){
			return user.id === id;
		});
		return user[0];
	}
}

module.exports = {Users};