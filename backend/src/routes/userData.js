const mongoose = require('mongoose')

module.exports = {
    method: "GET",
    path: '/userdata',
    options: {
      cors: true,
      auth: {
        mode: 'required'
      }
    },
    handler: (request, h) => {
      const username = request?.auth?.credentials?.username;
      console.log("Credentials", request?.auth?.credentials);
      if(username) {
        console.log(username);
      }
      const Drug = mongoose.model("Drug");
      const data = Drug.find();
      
      return data;
    }
  }