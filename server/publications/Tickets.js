Meteor.publish('tickets', function(){
	if(!this.userId){
		throw new Meteor.Error(403, "you must login fist");
	}
	if(Roles.userIsInRole(this.userId, ['admin'])){
		return Tickets.find({});
	}
	if(Roles.userIsInRole(this.userId, ['renter'])){
		return Tickets.find({userId: this.userId});
	}
	if(Roles.userIsInRole(this.userId, ['plumber'])){
		var relatedType; //get related ticket types to a plumber
		return Tickets.find({type: relatedType});
	}
});

Meteor.publish('ticketTypes', function(){
	if(!this.userId){
		throw new Meteor.Error(403, "you must login fist");
	}
	return TicketTypes.find({});
});