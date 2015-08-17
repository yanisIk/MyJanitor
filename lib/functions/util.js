getUserDisplayName = function(userOrUserId){
	if(typeof userOrUserId  === "string"){
		var user = Meteor.users.findOne(userOrUserId);
		return user.profile.firstName+" "+user.profile.lastName;
	}
	else if(typeof userOrUserId === "object"){
		return userOrUserId.profile.firstName+" "+userOrUserId.profile.lastName;
	}
}

ownsTicket = function(userId, ticket){
	return ticket && ticket.userId === userId;
}

ownsPost = function(userId, post){
	return post && post.userId === userId;
}