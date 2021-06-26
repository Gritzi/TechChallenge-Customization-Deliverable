// api.js
const Bcrypt = require('bcrypt');
const Hapi = require('@hapi/hapi')
const mongoose = require('mongoose')
const {loadCSV, insertData} = require('./src/load_csv');
const {data, login, getUserData, register} = require('./src/routes');
const hapi_cookie_auth = require('@hapi/cookie');
const User = require("./src/schemas/User");

async function api(){
  try {
    
    let server = new Hapi.Server(
      {
         address: "0.0.0.0",
         port: 8080, 
         routes: {
          cors: {
              origin: ["*"]
          }
        }
      }
    )
    mongoose.connect('mongodb://mongo/rest_hapi', {useNewUrlParser: true});

    await server.register(hapi_cookie_auth);
    server.auth.strategy('session', 'cookie', {
      cookie: {
          name: 'sid',
          password: '!wsYhFA*C2U6nz=Bu^%A@^F#SF3&kSR6',
          isSecure: false
      },
      validateFunc: async (request, session) => {


        console.log("Session", session);
        const account = User.find({name: session.username});

        if (!account) {

            return { valid: false };
        }

        return { valid: true, credentials: account };
      },
      });
    
    server.auth.default('session');

    const results = await loadCSV();
    await insertData(results);

    server.route(data)

    server.route(register)

    server.route(login);

    server.route(getUserData);

    await server.start()

    console.log("Server ready", server.info)
    
    return server
  } catch (err) {
    console.log("Error starting server:", err);
  }
}

module.exports = api()
