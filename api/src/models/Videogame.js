const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  sequelize.define(
    "videogame",
    {
      id: {
        //UUID es para asignar un ID unico universal
        type: DataTypes.UUID,
        //UUIDV4 es una funcion de sequalize que genera este ID unico
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      platforms: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      background_image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      released: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      origin: {
        type: DataTypes.STRING,
        defaultValue: "db",
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
