module.exports = function(app) {
    const klasy = require('../controller/klasy.controller.js');

    // GET all classes
    app.get('/api/getClass', klasy.getClass);

    // GET a class by id
    app.get('/api/getClassById', klasy.getClassById);
}