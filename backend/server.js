// api.js
const Hapi = require('@hapi/hapi')
const mongoose = require('mongoose')
const load_csv = require('./src/load_csv');

async function api(){
  try {
    
    let server = Hapi.Server({ port: 8080 })
    mongoose.connect('mongodb://mongo/rest_hapi', {useNewUrlParser: true});
    const results = await load_csv();
    console.log("here I am");

    const schema = new mongoose.Schema({id: Number, name: String, wechselwirkungen_mit: [Number], verhindernde_krankheiten: [String], link_zu_pdf: String});
    const Drug = mongoose.model('Drug', schema);

    for (const res of results ) {
      const query = {id: res.id};
      await Drug.updateOne(query, res, {upsert: true});
    }

    await server.start()

    console.log("Server ready", server.info)
    
    return server
  } catch (err) {
    console.log("Error starting server:", err);
  }
}

module.exports = api()
