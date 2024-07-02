const express = require('express'); // Importa express
const router = express.Router(); // Crea una nueva instancia de router
const feedbackController = require('../controllers/feedbackController'); // Importa el controlador de feedback

// Obtener todos los feedbacks
router.get('/', feedbackController.getAllFeedback);

// Formulario para nuevo feedback
router.get('/new', async (req, res) => {
    const users = await require('../models/User').findAll(); // Obtiene todos los usuarios
    res.render('feedback/new', { users }); // Renderiza la vista para crear un nuevo feedback, pasando los usuarios
});

// Crear un nuevo feedback
router.post('/', feedbackController.createFeedback);

// Obtener un feedback por ID
router.get('/:id', feedbackController.getFeedbackById);

// Formulario para editar feedback
router.get('/:id/edit', async (req, res) => {
    try {
        const feedback = await require('../models/Feedback').findByPk(req.params.id); // Encuentra un feedback por su ID
        if (!feedback) {
            return res.status(404).send('Feedback not found'); // Envía un mensaje si el feedback no se encuentra
        }
        const users = await require('../models/User').findAll(); // Obtiene todos los usuarios
        res.render('feedback/edit', { feedback, users }); // Renderiza la vista para editar el feedback, pasando el feedback y los usuarios
    } catch (error) {
        res.status(500).send(error.message); // Envía un mensaje de error en caso de fallo
    }
});

// Actualizar un feedback
router.put('/:id', feedbackController.updateFeedback);

// Eliminar un feedback
router.delete('/:id', feedbackController.deleteFeedback);

// Exporta el router para que pueda ser usado en otros módulos
module.exports = router;
