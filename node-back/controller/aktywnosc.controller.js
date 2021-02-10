const db = require('../config/db.config.js');
const Aktywnosc = db.aktywnosc;
 
 
exports.findAll = (req, res) => {
    Aktywnosc.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] }
      })
      .then(aktywnosc => {
        res.json(aktywnosc);
      })
      .catch(error => res.status(400).send(error))
  };