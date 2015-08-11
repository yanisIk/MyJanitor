Meteor.publish('buildings', function(){
	if(!this.userId){
		throw new Meteor.Error(403, "you must login fist");
	}
	if(Roles.userIsInRole(this.userId, ['admin'])){
		throw new Meteor.Error(403, 'You must be an admin to see all buildings');
	}
	return Buildings.find({});
});