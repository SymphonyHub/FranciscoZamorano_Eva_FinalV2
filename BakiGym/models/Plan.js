const { DataTypes } = require('sequelize'); // Importa DataTypes de Sequelize
const { sequelize } = require('../config/database'); // Importa la instancia de sequelize desde la configuración de la base de datos

// Define el modelo Plan
const Plan = sequelize.define('Plan', {
    name: {
        type: DataTypes.STRING, // Tipo de dato STRING
        allowNull: false // No permite valores nulos
    },
    price: {
        type: DataTypes.DECIMAL(10, 2), // Tipo de dato DECIMAL con 10 dígitos y 2 decimales
        allowNull: false // No permite valores nulos
    },
    duration: {
        type: DataTypes.INTEGER, // Tipo de dato INTEGER
        allowNull: false // No permite valores nulos
    }
}, {
    timestamps: true // Añade columnas de timestamps (createdAt, updatedAt)
});

// Exporta el modelo Plan
module.exports = Plan;
