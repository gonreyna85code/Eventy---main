const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },      
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profile: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      user_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      info: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};