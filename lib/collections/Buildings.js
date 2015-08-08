Buildings = new Meteor.Collection("buildings");

//Schema : building = {name: String, address: AddressSchema} address unique

AddressSchema = new SimpleSchema({
  street: {
    type: String,
    label: "Street",
    max: 100
  },
  city: {
    type: String,
    label: "City",
    max: 50
  },
  country: {
  	type: String,
  	label: "Country",
  	autoform: {
	      	options: function () {
        		return _.map(['Canada', 'USA'], function (c) {
		          return {label: c, value: c};
		        });
			}
	}
  },
  state: {
    type: String,
    label: "State or Province",
    autoform: {
	      	options: function () {
        		var country = this.field("country").value;
        		var statesOrProvinces = getStatesOrProvincesFor(country);
        		return _.map(statesOrProvinces, function (s) {
		          return {label: s, value: s};
		        });
			}
	}
  },
  zip: {
    type: String,
    regEx: /^[0-9]{5}$/
  }
});

