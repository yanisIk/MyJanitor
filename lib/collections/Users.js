Users = Meteor.users;

UserCreateAutoformSchema = new SimpleSchema({
	firstName: {
		type: String,
		min: 2,
		max: 50
	},
	lastName: {
		type: String,
		min: 2,
		max: 50
	},
	phoneNumber: {
		type: Number,
		min:
	},
	email: {
		type: String,
		regEx: SimpleSchema.RegEx.Email,
		label: "Email",
	},
	role: {
		type: String,
		label: "Role",
    	autoform: {
	      	options: function () {
        		return Meteor.roles.find().map(function (r) {
			      return {label: r.name, value: r.name};
			    });
        	}
        }
	},
	buildingAddress: {
		type: String,
		label: "Building",
    	autoform: {
	      	options: function () {
        		return Buildings.find().map(function (b) {
			      return {label: b.address, value: b.address};
			    });
        	}
        }
	},
	appartment: {
		type: String,
		label: "Appartment number",
		autoform: {
	      	options: function () {
        		return Appartments.find({buildingAddress: this.field("buildingAddress").value}).map(function (a) {
			      return {label: a.number, value: a.number};
			    });
        	}
        }
	}
});