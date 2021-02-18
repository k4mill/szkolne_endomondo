const db = require('../config/db.config.js');
const Users = db.users;
 
 
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