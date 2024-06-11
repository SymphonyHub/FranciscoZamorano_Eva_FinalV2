const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');

const Feedback = sequelize.define('Feedback', {
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

Feedback.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Feedback;
