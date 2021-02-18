const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  define: {
    timestamps: false,
    freezeTableName: true
  },
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
//Models/tables
db.aktywnosc = require('../model/aktywnosc.model.js')(sequelize, Sequelize);
db.users = require('../model/users.model.js')(sequelize, Sequelize);
db.aktywnosc_typ = require('../model/aktywnosc_typ.model')(sequelize, Sequelize);
db.nauczyciele = require('../model/nauczyciele.model')(sequelize, Sequelize);
db.klasy = require('../model/klasy.model')(sequelize, Sequelize);

//Relations
db.users.hasMany(db.aktywnosc, {foreignKey: 'uczen_ID'});
db.aktywnosc.belongsTo(db.users, {foreignKey: 'uczen_ID'});
db.aktywnosc_typ.hasMany(db.aktywnosc, {foreignKey: 'typ_ID'});
db.aktywnosc.belongsTo(db.aktywnosc_typ, {foreignKey: 'typ_ID'});
db.nauczyciele.hasMany(db.klasy, {foreignKey: 'nauczyciel_ID'});
db.klasy.belongsTo(db.nauczyciele, {foreignKey: 'nauczyciel_ID'});
db.klasy.hasMany(db.users, {foreignKey: 'klasa_id'});
db.users.belongsTo(db.klasy, {foreignKey: 'klasa_id'});

module.exports = db;