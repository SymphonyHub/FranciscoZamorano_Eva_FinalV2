const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');

router.get('/', planController.getAllPlans);
router.post('/', planController.createPlan);
router.get('/:id/edit', planController.renderEditPlanForm); // Ruta para editar un plan
router.put('/:id', planController.updatePlan);
router.delete('/:id', planController.deletePlan);
router.post('/select/:id', planController.generatePayment);

module.exports = router;
