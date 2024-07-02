const { DataTypes } = require('sequelize'); // Importa DataTypes de Sequelize
const { sequelize } = require('../config/database'); // Importa la instancia de sequelize desde la configuración de la base de datos
const User = require('./User'); // Importa el modelo User
const Class = require('./Class'); // Importa el modelo Class

// Define el modelo Reservation
const Reservation = sequelize.define('Reservation', {
    user_id: {
        type: DataTypes.INTEGER, // Tipo de dato INTEGER
        allowNull: false, // No permite valores nulos
        references: {
            model: User, // Hace referencia al modelo User
            key: 'id' // Llave foránea es la columna 'id' de User
        }
    },
    class_id: {
        type: DataTypes.INTEGER, // Tipo de dato INTEGER
        allowNull: false, // No permite valores nulos
        references: {
            model: Class, // Hace referencia al modelo Class
            key: 'id' // Llave foránea es la columna 'id' de Class
        }
    },
    date: {
        type: DataTypes.DATEONLY, // Tipo de dato DATEONLY
        allowNull: false // No permite valores nulos
    }
});

// Define la relación entre Reservation y User
Reservation.belongsTo(User, { as: 'User', foreignKey: 'user_id' }); // Una reserva pertenece a un usuario (User)

// Define la relación entre Reservation y Class
Reservation.belongsTo(Class, { as: 'Class', foreignKey: 'class_id' }); // Una reserva pertenece a una clase (Class)

// Exporta el modelo Reservation
module.exports = Reservation;
