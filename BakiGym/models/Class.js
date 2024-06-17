const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Trainer = require('./Trainer');

const Class = sequelize.define('Class', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

Class.belongsTo(Trainer, { foreignKey: 'trainer_id', as: 'Trainer' });

module.exports = Class;
