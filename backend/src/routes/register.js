const mongoose = require('mongoose')
const User = require("../schemas/User");


module.exports = {
    method: "POST",
    path: '/register/',
    options: {
      cors: true,
      auth: false,
    },
    handler: (request, h) => {
 
      const { user, password } = request.payload;

      if(user && password) {
        const exists = User.find({name: user});
        if(!exists) {
            User.create({name: user, password: password}, function (err) {
                console.log(err);
                return h.response("Error creating user").code(201);
            });
            return h.response().code(200);
        } 
        return h.response("User with name " + user + " already exists!").code(201);
      }
      
      return data;
    }
  }