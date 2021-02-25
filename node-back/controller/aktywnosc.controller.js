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
        where: { uczen_ID: req.query.uczen_ID },
        include: [{all: true, nested: true}]
      })
      .then(aktywnosc => {
        res.json(aktywnosc);
      })
      .catch(error => res.status(400).send(error));
  };

exports.insertActivity = (req, res) => {
  Aktywnosc.create({
    uczen_ID: req.body.uczen_ID,
    data_wprowadzenia: req.body.dat_wpr,
    typ_ID: req.body.typ_ID,
    wynik: req.body.wynik,
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