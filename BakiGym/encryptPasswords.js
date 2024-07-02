// encryptPasswords.js
const bcrypt = require('bcrypt');
const { User } = require('./models');

async function encryptPasswords() {
    try {
        const users = await User.findAll();
        for (let user of users) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
            await user.save();
        }
        console.log('Contraseñas encriptadas correctamente');
    } catch (err) {
        console.error('Error encriptando contraseñas:', err);
    }
}

encryptPasswords();
