const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');
const Class = require('./Class');

const Reservation = sequelize.define('Reservation', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    class_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Class,
            key: 'id'
        }
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
});

Reservation.belongsTo(User, { as: 'User', foreignKey: 'user_id' });
Reservation.belongsTo(Class, { as: 'Class', foreignKey: 'class_id' });

module.exports = Reservation;
