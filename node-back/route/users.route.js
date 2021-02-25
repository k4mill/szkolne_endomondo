module.exports = function(app) {
    const users = require('../controller/users.controller.js');

    // GET a user by id
    app.get('/api/getUser', users.getUser);

    // Verify user credentials
    app.post('/api/login', users.login);

    // Register a user
    app.post('/api/createUser', users.createUser);

    // GET a user by username
    app.get('/api/getUserByUsername', users.getUserByUsername);
}