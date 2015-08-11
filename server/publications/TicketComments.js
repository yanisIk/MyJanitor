Meteor.publish('ticketComments', function(ticketId){
	check(ticketId, String);
	if(!this.userId){
		throw new Meteor.Error(403, "You must login first");
	}
	if(!Roles.userIsInRole(this.userId, ['renter', 'admin'])){
		throw new Meteor.Error(403, "You should be an admin or owner of the ticket");
	}
	var ticket = Tickets.findOne(ticketId);
	if(!ticket){
		throw new Meteor.Error(500, "Ticket doesn't exist")
	}
	if(Roles.userIsInRole(this.userId, ['renter'])){
		if(ticket.userId !== this.userId){
			throw new Meteor.Error(403, "your are not the author of this ticket");
		}	
	}
	return TicketComments.find({ticketId: ticketId});
});
