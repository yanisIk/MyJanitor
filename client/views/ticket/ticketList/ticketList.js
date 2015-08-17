Template.ticketList.helpers({
  tickets: function() {
  	return Tickets.find({});
  },
})

Template.ticketList.created(function(){
  this.subscribe("tickets");
});