const mongoose = require('mongoose');

const schema = new mongoose.Schema({id: Number, name: String, wechselwirkungen_mit: [Number], verhindernde_krankheiten: [String], link_zu_pdf: String});
const Drug = mongoose.model('Drug', schema);

module.exports = Drug;
