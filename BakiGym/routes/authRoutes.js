// routes/authRoutes.js
const express = require('express'); // Importa express
const router = express.Router(); // Crea una nueva instancia de router
const userController = require('../controllers/userController'); // Importa el controlador de usuario

// Ruta para renderizar la vista de login
router.get('/login', userController.renderLogin);

// Ruta para renderizar la vista de registro
router.get('/register', (req, res) => res.render('login_register/register', { error: '' }));

// Ruta para registrar un nuevo usuario
router.post('/register', userController.register);

// Ruta para iniciar sesión
router.post('/login', userController.login);

// Ruta para cerrar sesión
router.post('/logout', userController.logout);

// Exporta el router para que pueda ser usado en otros módulos
module.exports = router;
