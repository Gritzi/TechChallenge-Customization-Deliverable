const mongoose = require('mongoose');
const User = require("../schemas/User");

module.exports = {
    method: "GET",
    path: '/userdata',
    options: {
      cors: true,
      auth: {
        mode: 'required'
      }
    },
    handler: async (request, h) => {
      const username = request?.auth?.credentials?.username;
      console.log("Credentials", request?.auth?.credentials);
      if(username) {
        console.log(username);
      }

      const user = await User.findOne({name: username}).select('name drugs conditions');

      return user;
    }
  }