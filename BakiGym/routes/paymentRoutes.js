const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');

// Obtener todos los pagos
router.get('/', async (req, res) => {
    try {
        const payments = await Payment.findAll();
        res.render('payments/index', { payments });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Obtener un pago por ID
router.get('/:id', async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id);
        res.render('payments/show', { payment });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Formulario para nuevo pago
router.get('/new', (req, res) => {
    res.render('payments/new');
});

// Crear un nuevo pago
router.post('/', async (req, res) => {
    try {
        await Payment.create(req.body);
        res.redirect('/payments');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Formulario para editar pago
router.get('/:id/edit', async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id);
        res.render('payments/edit', { payment });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Actualizar un pago
router.put('/:id', async (req, res) => {
    try {
        await Payment.update(req.body, { where: { id: req.params.id } });
        res.redirect(`/payments/${req.params.id}`);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Eliminar un pago
router.delete('/:id', async (req, res) => {
    try {
        await Payment.destroy({ where: { id: req.params.id } });
        res.redirect('/payments');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
