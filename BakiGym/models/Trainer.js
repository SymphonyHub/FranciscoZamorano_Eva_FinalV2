// Trainer.js
const { sequelize } = require('../config/database'); // Importa la instancia de sequelize desde la configuración de la base de datos
const { DataTypes } = require('sequelize'); // Importa DataTypes de Sequelize

// Define el modelo Trainer
const Trainer = sequelize.define('Trainer', {
    name: {
        type: DataTypes.STRING, // Tipo de dato STRING
        allowNull: false // No permite valores nulos
    },
    specialty: {
        type: DataTypes.STRING, // Tipo de dato STRING
        allowNull: false // No permite valores nulos
    }
}, {
    timestamps: true // Añade columnas de timestamps (createdAt, updatedAt)
});

// Exporta el modelo Trainer
module.exports = Trainer;
