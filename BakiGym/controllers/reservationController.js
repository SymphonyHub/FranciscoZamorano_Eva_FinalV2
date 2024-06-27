// reservationController.js
const Reservation = require('../models/Reservation');
const User = require('../models/User');
const Class = require('../models/Class');
const Sequelize = require('sequelize');

// Formatear la fecha para que sea YYYY-MM-DD
const formatDate = (date) => {
    if (date instanceof Date && !isNaN(date)) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    return date;
};

// Obtener todas las reservas
exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.findAll({ include: ['User', 'Class'] });
        const users = await User.findAll();
        const classes = await Class.findAll();
        reservations.forEach(reservation => {
            reservation.date = formatDate(new Date(reservation.date));
        });
        res.render('reservations/index', { reservations, users, classes });
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
        const { user_id, class_id, date } = req.body;
        const formattedDate = formatDate(new Date(date));
        await Reservation.create({ user_id, class_id, date: formattedDate });
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
        reservation.date = formatDate(new Date(reservation.date));
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
        reservation.date = formatDate(new Date(reservation.date));
        res.render('reservations/edit', { reservation, users, classes });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Actualizar una reserva
exports.updateReservation = async (req, res) => {
    try {
        const { user_id, class_id, date } = req.body;
        const formattedDate = formatDate(new Date(date));
        await Reservation.update({ user_id, class_id, date: formattedDate }, { where: { id: req.params.id } });
        res.redirect(`/reservations`);
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

// Buscar reservas
exports.searchReservations = async (req, res) => {
    try {
        const query = req.query.query ? req.query.query.toLowerCase() : '';
        let reservations;

        if (!query) {
            // Si no hay query, devolver todas las reservas
            reservations = await Reservation.findAll({ include: ['User', 'Class'] });
        } else if (!isNaN(query)) {
            // Buscar por ID si el query es un número
            reservations = await Reservation.findAll({
                where: {
                    id: query
                },
                include: ['User', 'Class']
            });
        } else {
            // Buscar por nombre si el query no es un número
            reservations = await Reservation.findAll({
                where: {
                    [Sequelize.Op.or]: [
                        Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('User.name')), 'LIKE', '%' + query + '%'),
                        Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('Class.name')), 'LIKE', '%' + query + '%')
                    ]
                },
                include: ['User', 'Class']
            });
        }

        reservations.forEach(reservation => {
            reservation.date = formatDate(new Date(reservation.date));
        });

        res.json(reservations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
