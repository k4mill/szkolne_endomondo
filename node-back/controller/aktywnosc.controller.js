const db = require('../config/db.config.js');
const Aktywnosc = db.aktywnosc;
 
exports.getActivity = (req, res) => {
    Aktywnosc.findOne({
      where: { ID: req.query.id },
      include: [{all: true, nested: true}]
    })
    .then(aktywnosc => {
      res.json(aktywnosc);
    })
    .catch(error => res.status(400).send(error));
}

exports.getAllActivities = (req, res) => {
    Aktywnosc.findAll({
        include: [{all: true, nested: true}]
      })
      .then(aktywnosc => {
        res.json(aktywnosc);
      })
      .catch(error => res.status(400).send(error));
  };

exports.insertActivity = (req, res) => {
  Aktywnosc.create({
    ID: req.query.id,
    uczen_ID: req.query.uczen_ID,
    data_wprowadzenia: req.query.dat_wpr,
    typ_ID: req.query.typ_ID,
    wynik: req.query.wynik,
  })
  .then(aktywnosc => {
    res.json(aktywnosc);
  })
  .catch(error => res.status(400).send(error));
}

exports.deleteActivity = (req, res) => {
  Aktywnosc.destroy({
    where: { ID: req.query.id }
  })
  .then(aktywnosc => {
    res.json(aktywnosc);
  })
  .catch(error => res.status(400).send(error))
}