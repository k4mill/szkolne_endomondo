module.exports = (sequelize, Sequelize) => {
    const Klasy = sequelize.define('klasy', {
      ID: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false
      },
      nazwa: {
        type: Sequelize.STRING,
        allowNull: true
      },
      nauczyciel_ID: {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    });

    return Klasy;
  }