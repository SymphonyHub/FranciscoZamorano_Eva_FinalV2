// trainerRoutes.js
const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/trainerController');

router.get('/', trainerController.getAllTrainers);
router.get('/new', trainerController.renderNewTrainerForm);
router.post('/', trainerController.createTrainer);
router.get('/search', trainerController.searchTrainers); // Ruta de búsqueda
router.get('/:id', trainerController.getTrainer);
router.get('/:id/edit', trainerController.renderEditTrainerForm);
router.put('/:id', trainerController.updateTrainer);
router.delete('/:id', trainerController.deleteTrainer);

module.exports = router;
