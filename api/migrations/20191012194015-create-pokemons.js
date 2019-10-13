'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Pokemones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      des: {
        type: Sequelize.STRING
      },
      imageLink: {
        type: Sequelize.STRING
      },
      power: {
        type: Sequelize.DOUBLE
      },
      locationLat: {
        type: Sequelize.STRING
      },
      locationLong: {
        type: Sequelize.STRING
      },
      isCatch: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Pokemones');
  }
};