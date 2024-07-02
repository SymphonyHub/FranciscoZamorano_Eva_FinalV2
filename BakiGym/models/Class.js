const { DataTypes } = require('sequelize'); // Importa DataTypes de Sequelize
const { sequelize } = require('../config/database'); // Importa la instancia de sequelize desde la configuración de la base de datos
const Trainer = require('./Trainer'); // Importa el modelo Trainer

// Define el modelo Class
const Class = sequelize.define('Class', {
    name: {
        type: DataTypes.STRING, // Tipo de dato STRING
        allowNull: false // No permite valores nulos
    },
    description: {
        type: DataTypes.TEXT, // Tipo de dato TEXT
        allowNull: false // No permite valores nulos
    }
});

// Define la relación entre Class y Trainer
Class.belongsTo(Trainer, { foreignKey: 'trainer_id', as: 'Trainer' }); // Una clase pertenece a un entrenador (Trainer)

// Exporta el modelo Class
module.exports = Class;
