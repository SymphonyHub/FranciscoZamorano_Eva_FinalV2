// trainerRoutes.js
const express = require('express'); // Importa express
const router = express.Router(); // Crea una nueva instancia de router
const trainerController = require('../controllers/trainerController'); // Importa el controlador de entrenadores

// Ruta para obtener todos los entrenadores
router.get('/', trainerController.getAllTrainers);

// Ruta para obtener el formulario para crear un nuevo entrenador
router.get('/new', trainerController.renderNewTrainerForm);

// Ruta para crear un nuevo entrenador
router.post('/', trainerController.createTrainer);

// Ruta para buscar entrenadores
router.get('/search', trainerController.searchTrainers);

// Ruta para obtener un entrenador por ID
router.get('/:id', trainerController.getTrainer);

// Ruta para obtener el formulario para editar un entrenador
router.get('/:id/edit', trainerController.renderEditTrainerForm);

// Ruta para actualizar un entrenador por ID
router.put('/:id', trainerController.updateTrainer);

// Ruta para eliminar un entrenador por ID
router.delete('/:id', trainerController.deleteTrainer);

// Exporta el router para que pueda ser usado en otros módulos
module.exports = router;
