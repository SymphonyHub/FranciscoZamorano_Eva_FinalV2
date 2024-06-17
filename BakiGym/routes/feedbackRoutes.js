const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Obtener todos los feedbacks
router.get('/', feedbackController.getAllFeedback);

// Formulario para nuevo feedback
router.get('/new', async (req, res) => {
    const users = await require('../models/User').findAll();
    res.render('feedback/new', { users });
});

// Crear un nuevo feedback
router.post('/', feedbackController.createFeedback);

// Obtener un feedback por ID
router.get('/:id', feedbackController.getFeedbackById);

// Formulario para editar feedback
router.get('/:id/edit', async (req, res) => {
    try {
        const feedback = await require('../models/Feedback').findByPk(req.params.id);
        if (!feedback) {
            return res.status(404).send('Feedback not found');
        }
        const users = await require('../models/User').findAll();
        res.render('feedback/edit', { feedback, users });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Actualizar un feedback
router.put('/:id', feedbackController.updateFeedback);

// Eliminar un feedback
router.delete('/:id', feedbackController.deleteFeedback);

module.exports = router;
