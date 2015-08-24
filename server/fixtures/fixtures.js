Meteor.startup(function(){

	if(!Meteor.users.find().count()){
		var adminUser = {
			username: 'admin',
			email: 'myjanitoradmin@yopmail.com',
			password: 'admin',
		}
		var renter = {
			username: 'renter',
			email: 'myjanitorrenter@yopmail.com',
			password: 'renter',
		}
		var renter2 = {
			username: 'renter2',
			email: 'myjanitorrenter2@yopmail.com',
			password: 'renter2',
		}

		var adminId = Accounts.createUser(adminUser);
		Roles.addUsersToRoles(adminId, ['admin']);
		var renterId = Accounts.createUser(renter);
		Roles.addUsersToRoles(renterId, ['renter']);
		var renter2Id = Accounts.createUser(renter2);
		Roles.addUsersToRoles(renter2Id, ['renter']);
	}


});