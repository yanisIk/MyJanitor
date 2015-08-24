Appartments = new Meteor.Collection("appartments");

if(Meteor.isServer)
	Appartments._ensureIndex({"number": 1, "buildingAddress": 1}, {unique: true});

//Schema : app = {number: Integer, buildingId: String, userId: String or null}