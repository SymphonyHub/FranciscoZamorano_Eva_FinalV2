const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Trainer = sequelize.define('Trainer', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    specialty: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Trainer;
