const { Sequelize, DataTypes } = require('sequelize'); // Importa Sequelize y DataTypes de Sequelize
const { sequelize } = require('../config/database'); // Importa la instancia de sequelize desde la configuración de la base de datos

// Define el modelo Payment
const Payment = sequelize.define('Payment', {
    amount: {
        type: DataTypes.DECIMAL(10, 2), // Tipo de dato DECIMAL con 10 dígitos y 2 decimales
        allowNull: false, // No permite valores nulos
    },
    date: {
        type: DataTypes.DATE, // Tipo de dato DATE
        allowNull: false, // No permite valores nulos
    },
    payment_method: {
        type: DataTypes.ENUM('efectivo', 'credito', 'debito'), // Tipo de dato ENUM con los valores 'efectivo', 'credito' y 'debito'
        allowNull: false, // No permite valores nulos
    },
}, {
    timestamps: true, // Añade columnas de timestamps (createdAt, updatedAt)
});

// Exporta el modelo Payment
module.exports = Payment;
