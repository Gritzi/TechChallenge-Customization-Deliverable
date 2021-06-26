const mongoose = require('mongoose')
const User = require("../schemas/User");
const Bcrypt = require("bcrypt");


module.exports = {
    method: "POST",
    path: '/register',
    options: {
      cors: true,
      auth: {
        mode: 'optional'
      },
    },
    handler: async (request, h) => {

      if(!request.payload) {
        return h.response("No Payload received").code(201)
      }
 
      const { username, password } = request.payload;

      if(!username) {
        return h.response("No Username received").code(201)
      }

      if(!password) {
        return h.response("No Password received").code(201)
      }


     
      const exists = await User.exists({name: username});
      if(!exists) {

          try {
            const hash = await Bcrypt.hash(password, 5);
            await User.create({name: username, password: hash});
          } catch (err) {
            console.log(err);
            return h.response("Error creating user").code(201);
          }

          return h.response("Successfully registered!").code(200);
      } 
      return h.response("User with name " + username + " already exists!").code(201);
    }
  }