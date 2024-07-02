// routes/equipmentRoutes.js
const express = require('express'); // Importa express
const router = express.Router(); // Crea una nueva instancia de router
const equipmentController = require('../controllers/equipmentController'); // Importa el controlador de equipos

// Ruta para obtener todos los equipos
router.get('/', equipmentController.getAllEquipments);

// Ruta para obtener el formulario para crear un nuevo equipo
router.get('/new', equipmentController.createEquipmentForm);

// Ruta para crear un nuevo equipo
router.post('/', equipmentController.createEquipment);

// Ruta para obtener un equipo por ID
router.get('/:id', equipmentController.getEquipmentById);

// Ruta para obtener el formulario para editar un equipo
router.get('/:id/edit', equipmentController.editEquipmentForm);

// Ruta para actualizar un equipo por ID
router.put('/:id', equipmentController.updateEquipment);

// Ruta para eliminar un equipo por ID
router.delete('/:id', equipmentController.deleteEquipment);

// Exporta el router para que pueda ser usado en otros módulos
module.exports = router;
