module.exports = (sequelize, Sequelize) => {
    const Aktywnosc = sequelize.define('aktywnosc', {
      ID: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false
      },
      uczen_ID: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      data_wprowadzenia: {
        type: Sequelize.DATE,
        allowNull: true
      },
      typ_ID: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      wynik: {
        type: Sequelize.FLOAT,
        allowNull: false
      }
    });

    return Aktywnosc;
  }