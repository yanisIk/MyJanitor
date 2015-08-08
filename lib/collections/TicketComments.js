TicketComments = new Meteor.Collection("ticketComments");

TicketCommentsValidationSchema = new SimpleSchema({
	
});

TicketCommentsAutoformSchema = new SimpleSchema({
	body: {
		type: String,
		label: "Message",
		max: 500
	}
});

//Schema = TicketComments {createdAt, userId, author, ticketId, body}