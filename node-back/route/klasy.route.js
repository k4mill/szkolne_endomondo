module.exports = function(app) {
    const klasy = require('../controller/klasy.controller.js');

    // GET a user by id
    app.get('/api/getClass', klasy.getClass);
}