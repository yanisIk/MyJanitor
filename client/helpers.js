Template.registerHelper("date", function(object) {
  return object && object.createdAt
     && moment(object.createdAt).format('ll');
})

