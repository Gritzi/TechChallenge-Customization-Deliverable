const mongoose = require('mongoose')

module.exports = {
    method: "GET",
    path: '/data',
    options: {
      cors: true,
      auth: {
        mode: 'optional'
      }
    },
    handler: (request, h) => {
      const Drug = mongoose.model("Drug");
      const data = Drug.find();
      
      return data;
    }
  }