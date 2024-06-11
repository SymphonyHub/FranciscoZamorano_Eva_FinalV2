const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// Obtener todas las reservas
router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.findAll();
        res.render('reservations/index', { reservations });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Obtener una reserva por ID
router.get('/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findByPk(req.params.id);
        res.render('reservations/show', { reservation });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Formulario para nueva reserva
router.get('/new', (req, res) => {
    res.render('reservations/new');
});

// Crear una nueva reserva
router.post('/', async (req, res) => {
    try {
        await Reservation.create(req.body);
        res.redirect('/reservations');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Formulario para editar reserva
router.get('/:id/edit', async (req, res) => {
    try {
        const reservation = await Reservation.findByPk(req.params.id);
        res.render('reservations/edit', { reservation });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Actualizar una reserva
router.put('/:id', async (req, res) => {
    try {
        await Reservation.update(req.body, { where: { id: req.params.id } });
        res.redirect(`/reservations/${req.params.id}`);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Eliminar una reserva
router.delete('/:id', async (req, res) => {
    try {
        await Reservation.destroy({ where: { id: req.params.id } });
        res.redirect('/reservations');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
