Tickets = new Meteor.Collection("tickets");

//Schema Tickets {createdAt, userId, author, building, appartment, type, title, body, status:{solved, solvedAt}

TicketsValidationSchema = new SimpleSchema({
	
});

TicketCreateAutoformSchema = new SimpleSchema({
	title: {
		type: String,
		label: "Title",
		max: 100
	},
	type: {
		type: String,
		label: "Type of problem",
    	autoform: {
	      	options: function () {
        		return TicketTypes.find().map(function (t) {
			      return {label: t.name, value: t.name};
			    });
			}
		}
	},
	body: {
		type: String,
		label: "Message",
		max: 500
	}
});

