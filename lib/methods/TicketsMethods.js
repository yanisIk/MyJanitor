Meteor.methods({

	'Tickets.create': function(ticket){
		check(ticket, TicketsCreateAutoformSchema);
		if(!this.userId){
			throw new Meteor.Error(403, "You can't create a ticket without being logged in as a renter");
		}
		if(!Roles.userIsInRole(this.userId, ['renter'])){
  			throw new Meteor.Error(403, "You should be a renter to create a ticket");
  		}
  		var loggedInUser = Meteor.users.findOne(this.userId);
  		var additionalFields = {
  			createdAt = new Date(),
	  		userId = this.userId,
	  		author = loggedInUser.profile.firstName+" "+loggedInUser.profile.lastName,
	  		buildingAddress = loggedInUser.buildingAddress,
	  		appartmentNumber = loggedInUser.appartmentNumber,
	  		status: {
	  			solved: false,
	  			solvedAt: null
	  		}
  		}
  		ticket = _.extend(ticket, additionalFields);
  		Tickets.insert(ticket);
	},
	'Tickets.delete': function(ticketId){
		check(ticketId, String);
		if(!this.userId){
			throw new Meteor.Error(403, "You can't delete a ticket without being logged in as a renter or admin");
		}
		if(!Roles.userIsInRole(this.userId, ['renter', 'admin'])){
  			throw new Meteor.Error(403, "You should be an admin or renter to delete a ticket");
  		}
  		var ticket = Tickets.findOne(ticketId);
  		if(!ticket){
  			throw new Meteor.Error(500, "Cannot delete: Ticket doesn't exist")
  		}
  		if(Roles.userIsInRole(this.userId, ['renter'])){
  			if(ticket.userId !== this.userId){
  				throw new Meteor.Error(403, "Cannot delete: your are not the author of this ticket");
  			}	
  		}
		
		deleteTicketAndComments(ticketId);
		
	},
	'Tickets.edit': function(ticketId, modifier){

	},
	'Tickets.markAsSolved': function(ticketId){
		check(ticketId, String);
		if(!this.userId){
			throw new Meteor.Error(403, "You can't mark a ticket as solved without being logged in as a renter or admin");
		}
		if(!Roles.userIsInRole(this.userId, ['renter', 'admin'])){
  			throw new Meteor.Error(403, "You should be an admin or renter to mark a ticket as solved");
  		}
		var ticket = Tickets.findOne(ticketId);
  		if(!ticket){
  			throw new Meteor.Error(500, "Cannot delete: Ticket doesn't exist")
  		}
  		if(Roles.userIsInRole(this.userId, ['renter'])){
  			if(ticket.userId !== this.userId){
  				throw new Meteor.Error(403, "Cannot mark as solved: your are not the author of this ticket");
  			}	
  		}
  		Tickets.update({_id: ticketId}, {$set: {solved: true, solvedAt: new Date()}});

	},
	'Tickets.addComment': function(ticketId, comment){

	},
	'Tickets.deleteComment': function(commentId){

	},
	'Ticket.editComment': function(commentId, modifier){

	}

});