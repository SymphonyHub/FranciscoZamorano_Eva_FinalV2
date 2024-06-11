const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');
const Plan = require('./Plan');

const Payment = sequelize.define('Payment', {
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

Payment.belongsTo(User, { foreignKey: 'user_id' });
Payment.belongsTo(Plan, { foreignKey: 'plan_id' });

module.exports = Payment;
