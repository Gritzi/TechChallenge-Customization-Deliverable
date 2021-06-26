const Hapi = require('@hapi/hapi');
const mongoose = require("mongoose");
const User = require("../schemas/User");
const Bcrypt = require("bcrypt");

const login = {
    method: 'POST',
    path: '/login',
    options: {
        auth: {
            mode: 'try'
        },
        cors: {
            origin: ['*'],
            credentials: true
        }
    },

    handler: async (request, h) => {

        if(!request.payload) {
            return h.response("Invalid Payload").code(403);
        }

        const { username, password } = request.payload;

        if(!username) {
            return h.response("No Username given").code(403);
        }

        if(!password) {
            return h.response("No Username given").code(403);
        }

        let account;
        try {
            account = await User.findOne({name: username});
        } catch(err) {
            console.log(err);
        }

        if (!account || !(await Bcrypt.compare(password, account.password))) {

            return h.response("Wrong password").code(403);
        }

        request.cookieAuth.set({ username: account.name, id: account.id });

        return h.response("Successfully authenticated").code(200);
     },
}

module.exports = login;
