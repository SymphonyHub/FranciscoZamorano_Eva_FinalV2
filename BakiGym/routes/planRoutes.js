const express = require('express'); // Importa express
const router = express.Router(); // Crea una nueva instancia de router
const planController = require('../controllers/planController'); // Importa el controlador de planes

// Ruta para obtener todos los planes
router.get('/', planController.getAllPlans);

// Ruta para crear un nuevo plan
router.post('/', planController.createPlan);

// Ruta para obtener el formulario para editar un plan
router.get('/:id/edit', planController.renderEditPlanForm);

// Ruta para actualizar un plan por ID
router.put('/:id', planController.updatePlan);

// Ruta para eliminar un plan por ID
router.delete('/:id', planController.deletePlan);

// Ruta para generar un pago para un plan seleccionado
router.post('/select/:id', planController.generatePayment);

// Exporta el router para que pueda ser usado en otros módulos
module.exports = router;
