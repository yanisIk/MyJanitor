Template.ticketList.helpers({
  tickets: function() {
  	return Tickets.find();
  },

  date: function() {
    return this.projectDate
     && moment(this.projectDate).format('ll');
  },
})

Template._projectInfo.created({
  this.subscribe("tickets");
});