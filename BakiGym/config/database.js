const { Sequelize } = require('sequelize'); // Importa el módulo Sequelize desde la biblioteca sequelize
require('dotenv').config(); // Carga las variables de entorno desde un archivo .env

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST, // Host de la base de datos
    port: process.env.MYSQL_PORT, // Puerto de la base de datos
    dialect: 'mysql' // Dialecto a usar (MySQL)
});

const connectDB = async () => {
    try {
        await sequelize.authenticate(); // Intenta autenticar la conexión con la base de datos
        console.log('Conexión se ha establecido con éxito'); // Muestra un mensaje de éxito si la conexión es exitosa
    } catch (error) {
        console.error('No se puede conectar a la Base de Datos: ', error); // Muestra un mensaje de error si la conexión falla
    }
};

module.exports = { sequelize, connectDB }; // Exporta la instancia de sequelize y la función connectDB
