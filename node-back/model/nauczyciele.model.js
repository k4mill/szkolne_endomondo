module.exports = (sequelize, Sequelize) => {
    const Nauczyciele = sequelize.define('nauczyciele', {
      ID: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false
      },
      user_ID: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      imie: {
        type: Sequelize.STRING,
        allowNull: true
      },
      nazwisko: {
        type: Sequelize.STRING,
        allowNull: true
      }
    });

    return Nauczyciele;
  }