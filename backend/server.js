// api.js
const Hapi = require('@hapi/hapi')
const mongoose = require('mongoose')
const {loadCSV, insertData} = require('./src/load_csv');
const data = require('./src/routes/data');
const register = require('./src/routes/register');
const hapi_basic_auth = require('@hapi/cookie');
const Bcrypt = require('bcrypt');
const User = require("../schemas/User");

async function api(){
  try {
    
    let server = Hapi.Server(
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
          name: 'sid-example',
          password: '!wsYhFA*C2U6nz=Bu^%A@^F#SF3&kSR6',
          isSecure: false
      },
      redirectTo: '/login',
      validateFunc: async (request, session) => {

          const account = User.find({name: username});

          if (!account) {

              return { valid: false };
          }

          return { valid: true, credentials: account };
      }
      });
    
    server.auth.default('session');

    const results = await loadCSV();
    await insertData(results);

    server.route(data)

    server.route(register)

    server.route(login);

    await server.start()

    console.log("Server ready", server.info)
    
    return server
  } catch (err) {
    console.log("Error starting server:", err);
  }
}

module.exports = api()
