module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define('users', {
      ID: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false
      },
      userName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      passwd: {
        type: Sequelize.STRING,
        allowNull: true
      },
      imie: {
        type: Sequelize.STRING,
        allowNull: true
      },
      nazwisko: {
        type: Sequelize.STRING,
        allowNull: true
      },
      klasa_id: {
          type: Sequelize.INTEGER,
          allowNull: true
      }
    });

    return Users;
  }