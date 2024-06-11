const express = require('express');
const router = express.Router();
const Class = require('../models/Class');

// Obtener todas las clases
router.get('/', async (req, res) => {
    try {
        const classes = await Class.findAll();
        res.render('classes/index', { classes });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Obtener una clase por ID
router.get('/:id', async (req, res) => {
    try {
        const classItem = await Class.findByPk(req.params.id);
        res.render('classes/show', { classItem });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Formulario para nueva clase
router.get('/new', (req, res) => {
    res.render('classes/new');
});

// Crear una nueva clase
router.post('/', async (req, res) => {
    try {
        await Class.create(req.body);
        res.redirect('/classes');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Formulario para editar clase
router.get('/:id/edit', async (req, res) => {
    try {
        const classItem = await Class.findByPk(req.params.id);
        res.render('classes/edit', { classItem });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Actualizar una clase
router.put('/:id', async (req, res) => {
    try {
        await Class.update(req.body, { where: { id: req.params.id } });
        res.redirect(`/classes/${req.params.id}`);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Eliminar una clase
router.delete('/:id', async (req, res) => {
    try {
        await Class.destroy({ where: { id: req.params.id } });
        res.redirect('/classes');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
