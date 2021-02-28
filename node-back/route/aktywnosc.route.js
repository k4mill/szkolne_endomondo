module.exports = function(app) {
    const aktywnosc = require('../controller/aktywnosc.controller.js');
    
    // GET one activity
    app.get('/api/getActivity', aktywnosc.getActivity);

    // GET all activities
    app.get('/api/getAllActivities', aktywnosc.getAllActivities);

    // INSERT a new activity
    app.put('/api/insertActivity', aktywnosc.insertActivity);

    // DELETE a given activity
    app.delete('/api/deleteActivity', aktywnosc.deleteActivity);

    // GET 3 last activities
    app.get('/api/getLastActivities', aktywnosc.getLastActivities);
}