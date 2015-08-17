Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});

Router.route('/', {
  name: 'home',
});

Router.route('/tickets', {
  name: 'tickets',
});

Router.route('/tickets/:slug', {
  name: 'ticket',
});

Router.route('/posts', {
  name: 'posts',
});

Router.route('/posts/:slug', {
  name: 'post',
});

Router.plugin('ensureSignedIn', {
  expect: ['home']
});



//UserAccounts Routes
AccountsTemplates.configureRoute('signIn', {
  name: 'signin',
  path: '/signin',
  // redirect: '/dashboard'
})

AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
//AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');