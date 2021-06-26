const mongoose = require('mongoose');

const schema = new mongoose.Schema({name: String, password: String, drugs: [Number]});
const User = mongoose.model('User', schema);

module.exports = User;
