const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// Obtener todos los comentarios
router.get('/', async (req, res) => {
    try {
        const feedbacks = await Feedback.findAll();
        res.render('feedback/index', { feedbacks });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Obtener un comentario por ID
router.get('/:id', async (req, res) => {
    try {
        const feedback = await Feedback.findByPk(req.params.id);
        res.render('feedback/show', { feedback });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Formulario para nuevo comentario
router.get('/new', (req, res) => {
    res.render('feedback/new');
});

// Crear un nuevo comentario
router.post('/', async (req, res) => {
    try {
        await Feedback.create(req.body);
        res.redirect('/feedback');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Formulario para editar comentario
router.get('/:id/edit', async (req, res) => {
    try {
        const feedback = await Feedback.findByPk(req.params.id);
        res.render('feedback/edit', { feedback });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Actualizar un comentario
router.put('/:id', async (req, res) => {
    try {
        await Feedback.update(req.body, { where: { id: req.params.id } });
        res.redirect(`/feedback/${req.params.id}`);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Eliminar un comentario
router.delete('/:id', async (req, res) => {
    try {
        await Feedback.destroy({ where: { id: req.params.id } });
        res.redirect('/feedback');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
