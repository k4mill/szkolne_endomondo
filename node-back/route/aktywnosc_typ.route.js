module.exports = function(app) {
    const aktywnosc = require('../controller/aktywnosc_typ.controller.js');
    
    // GET all activity types
    app.get('/api/getActivityTypes', aktywnosc.getActivityTypes);
}