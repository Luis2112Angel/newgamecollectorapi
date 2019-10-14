'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pokemons = sequelize.define('Pokemons', {
    name: DataTypes.STRING,
    des: DataTypes.STRING,
    imageLink: DataTypes.STRING,
    power: DataTypes.DOUBLE,
    locationLat: DataTypes.STRING,
    locationLong: DataTypes.STRING,
    isCatch: DataTypes.BOOLEAN
  }, {});
  Pokemons.associate = function(models) {
    // associations can be defined here
  };
  return Pokemons;
};