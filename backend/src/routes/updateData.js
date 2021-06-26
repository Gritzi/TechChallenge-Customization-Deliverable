const mongoose = require('mongoose');
const User = require("../schemas/User");

module.exports = {
    method: "POST",
    path: '/updateData',
    options: {
      cors: true,
      auth: {
        mode: 'required'
      }
    },
    handler: async (request, h) => {
      const username = request?.auth?.credentials?.username;

      const user = await User.findOne({name: username});

      if(!request.payload) {
        return h.response("Invalid Payload").code(403);
        }

      const { drugs, conditions } = request.payload;

      if(drugs && Array.isArray(drugs)) {
        user.drugs = drugs;
      }

      if (conditions && Array.isArray(conditions)) {
          user.conditions = conditions;
      }

      await user.save();

      h.response("Updated user").code(200);

    }
  }