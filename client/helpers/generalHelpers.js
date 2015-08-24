Template.registerHelper('truncate', function(string, length) {
  var cleanString = _(string).stripTags();
  return _(cleanString).truncate(length);
});

Template.registerHelper('getCurrentUserDisplayName', function() {
  return getUserDisplayName(Meteor.user());
});