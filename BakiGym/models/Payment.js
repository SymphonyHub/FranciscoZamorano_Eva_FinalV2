const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Payment = sequelize.define('Payment', {
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    payment_method: {
        type: DataTypes.ENUM('efectivo', 'credito', 'debito'),
        allowNull: false,
    },
}, {
    timestamps: true,
});

module.exports = Payment;
