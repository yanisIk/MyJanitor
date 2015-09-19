Router.route('/', {
  name: 'home',
  layoutTemplate: 'publicLayout'
});

Router.route('/dashboard', {
  name: 'dashboard'
});

Router.route('/tickets', {
  name: 'tickets'
});

Router.plugin('ensureSignedIn', {
  only: ['dashboard']
});
