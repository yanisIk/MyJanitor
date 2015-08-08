Meteor.publish("roles", function (){ 
  if(!this.userId){
  	throw new Meteor.Error(403, "You should be logged in as admin to see roles");
  }
  if(!Roles.userIsInRole(this.userId, ['admin'])){
  	throw new Meteor.Error(403, "You should be an admin to see roles");
  }
  return Meteor.roles.find({})
});