const db = require('../config/db.config.js');
const Users = db.users;
 
exports.login = (req, res) => {
    Users.findOne({
      where: {
        userName: `${req.body.data.username}`,
        passwd: `${req.body.data.password}`
      }
    })
    .then((u) => {
      if(!u) {
        res.set({
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'DELETE,GET,PATCH,POST,PUT',
          'Access-Control-Allow-Headers': 'Content-Type,Authorization'
        });
        res.send({
          token: 0,
        });
      }

      else if(u.teacher == 0) {
        res.set({
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'DELETE,GET,PATCH,POST,PUT',
          'Access-Control-Allow-Headers': 'Content-Type,Authorization'
        });
        res.send({
          token: `${req.body.data.username}`,
          teacher: false
        });
      }

      else if(u.teacher == 1) {
        res.set({
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'DELETE,GET,PATCH,POST,PUT',
          'Access-Control-Allow-Headers': 'Content-Type,Authorization'
        });
        res.send({
          token: `${req.body.data.username}`,
          teacher: true
        });
      }
    })
    .catch((err) => {
      console.log(err);
    })
}

exports.createUser = (req, res) => {
  console.log(req.body)
  Users.create({
    userName: `${req.body.data.username}`,
    passwd: `${req.body.data.password}`,
    imie: `${req.body.data.imie}`,
    nazwisko: `${req.body.data.nazwisko}`,
    klasa_id: `${req.body.data.klasa_id}`,
    teacher: 0
  })
  .then(() => {
    res.json("OK")
  })
  .catch(error => res.status(400).send(error));
}

exports.getUser = (req, res) => {
    Users.findOne({
        where: { ID: req.query.id },
        include: [{all: true, nested: true}]
      })
      .then(aktywnosc => {
        res.json(aktywnosc);
      })
      .catch(error => {
        res.status(500).send(error);
      })
};

exports.getUserByUsername = (req, res) => {
  Users.findOne({
      where: { userName: req.query.username },
      include: [{all: true, nested: true}]
    })
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.status(500).send(error);
    })
};