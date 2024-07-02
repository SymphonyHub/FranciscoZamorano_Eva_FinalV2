// routes/equipmentRoutes.js
const express = require('express');
const router = express.Router();
const equipmentController = require('../controllers/equipmentController');

router.get('/', equipmentController.getAllEquipments);
router.get('/new', equipmentController.createEquipmentForm);
router.post('/', equipmentController.createEquipment);
router.get('/:id', equipmentController.getEquipmentById);
router.get('/:id/edit', equipmentController.editEquipmentForm);
router.put('/:id', equipmentController.updateEquipment);
router.delete('/:id', equipmentController.deleteEquipment);

module.exports = router;
