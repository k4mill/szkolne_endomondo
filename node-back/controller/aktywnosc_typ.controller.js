const db = require('../config/db.config.js');
const Aktywnosc_typ = db.aktywnosc_typ;
 
exports.getActivityTypes = (req, res) => {
    Aktywnosc_typ.findAll()
    .then(aktywnosc_typ => {
      res.json(aktywnosc_typ);
    })
    .catch(error => res.status(400).send(error));
}