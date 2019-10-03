'use strict';
module.exports = (sequelize, DataTypes) => {
  const Games = sequelize.define('Games', {
    name: DataTypes.STRING,
    developer: DataTypes.STRING,
    gamesystem: DataTypes.STRING,
    genre: DataTypes.STRING,
    year: DataTypes.SMALLINT
  }, {});
  Games.associate = function(models) {
    // associations can be defined here
  };
  return Games;
};