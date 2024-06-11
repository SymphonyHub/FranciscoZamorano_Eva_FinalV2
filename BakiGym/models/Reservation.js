const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');
const Class = require('./Class');

const Reservation = sequelize.define('Reservation', {
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

Reservation.belongsTo(User, { foreignKey: 'user_id' });
Reservation.belongsTo(Class, { foreignKey: 'class_id' });

module.exports = Reservation;
