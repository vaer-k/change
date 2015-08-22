module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Recipients", {
    food: DataTypes.DECIMAL(10, 2),

    cloth: DataTypes.DECIMAL(10, 2),

    password: DataTypes.STRING,

    pin: DataTypes.INTEGER
  })
}