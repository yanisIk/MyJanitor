Template.ticket.helpers({
  canEdit: function() {
    ownsTicket(Meteor.userId(), this);
  }
});

Template.ticketInfo.helpers({
  date: function() {
    return this && this.createdAt
     && moment(this.createdAt).format('MMMM DDDD YYYY')
  },
  canEdit: function() {
    ownsTicket(Meteor.userId(), this);
  }
});
