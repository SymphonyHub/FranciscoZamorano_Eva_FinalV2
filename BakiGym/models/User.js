// User.js
const { DataTypes } = require('sequelize'); // Importa DataTypes de Sequelize
const { sequelize } = require('../config/database'); // Importa la instancia de sequelize desde la configuración de la base de datos

// Define el modelo User
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER, // Tipo de dato INTEGER
        autoIncrement: true, // Auto incrementa el valor
        primaryKey: true // Clave primaria
    },
    name: {
        type: DataTypes.STRING, // Tipo de dato STRING
        allowNull: false // No permite valores nulos
    },
    email: {
        type: DataTypes.STRING, // Tipo de dato STRING
        allowNull: false, // No permite valores nulos
        unique: true // Valor único
    },
    password: {
        type: DataTypes.STRING, // Tipo de dato STRING
        allowNull: false // No permite valores nulos
    },
    createdAt: {
        type: DataTypes.DATE, // Tipo de dato DATE
        defaultValue: DataTypes.NOW // Valor por defecto es la fecha y hora actual
    },
    updatedAt: {
        type: DataTypes.DATE, // Tipo de dato DATE
        defaultValue: DataTypes.NOW // Valor por defecto es la fecha y hora actual
    }
}, {
    tableName: 'Users' // Nombre de la tabla en la base de datos
});

// Exporta el modelo User
module.exports = User;
