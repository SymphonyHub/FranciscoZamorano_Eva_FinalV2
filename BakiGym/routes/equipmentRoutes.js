const express = require('express');
const router = express.Router();
const Equipment = require('../models/Equipment');

// Obtener todos los equipos
router.get('/', async (req, res) => {
    try {
        const equipments = await Equipment.findAll();
        res.render('equipments/index', { equipments });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Obtener un equipo por ID
router.get('/:id', async (req, res) => {
    try {
        const equipment = await Equipment.findByPk(req.params.id);
        res.render('equipments/show', { equipment });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Formulario para nuevo equipo
router.get('/new', (req, res) => {
    res.render('equipments/new');
});

// Crear un nuevo equipo
router.post('/', async (req, res) => {
    try {
        await Equipment.create(req.body);
        res.redirect('/equipments');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Formulario para editar equipo
router.get('/:id/edit', async (req, res) => {
    try {
        const equipment = await Equipment.findByPk(req.params.id);
        res.render('equipments/edit', { equipment });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Actualizar un equipo
router.put('/:id', async (req, res) => {
    try {
        await Equipment.update(req.body, { where: { id: req.params.id } });
        res.redirect(`/equipments/${req.params.id}`);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Eliminar un equipo
router.delete('/:id', async (req, res) => {
    try {
        await Equipment.destroy({ where: { id: req.params.id } });
        res.redirect('/equipments');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
