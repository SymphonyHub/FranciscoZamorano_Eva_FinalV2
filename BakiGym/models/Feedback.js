const { DataTypes } = require('sequelize'); // Importa DataTypes de Sequelize
const { sequelize } = require('../config/database'); // Importa la instancia de sequelize desde la configuración de la base de datos
const User = require('./User'); // Importa el modelo User

// Define el modelo Feedback
const Feedback = sequelize.define('Feedback', {
    id: {
        type: DataTypes.INTEGER, // Tipo de dato INTEGER
        autoIncrement: true, // Auto incrementa el valor
        primaryKey: true // Clave primaria
    },
    user_id: {
        type: DataTypes.INTEGER, // Tipo de dato INTEGER
        references: {
            model: 'Users', // Hace referencia al modelo Users
            key: 'id' // Llave foránea es la columna 'id' de Users
        }
    },
    message: {
        type: DataTypes.TEXT, // Tipo de dato TEXT
        allowNull: false // No permite valores nulos
    },
    date: {
        type: DataTypes.DATE, // Tipo de dato DATE
        allowNull: false, // No permite valores nulos
        defaultValue: DataTypes.NOW // Valor por defecto es la fecha y hora actual
    }
}, {
    tableName: 'Feedback' // Nombre de la tabla en la base de datos
});

// Define la relación entre Feedback y User
Feedback.belongsTo(User, { as: 'User', foreignKey: 'user_id' }); // Un feedback pertenece a un usuario (User)

// Exporta el modelo Feedback
module.exports = Feedback;
