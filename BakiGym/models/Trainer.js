const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');

const Trainer = sequelize.define('Trainer', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    specialty: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = Trainer;
