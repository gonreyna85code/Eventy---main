const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  
  sequelize.define(
    "event",
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
      info: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sub_category: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
