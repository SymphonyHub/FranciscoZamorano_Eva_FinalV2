const express = require('express');
const router = express.Router();
const Plan = require('../models/Plan');

// Obtener todos los planes
router.get('/', async (req, res) => {
    try {
        const plans = await Plan.findAll();
        res.render('plans/index', { plans });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Obtener un plan por ID
router.get('/:id', async (req, res) => {
    try {
        const plan = await Plan.findByPk(req.params.id);
        res.render('plans/show', { plan });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Formulario para nuevo plan
router.get('/new', (req, res) => {
    res.render('plans/new');
});

// Crear un nuevo plan
router.post('/', async (req, res) => {
    try {
        await Plan.create(req.body);
        res.redirect('/plans');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Formulario para editar plan
router.get('/:id/edit', async (req, res) => {
    try {
        const plan = await Plan.findByPk(req.params.id);
        res.render('plans/edit', { plan });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Actualizar un plan
router.put('/:id', async (req, res) => {
    try {
        await Plan.update(req.body, { where: { id: req.params.id } });
        res.redirect(`/plans/${req.params.id}`);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Eliminar un plan
router.delete('/:id', async (req, res) => {
    try {
        await Plan.destroy({ where: { id: req.params.id } });
        res.redirect('/plans');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
