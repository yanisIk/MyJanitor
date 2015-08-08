TicketTypes = new Meteor.Collection("ticketTypes");
TicketTypes._ensureIndex({"name":1},  {unique:true});

//Schema : ticketType = {name: String}

TicketTypeCreateAutoformSchema = new SimpleSchema({
	name: {
		type: String,
		min: 3,
		max: 50
	}
});

