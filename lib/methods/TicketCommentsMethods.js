Meteor.methods({

	'TicketComments.addComment': function(ticketId, commentBody){
		check(ticketId, String);
		check(commentBody, String);
		if(!this.userId){
			throw new Meteor.Error(403, "You can't add a comment on a ticket without being logged in as a renter or admin");
		}
		if(!Roles.userIsInRole(this.userId, ['renter', 'admin'])){
  			throw new Meteor.Error(403, "You should be an admin or renter to add a comment on a ticket");
  		}
  		if(!Tickets.find(ticketId).count()){
  			throw new Meteor.Error(500, "Cannot comment: Ticket doesn't exist");
  		}
  		if(Roles.userIsInRole(this.userId, ['renter'])){
  			if(ticket.userId !== this.userId){
  				throw new Meteor.Error(403, "Cannot comment: your are not the author of this ticket");
  			}	
  		}
  		var loggedInUser = Meteor.user();
  		var ticketComment = {
  			ticketId: ticketId,
  			userId: this.userId,
  			author: getUserDisplayName(loggedInUser),
  			body: commentBody.trim(),
  		}
  		TicketComments.insert(ticketComment);
  		//Notify admin, ticket author if not him and people with associated role for comment.
  		this.unblock();
	},
	'TicketComments.deleteComment': function(commentId){

	},
	'TicketComments.editComment': function(commentId, modifier){

	}

});