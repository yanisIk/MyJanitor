DashboardController = AppController.extend({
  waitOn: function() {
    
  },
  data: {
    
  },
  onAfterAction: function () {
    Meta.setTitle('Dashboard');
  }
});

DashboardController.events({
  'click [data-action=doSomething]': function (event, template) {
    event.preventDefault();
  }
});
