// models/Equipment.js
const { DataTypes } = require('sequelize'); // Importa DataTypes de Sequelize
const { sequelize } = require('../config/database'); // Importa la instancia de sequelize desde la configuración de la base de datos

// Define el modelo Equipment
const Equipment = sequelize.define('Equipment', {
    name: {
        type: DataTypes.STRING, // Tipo de dato STRING
        allowNull: false // No permite valores nulos
    },
    description: {
        type: DataTypes.STRING, // Tipo de dato STRING
        allowNull: false // No permite valores nulos
    },
    imageUrl: {
        type: DataTypes.STRING, // Tipo de dato STRING
        allowNull: true // Permite valores nulos
    },
    quantity: {
        type: DataTypes.INTEGER, // Tipo de dato INTEGER
        allowNull: false, // No permite valores nulos
        defaultValue: 0 // Valor por defecto 0
    }
}, {
    tableName: 'equipment', // Nombre de la tabla en la base de datos
    timestamps: false // No añade columnas de timestamps (createdAt, updatedAt)
});

// Exporta el modelo Equipment
module.exports = Equipment;
