const express = require('express');
const router = express.Router();
const Trainer = require('../models/Trainer');

// Obtener todos los entrenadores
router.get('/', async (req, res) => {
    try {
        const trainers = await Trainer.findAll();
        res.render('trainers/index', { trainers });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Obtener un entrenador por ID
router.get('/:id', async (req, res) => {
    try {
        const trainer = await Trainer.findByPk(req.params.id);
        res.render('trainers/show', { trainer });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Formulario para nuevo entrenador
router.get('/new', (req, res) => {
    res.render('trainers/new');
});

// Crear un nuevo entrenador
router.post('/', async (req, res) => {
    try {
        await Trainer.create(req.body);
        res.redirect('/trainers');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Formulario para editar entrenador
router.get('/:id/edit', async (req, res) => {
    try {
        const trainer = await Trainer.findByPk(req.params.id);
        res.render('trainers/edit', { trainer });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Actualizar un entrenador
router.put('/:id', async (req, res) => {
    try {
        await Trainer.update(req.body, { where: { id: req.params.id } });
        res.redirect(`/trainers/${req.params.id}`);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Eliminar un entrenador
router.delete('/:id', async (req, res) => {
    try {
        await Trainer.destroy({ where: { id: req.params.id } });
        res.redirect('/trainers');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
