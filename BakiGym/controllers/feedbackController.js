const { Feedback, User } = require('../models'); // Importa los modelos Feedback y User

// Obtener todos los feedbacks
exports.getAllFeedback = async (req, res) => {
    try {
        const feedbacks = await Feedback.findAll({
            include: [{ model: User, as: 'User' }] // Incluye la relación con el modelo User
        });
        const users = await User.findAll(); // Obtener todos los usuarios
        res.render('feedback/index', { feedbacks, users }); // Renderiza la vista de feedbacks, pasando los feedbacks y usuarios
    } catch (error) {
        res.status(500).send(error.message); // Envía un mensaje de error en caso de fallo
    }
};

// Obtener un feedback por ID
exports.getFeedbackById = async (req, res) => {
    try {
        const feedback = await Feedback.findByPk(req.params.id, {
            include: [{ model: User, as: 'User' }] // Incluye la relación con el modelo User
        });
        if (!feedback) {
            return res.status(404).send('Feedback not found'); // Envía un mensaje si el feedback no se encuentra
        }
        res.render('feedback/show', { feedback }); // Renderiza la vista del feedback encontrado
    } catch (error) {
        res.status(500).send(error.message); // Envía un mensaje de error en caso de fallo
    }
};

// Crear un nuevo feedback
exports.createFeedback = async (req, res) => {
    try {
        await Feedback.create(req.body); // Crea un nuevo registro de Feedback con los datos del cuerpo de la solicitud
        res.redirect('/feedback'); // Redirige a la lista de feedbacks
    } catch (error) {
        res.status(500).send(error.message); // Envía un mensaje de error en caso de fallo
    }
};

// Actualizar un feedback
exports.updateFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findByPk(req.params.id); // Encuentra un feedback por su ID
        if (!feedback) {
            return res.status(404).send('Feedback not found'); // Envía un mensaje si el feedback no se encuentra
        }
        await feedback.update(req.body); // Actualiza el feedback con los datos del cuerpo de la solicitud
        res.redirect(`/feedback`); // Redirige a la lista de feedbacks
    } catch (error) {
        res.status(500).send(error.message); // Envía un mensaje de error en caso de fallo
    }
};

// Eliminar un feedback
exports.deleteFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findByPk(req.params.id); // Encuentra un feedback por su ID
        if (!feedback) {
            return res.status(404).send('Feedback not found'); // Envía un mensaje si el feedback no se encuentra
        }
        await feedback.destroy(); // Elimina el feedback
        res.redirect('/feedback'); // Redirige a la lista de feedbacks
    } catch (error) {
        res.status(500).send(error.message); // Envía un mensaje de error en caso de fallo
    }
};
