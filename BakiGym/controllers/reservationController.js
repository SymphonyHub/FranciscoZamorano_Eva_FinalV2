const Reservation = require('../models/Reservation');
const User = require('../models/User');
const Class = require('../models/Class');

// Obtener todas las reservas
exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.findAll({ include: ['User', 'Class'] });
        res.render('reservations/index', { reservations });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Obtener el formulario para crear una nueva reserva
exports.getNewReservationForm = async (req, res) => {
    try {
        const users = await User.findAll();
        const classes = await Class.findAll();
        res.render('reservations/new', { users, classes });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Crear una nueva reserva
exports.createReservation = async (req, res) => {
    try {
        await Reservation.create(req.body);
        res.redirect('/reservations');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Obtener una reserva por ID
exports.getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findByPk(req.params.id, { include: ['User', 'Class'] });
        if (!reservation) {
            return res.status(404).render('reservations/show', { message: 'Reserva no encontrada' });
        }
        res.render('reservations/show', { reservation });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Obtener el formulario para editar una reserva
exports.getEditReservationForm = async (req, res) => {
    try {
        const reservation = await Reservation.findByPk(req.params.id);
        const users = await User.findAll();
        const classes = await Class.findAll();
        if (!reservation) {
            return res.status(404).render('reservations/show', { message: 'Reserva no encontrada' });
        }
        res.render('reservations/edit', { reservation, users, classes });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Actualizar una reserva
exports.updateReservation = async (req, res) => {
    try {
        await Reservation.update(req.body, { where: { id: req.params.id } });
        res.redirect(`/reservations/${req.params.id}`);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Eliminar una reserva
exports.deleteReservation = async (req, res) => {
    try {
        await Reservation.destroy({ where: { id: req.params.id } });
        res.redirect('/reservations');
    } catch (error) {
        res.status(500).send(error.message);
    }
};
