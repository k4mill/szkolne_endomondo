const Users = require('./users.model');

module.exports = (sequelize, Sequelize) => {
    const Aktywnosc_typ = sequelize.define('aktywnosc_typ', {
      ID: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false
      },
      nazwa: {
        type: Sequelize.STRING,
        allowNull: true
      }
    });

    return Aktywnosc_typ;
  }