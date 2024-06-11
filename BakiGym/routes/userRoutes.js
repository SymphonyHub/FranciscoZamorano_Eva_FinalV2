const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Feedback = require('../models/Feedback');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.render('users/index', { users });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Obtener un usuario por ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        res.render('users/show', { user });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Formulario para nuevo usuario
router.get('/new', (req, res) => {
    res.render('users/new');
});

// Crear un nuevo usuario
router.post('/', async (req, res) => {
    try {
        await User.create(req.body);
        res.redirect('/users');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Formulario para editar usuario
router.get('/:id/edit', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        res.render('users/edit', { user });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Actualizar un usuario
router.put('/:id', async (req, res) => {
    try {
        await User.update(req.body, { where: { id: req.params.id } });
        res.redirect(`/users/${req.params.id}`);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Eliminar un usuario
router.delete('/:id', async (req, res) => {
    try {
        // Eliminar registros asociados en feedback primero
        await Feedback.destroy({ where: { user_id: req.params.id } });
        await User.destroy({ where: { id: req.params.id } });
        res.redirect('/users');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
