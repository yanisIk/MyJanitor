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
      var ticket = Tickets.findOne(ticketId); 
    	if(!ticket){
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
      check(ticketId, String);
      if(!this.userId){
        throw new Meteor.Error(403, "You can't delete a comment on a ticket without being logged in as a renter or admin");
      }
      if(!Roles.userIsInRole(this.userId, ['renter', 'admin'])){
          throw new Meteor.Error(403, "You should be an admin or renter to delete a comment on a ticket");
      }
      var comment = TicketComments.findOne(commentId);
      if(!comment){
          throw new Meteor.Error(500, "Cannot delete comment: comment doesn't exist");
      }
      if(Roles.userIsInRole(this.userId, ['renter'])){
          if(comment.userId !== this.userId){
            throw new Meteor.Error(403, "Cannot delete comment: your are not the author of this comment");
          } 
      }
      TicketComments.remove(commentId);
      
	},
	'TicketComments.editComment': function(commentId, modifier){
      check(commentId, String);
      check(modifier, String);
      if(!this.userId){
        throw new Meteor.Error(403, "You can't edit a comment on a ticket without being logged in as a renter or admin");
      }
      if(!Roles.userIsInRole(this.userId, ['renter', 'admin'])){
          throw new Meteor.Error(403, "You should be an admin or renter to edit a comment on a ticket");
      }
      var comment = TicketComments.findOne(commentId); 
      if(!comment){
          throw new Meteor.Error(500, "Cannot edit comment: comment doesn't exist");
      }
      if(Roles.userIsInRole(this.userId, ['renter'])){
          if(comment.userId !== this.userId){
            throw new Meteor.Error(403, "Cannot edit comment: your are not the author of this ticket");
          } 
      }
      TicketComments.update({'_id': commentId}, {$set: {'content': modifier}});
	}

});