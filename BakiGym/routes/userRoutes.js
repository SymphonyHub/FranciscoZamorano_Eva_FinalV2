// routes/userRoutes.js
const express = require('express'); // Importa express
const router = express.Router(); // Crea una nueva instancia de router
const userController = require('../controllers/userController'); // Importa el controlador de usuarios

// Ruta para obtener todos los usuarios
router.get('/', userController.getAllUsers);

// Ruta para obtener el formulario para crear un nuevo usuario
router.get('/new', userController.renderNewUserForm);

// Ruta para crear un nuevo usuario
router.post('/', userController.createUser);

// Ruta para buscar usuarios
router.get('/search', userController.searchUsers);

// Ruta para obtener un usuario por ID
router.get('/:id', userController.getUser);

// Ruta para obtener el formulario para editar un usuario
router.get('/:id/edit', userController.renderEditUserForm);

// Ruta para actualizar un usuario por ID
router.put('/:id', userController.updateUser);

// Ruta para eliminar un usuario por ID
router.delete('/:id', userController.deleteUser);

// Exporta el router para que pueda ser usado en otros módulos
module.exports = router;
