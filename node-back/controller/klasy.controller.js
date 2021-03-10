const db = require('../config/db.config.js');
const Klasy = db.klasy;
 
exports.getClass = (req, res) => {
  Klasy.findAll({
      where: { nauczyciel_ID: req.query.nauczyciel_ID },
      include: [{all: true, nested: true}]
    })
    .then(aktywnosc => {
      res.json(aktywnosc);
    })
    .catch(error => {
      res.status(500).send(error);
    })
};

exports.getClassById = (req, res) => {
  Klasy.findOne({
      where: { Id: req.query.id },
      include: [{all: true, nested: true}]
    })
    .then(aktywnosc => {
      res.json(aktywnosc);
    })
    .catch(error => {
      res.status(500).send(error);
    })
};