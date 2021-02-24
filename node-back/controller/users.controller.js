const db = require('../config/db.config.js');
const Users = db.users;
 
exports.login = (req, res) => {
  console.log(req.body.data.username)
    Users.count({
      where: {
        userName: `${req.body.data.username}`,
        passwd: `${req.body.data.password}`
      }
    })
    .then((c) => {
      if(c === 1) {
        res.set({
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'DELETE,GET,PATCH,POST,PUT',
          'Access-Control-Allow-Headers': 'Content-Type,Authorization'
        });
        res.send({
          token: `${req.body.data.username}`
        });
      }

      else {
        res.set({
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'DELETE,GET,PATCH,POST,PUT',
          'Access-Control-Allow-Headers': 'Content-Type,Authorization'
        });
        res.send({
          token: 0,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    })
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