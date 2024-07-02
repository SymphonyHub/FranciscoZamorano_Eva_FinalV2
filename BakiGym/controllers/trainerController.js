// trainerController.js
const Trainer = require('../models/Trainer'); // Importa el modelo Trainer
const Sequelize = require('sequelize'); // Importa Sequelize

// Buscar entrenadores
exports.searchTrainers = async (req, res) => {
    try {
        const query = req.query.query ? req.query.query.toLowerCase() : ''; // Obtiene la query de la solicitud y la convierte a minúsculas
        let trainers;

        if (!query) {
            // Si no hay query, devolver todos los entrenadores
            trainers = await Trainer.findAll();
        } else if (!isNaN(query)) {
            // Buscar por ID si el query es un número
            trainers = await Trainer.findAll({
                where: {
                    id: query // Busca los entrenadores por ID
                }
            });
        } else {
            // Buscar por nombre o especialidad si el query no es un número
            trainers = await Trainer.findAll({
                where: {
                    [Sequelize.Op.or]: [
                        Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', '%' + query + '%'),
                        Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('specialty')), 'LIKE', '%' + query + '%')
                    ]
                }
            });
        }

        res.json(trainers); // Devuelve los entrenadores en formato JSON
    } catch (err) {
        res.status(500).json({ error: err.message }); // Envía un mensaje de error en caso de fallo
    }
};

// Crear un nuevo entrenador
exports.createTrainer = async (req, res) => {
    try {
        const newTrainer = await Trainer.create(req.body); // Crea un nuevo entrenador con los datos del cuerpo de la solicitud
        res.redirect('/trainers'); // Redirige a la lista de entrenadores
    } catch (err) {
        res.status(500).json({ error: err.message }); // Envía un mensaje de error en caso de fallo
    }
};

// Obtener un entrenador por ID
exports.getTrainer = async (req, res) => {
    try {
        const trainer = await Trainer.findByPk(req.params.id); // Encuentra un entrenador por su ID
        if (!trainer) return res.status(404).json({ error: 'Trainer not found' }); // Envía un mensaje si el entrenador no se encuentra
        res.render('trainers/show', { trainer }); // Renderiza la vista del entrenador encontrado
    } catch (err) {
        res.status(500).json({ error: err.message }); // Envía un mensaje de error en caso de fallo
    }
};

// Actualizar un entrenador
exports.updateTrainer = async (req, res) => {
    try {
        const trainer = await Trainer.findByPk(req.params.id); // Encuentra un entrenador por su ID
        if (!trainer) return res.status(404).json({ error: 'Trainer not found' }); // Envía un mensaje si el entrenador no se encuentra
        await trainer.update(req.body); // Actualiza el entrenador con los datos del cuerpo de la solicitud
        res.redirect(`/trainers/${trainer.id}`); // Redirige a la vista del entrenador actualizado
    } catch (err) {
        res.status(500).json({ error: err.message }); // Envía un mensaje de error en caso de fallo
    }
};

// Eliminar un entrenador
exports.deleteTrainer = async (req, res) => {
    try {
        const trainer = await Trainer.findByPk(req.params.id); // Encuentra un entrenador por su ID
        if (!trainer) return res.status(404).json({ error: 'Trainer not found' }); // Envía un mensaje si el entrenador no se encuentra
        await trainer.destroy(); // Elimina el entrenador
        res.redirect('/trainers'); // Redirige a la lista de entrenadores
    } catch (err) {
        res.status(500).json({ error: err.message }); // Envía un mensaje de error en caso de fallo
    }
};

// Obtener todos los entrenadores
exports.getAllTrainers = async (req, res) => {
    try {
        const trainers = await Trainer.findAll(); // Obtiene todos los entrenadores
        res.render('trainers/index', { trainers }); // Renderiza la vista de entrenadores, pasando los entrenadores encontrados
    } catch (err) {
        res.status(500).json({ error: err.message }); // Envía un mensaje de error en caso de fallo
    }
};

// Renderizar el formulario para crear un nuevo entrenador
exports.renderNewTrainerForm = (req, res) => {
    res.render('trainers/new'); // Renderiza la vista para crear un nuevo entrenador
};

// Renderizar el formulario para editar un entrenador
exports.renderEditTrainerForm = async (req, res) => {
    try {
        const trainer = await Trainer.findByPk(req.params.id); // Encuentra un entrenador por su ID
        if (!trainer) return res.status(404).json({ error: 'Trainer not found' }); // Envía un mensaje si el entrenador no se encuentra
        res.render('trainers/edit', { trainer }); // Renderiza la vista para editar el entrenador encontrado
    } catch (err) {
        res.status(500).json({ error: err.message }); // Envía un mensaje de error en caso de fallo
    }
};
