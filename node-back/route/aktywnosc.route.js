module.exports = function(app) {
    const aktywnosc = require('../controller/aktywnosc.controller.js');
 
    // Retrieve all Customer
    app.get('/api/aktywnosc', aktywnosc.findAll);
}