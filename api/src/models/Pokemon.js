const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Pokemon', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    hp: {
      type: DataTypes.INTEGER,
      defaultValue: 25,
    },
    attack: {
      type: DataTypes.INTEGER,
      defaultValue: 25,
    },
    defence: {
      type: DataTypes.INTEGER,
      defaultValue: 25,
    },
    speed: {
      type: DataTypes.INTEGER,
      defaultValue: 25,
    },
    height: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
    },
    weight: {
      type: DataTypes.INTEGER,
      defaultValue: 25,
    },
    image: {
      type: DataTypes.STRING(1234),
      allowNull: true,
    }
  }, {timestamps: false,});
};
