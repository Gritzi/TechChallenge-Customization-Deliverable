const Bcrypt = require('bcrypt');
const Hapi = require('@hapi/hapi');
const mongoose = require("mongoose");
const User = require("../schemas/User");

const validate = async (request, username, password) => {

    const user = User.find({name: username});
    if (!user) {
        return { credentials: null, isValid: false };
    }

    const isValid = await Bcrypt.compare(password, user.password);
    const credentials = { id: user.id, name: user.name };

    return { isValid, credentials };
};

const login = {
    method: 'POST',
    path: '/login',
    handler: async (request, h) => {

        const { username, password } = request.payload;
        const account = User.find({name: username});

        if (!account || !(await Bcrypt.compare(password, account.password))) {

            return h.view('/login');
        }

        request.cookieAuth.set({ id: account.id });

        return h.redirect('/');
     },
     options: {
         auth: {
             mode: 'try'
         }
     }
}

module.exports = login;
