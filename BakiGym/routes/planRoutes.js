const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');

router.get('/', planController.getAllPlans);
router.post('/', planController.createPlan);
router.put('/:id', planController.updatePlan);
router.delete('/:id', planController.deletePlan);
router.post('/select/:id', planController.generatePayment); // Asegúrate de que esta ruta esté correcta

module.exports = router;
