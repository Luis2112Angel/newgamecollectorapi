'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pokemones = sequelize.define('Pokemones', {
    name: DataTypes.STRING,
    des: DataTypes.STRING,
    imageLink: DataTypes.STRING,
    power: DataTypes.DOUBLE,
    locationLat: DataTypes.STRING,
    locationLong: DataTypes.STRING,
    isCatch: DataTypes.BOOLEAN

  }, {});
  Pokemones.associate = function(models) {
    // associations can be defined here
  };
  return Pokemones;
};