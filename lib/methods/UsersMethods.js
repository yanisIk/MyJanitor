Meteor.methods({

	'Users.create': function(user){
		check(user, UserCreateAutoformSchema);
		if(!this.userId){
			throw new Meteor.Error(403, "Can't create User : you must login fist");
		}
		if(!Roles.userIsInRole(this.userId, ['admin'])){
			throw new Meteor.Error(403, "You should be an admin to create a user");
		}
		
		var newUser = {
			email: user.email,
			profile: {
				buildingAddress: user.buildingAddress,
				appartmentNumber: user.appartmentNumber,
				firtName: user.firtName,
				lastName: user.lastName,
				phoneNumber: user.phoneNumber
			}
		}
		var userId = Accounts.createUser(newUser);
		Roles.addUsersToRoles(userId, [user.role]);


		//Send email to user to set his password
		this.unblock();
		Accounts.sendEnrollmentEmail(userId);
	},
	'Users.createRenter': function(user){
		check(user, RenterOrJanitorCreateAutoformSchema);
		if(!this.userId){
			throw new Meteor.Error(403, "Can't create User : you must login fist");
		}
		if(!Roles.userIsInRole(this.userId, ['admin'])){
			throw new Meteor.Error(403, "You should be an admin to create a user");
		}
		
		var newUser = {
			email: user.email,
			profile: {
				buildingAddress: user.buildingAddress,
				appartmentNumber: user.appartmentNumber,
				firtName: user.firtName,
				lastName: user.lastName,
				phoneNumber: user.phoneNumber
			}
		}
		var userId = Accounts.createUser(newUser);
		Roles.addUsersToRoles(userId, ['renter']);


		//Send email to user to set his password
		this.unblock();
		Accounts.sendEnrollmentEmail(userId);
	},
	'Users.createJanitor': function(user){
		check(user, RenterOrJanitorCreateAutoformSchema);
		if(!this.userId){
			throw new Meteor.Error(403, "Can't create User : you must login fist");
		}
		if(!Roles.userIsInRole(this.userId, ['admin'])){
			throw new Meteor.Error(403, "You should be an admin to create a user");
		}
		
		var newUser = {
			email: user.email,
			profile: {
				buildingAddress: user.buildingAddress,
				appartmentNumber: user.appartmentNumber,
				firtName: user.firtName,
				lastName: user.lastName,
				phoneNumber: user.phoneNumber
			}
		}
		var userId = Accounts.createUser(newUser);
		Roles.addUsersToRoles(userId, ['janitor']);


		//Send email to user to set his password
		this.unblock();
		Accounts.sendEnrollmentEmail(userId);
	},
	'Users.delete': function(userId){
		check(ticketId, String);
		if(!this.userId){
			throw new Meteor.Error(403, "You can't delete a user without being logged in as an admin");
		}
		if(!Roles.userIsInRole(this.userId, ['admin'])){
			throw new Meteor.Error(403, "You should be an admin or renter to delete a user");
		}
		//Just deactived its account
		Meteor.users.update({_id: userId}, {$set: {password: null}});
		
	},
	'Users.edit': function(userId, modifier){

	}
});