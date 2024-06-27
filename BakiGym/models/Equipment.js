const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Equipment = sequelize.define('Equipment', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'equipment',  // Asegúrate de que este nombre coincide con tu tabla en la base de datos
    timestamps: false
});

module.exports = Equipment;
