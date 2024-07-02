// classController.js
const { Class, Trainer } = require('../models'); // Importa los modelos Class y Trainer
const Sequelize = require('sequelize'); // Importa Sequelize

// Obtener todas las clases
exports.getAllClasses = async (req, res) => {
    try {
        const classes = await Class.findAll({
            include: [{ model: Trainer, as: 'Trainer' }] // Incluye la relación con el modelo Trainer
        });
        const trainers = await Trainer.findAll();  // Obtener todos los entrenadores
        res.render('classes/index', { classes, trainers });  // Renderiza la vista de clases, pasando las clases y entrenadores
    } catch (error) {
        res.status(500).send(error.message); // Muestra un mensaje de error en caso de fallo
    }
};

// Obtener el formulario para crear una nueva clase
exports.getNewClassForm = async (req, res) => {
    try {
        const trainers = await Trainer.findAll(); // Obtener todos los entrenadores
        res.render('classes/new', { trainers }); // Renderiza la vista para crear una nueva clase, pasando los entrenadores
    } catch (error) {
        res.status(500).send(error.message); // Muestra un mensaje de error en caso de fallo
    }
};

// Crear una nueva clase
exports.createClass = async (req, res) => {
    try {
        await Class.create(req.body); // Crea una nueva clase con los datos del cuerpo de la solicitud
        res.redirect('/classes'); // Redirige a la lista de clases
    } catch (error) {
        res.status(500).send(error.message); // Muestra un mensaje de error en caso de fallo
    }
};

// Obtener una clase por ID
exports.getClassById = async (req, res) => {
    try {
        const classItem = await Class.findByPk(req.params.id, { include: { model: Trainer, as: 'Trainer' } }); // Busca una clase por su ID, incluyendo la relación con el modelo Trainer
        if (!classItem) {
            return res.status(404).render('classes/show', { message: 'Clase no encontrada' }); // Muestra un mensaje si la clase no se encuentra
        }
        res.render('classes/show', { classItem }); // Renderiza la vista de la clase encontrada
    } catch (error) {
        res.status(500).send(error.message); // Muestra un mensaje de error en caso de fallo
    }
};

// Obtener el formulario para editar una clase
exports.getEditClassForm = async (req, res) => {
    try {
        const classItem = await Class.findByPk(req.params.id); // Busca una clase por su ID
        const trainers = await Trainer.findAll(); // Obtener todos los entrenadores
        if (!classItem) {
            return res.status(404).render('classes/show', { message: 'Clase no encontrada' }); // Muestra un mensaje si la clase no se encuentra
        }
        res.render('classes/edit', { classItem, trainers }); // Renderiza la vista para editar una clase, pasando la clase y los entrenadores
    } catch (error) {
        res.status(500).send(error.message); // Muestra un mensaje de error en caso de fallo
    }
};

// Actualizar una clase
exports.updateClass = async (req, res) => {
    try {
        await Class.update(req.body, { where: { id: req.params.id } }); // Actualiza una clase con los datos del cuerpo de la solicitud
        res.redirect(`/classes/${req.params.id}`); // Redirige a la vista de la clase actualizada
    } catch (error) {
        res.status(500).send(error.message); // Muestra un mensaje de error en caso de fallo
    }
};

// Eliminar una clase
exports.deleteClass = async (req, res) => {
    try {
        await Class.destroy({ where: { id: req.params.id } }); // Elimina una clase por su ID
        res.redirect('/classes'); // Redirige a la lista de clases
    } catch (error) {
        res.status(500).send(error.message); // Muestra un mensaje de error en caso de fallo
    }
};

// Buscar clases por ID o Nombre
exports.searchClasses = async (req, res) => {
    try {
        const query = req.query.query ? req.query.query.toLowerCase() : ''; // Obtiene la query de la solicitud y la convierte a minúsculas
        let classes;

        if (!query) {
            // Si no hay query, devolver todas las clases
            classes = await Class.findAll({ include: [{ model: Trainer, as: 'Trainer' }] });
        } else if (!isNaN(query)) {
            // Buscar por ID si el query es un número
            classes = await Class.findAll({
                where: {
                    id: query // Busca las clases por ID
                },
                include: [{ model: Trainer, as: 'Trainer' }]
            });
        } else {
            // Buscar por nombre si el query no es un número
            classes = await Class.findAll({
                where: {
                    name: {
                        [Sequelize.Op.like]: '%' + query + '%' // Busca las clases cuyo nombre coincida parcialmente con la query
                    }
                },
                include: [{ model: Trainer, as: 'Trainer' }]
            });
        }

        res.json(classes); // Devuelve las clases en formato JSON
    } catch (err) {
        res.status(500).json({ error: err.message }); // Muestra un mensaje de error en caso de fallo
    }
};
