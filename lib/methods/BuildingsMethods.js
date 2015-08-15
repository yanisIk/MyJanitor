Meteor.methods({

  'Buildings.create': function(building){
    check(building, BuildingsCreateSchema);
    if(!this.userId){
      throw new Meteor.Error(403, "You can't create a building without being logged in as an admin");
    }
    if(!Roles.userIsInRole(this.userId, ['admin'])){
      throw new Meteor.Error(403, "You should be an admin to create a building");
    }
    building.createdAt = new Date();
    Buildings.insert(building);
  },
  'Buildings.delete': function(buildingId){
    check(buildingId, String);
    if(!this.userId){
      throw new Meteor.Error(403, "You can't delete a building without being logged in as an admin");
    }
    if(!Roles.userIsInRole(this.userId, ['admin'])){
      throw new Meteor.Error(403, "You should be an admin or renter to delete a building");
    }
    if(!Buildings.find(buildingId).count()){
      throw new Meteor.Error(500, "Cannot delete: Building doesn't exist")
    }
    
    deleteBuildingAndAppartments(buildingId);
    
  },
  'Building.edit': function(buildingId, modifier){
      check(buildingId, String);
      check(modifier, String);
      if(!this.userId){
        throw new Meteor.Error(403, "You can't edit a building without being logged in as a renter or admin");
      }
      if(!Roles.userIsInRole(this.userId, ['admin'])){
        throw new Meteor.Error(403, "You should be an admin or renter to edit a building");
      }
      if(!Buildings.find(buildingId).count()){
        throw new Meteor.Error(500, "Cannot edit: Building doesn't exist")
      }  
      Buildings.update({'_id': buildingId}, {$set: {'content': modifier}});
  },
});