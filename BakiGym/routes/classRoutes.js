// classRoutes.js
const express = require('express'); // Importa express
const router = express.Router(); // Crea una nueva instancia de router
const classController = require('../controllers/classController'); // Importa el controlador de clases

// Ruta para obtener todas las clases
router.get('/', classController.getAllClasses);

// Ruta para obtener el formulario para crear una nueva clase
router.get('/new', classController.getNewClassForm);

// Ruta para crear una nueva clase
router.post('/', classController.createClass);

// Ruta para buscar clases
router.get('/search', classController.searchClasses);

// Ruta para obtener una clase por ID
router.get('/:id', classController.getClassById);

// Ruta para obtener el formulario para editar una clase
router.get('/:id/edit', classController.getEditClassForm);

// Ruta para actualizar una clase por ID
router.put('/:id', classController.updateClass);

// Ruta para eliminar una clase por ID
router.delete('/:id', classController.deleteClass);

// Exporta el router para que pueda ser usado en otros módulos
module.exports = router;
