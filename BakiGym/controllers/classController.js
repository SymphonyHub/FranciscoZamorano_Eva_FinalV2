const { Class, Trainer } = require('../models');

// Obtener todas las clases
exports.getAllClasses = async (req, res) => {
    try {
        const classes = await Class.findAll({
            include: [{ model: Trainer, as: 'Trainer' }]
        });
        const trainers = await Trainer.findAll();  // Obtener todos los entrenadores
        res.render('classes/index', { classes, trainers });  // Pasar entrenadores a la vista
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Obtener el formulario para crear una nueva clase
exports.getNewClassForm = async (req, res) => {
    try {
        const trainers = await Trainer.findAll();
        res.render('classes/new', { trainers });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Crear una nueva clase
exports.createClass = async (req, res) => {
    try {
        await Class.create(req.body);
        res.redirect('/classes');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Obtener una clase por ID
exports.getClassById = async (req, res) => {
    try {
        const classItem = await Class.findByPk(req.params.id, { include: { model: Trainer, as: 'Trainer' } });
        if (!classItem) {
            return res.status(404).render('classes/show', { message: 'Clase no encontrada' });
        }
        res.render('classes/show', { classItem });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Obtener el formulario para editar una clase
exports.getEditClassForm = async (req, res) => {
    try {
        const classItem = await Class.findByPk(req.params.id);
        const trainers = await Trainer.findAll();
        if (!classItem) {
            return res.status(404).render('classes/show', { message: 'Clase no encontrada' });
        }
        res.render('classes/edit', { classItem, trainers });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Actualizar una clase
exports.updateClass = async (req, res) => {
    try {
        await Class.update(req.body, { where: { id: req.params.id } });
        res.redirect(`/classes/${req.params.id}`);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Eliminar una clase
exports.deleteClass = async (req, res) => {
    try {
        await Class.destroy({ where: { id: req.params.id } });
        res.redirect('/classes');
    } catch (error) {
        res.status(500).send(error.message);
    }
};
