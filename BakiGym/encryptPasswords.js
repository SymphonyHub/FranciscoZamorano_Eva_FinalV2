// Importar módulos necesarios
const bcrypt = require('bcrypt');
const { User } = require('./models');

// Función asincrónica para encriptar contraseñas
async function encryptPasswords() {
    try {
        // Obtener todos los usuarios de la base de datos
        const users = await User.findAll();

        // Iterar sobre cada usuario
        for (let user of users) {
            // Encriptar la contraseña del usuario
            const hashedPassword = await bcrypt.hash(user.password, 10);

            // Asignar la contraseña encriptada al usuario
            user.password = hashedPassword;

            // Guardar los cambios en la base de datos
            await user.save();
        }

        // Imprimir mensaje de éxito
        console.log('Contraseñas encriptadas correctamente');
    } catch (err) {
        // Manejar errores e imprimir mensaje de error
        console.error('Error encriptando contraseñas:', err);
    }
}

// Ejecutar la función para encriptar las contraseñas
encryptPasswords();
