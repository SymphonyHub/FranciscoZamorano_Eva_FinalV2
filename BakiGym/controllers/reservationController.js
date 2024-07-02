// reservationController.js
const Reservation = require('../models/Reservation'); // Importa el modelo Reservation
const User = require('../models/User'); // Importa el modelo User
const Class = require('../models/Class'); // Importa el modelo Class
const Sequelize = require('sequelize'); // Importa Sequelize

// Función para formatear la fecha en formato YYYY-MM-DD
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
        const reservations = await Reservation.findAll({ include: ['User', 'Class'] }); // Obtiene todas las reservas incluyendo las relaciones con User y Class
        const users = await User.findAll(); // Obtener todos los usuarios
        const classes = await Class.findAll(); // Obtener todas las clases
        reservations.forEach(reservation => {
            reservation.date = formatDate(new Date(reservation.date)); // Formatea la fecha de cada reserva
        });
        res.render('reservations/index', { reservations, users, classes }); // Renderiza la vista de reservas, pasando las reservas, usuarios y clases
    } catch (error) {
        res.status(500).send(error.message); // Envía un mensaje de error en caso de fallo
    }
};

// Obtener el formulario para crear una nueva reserva
exports.getNewReservationForm = async (req, res) => {
    try {
        const users = await User.findAll(); // Obtener todos los usuarios
        const classes = await Class.findAll(); // Obtener todas las clases
        res.render('reservations/new', { users, classes }); // Renderiza la vista para crear una nueva reserva, pasando los usuarios y las clases
    } catch (error) {
        res.status(500).send(error.message); // Envía un mensaje de error en caso de fallo
    }
};

// Crear una nueva reserva
exports.createReservation = async (req, res) => {
    try {
        const { user_id, class_id, date } = req.body; // Obtiene los datos del cuerpo de la solicitud
        const formattedDate = formatDate(new Date(date)); // Formatea la fecha
        await Reservation.create({ user_id, class_id, date: formattedDate }); // Crea una nueva reserva
        res.redirect('/reservations'); // Redirige a la lista de reservas
    } catch (error) {
        res.status(500).send(error.message); // Envía un mensaje de error en caso de fallo
    }
};

// Obtener una reserva por ID
exports.getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findByPk(req.params.id, { include: ['User', 'Class'] }); // Encuentra una reserva por su ID incluyendo las relaciones con User y Class
        if (!reservation) {
            return res.status(404).render('reservations/show', { message: 'Reserva no encontrada' }); // Envía un mensaje si la reserva no se encuentra
        }
        reservation.date = formatDate(new Date(reservation.date)); // Formatea la fecha de la reserva
        res.render('reservations/show', { reservation }); // Renderiza la vista de la reserva encontrada
    } catch (error) {
        res.status(500).send(error.message); // Envía un mensaje de error en caso de fallo
    }
};

// Obtener el formulario para editar una reserva
exports.getEditReservationForm = async (req, res) => {
    try {
        const reservation = await Reservation.findByPk(req.params.id); // Encuentra una reserva por su ID
        const users = await User.findAll(); // Obtener todos los usuarios
        const classes = await Class.findAll(); // Obtener todas las clases
        if (!reservation) {
            return res.status(404).render('reservations/show', { message: 'Reserva no encontrada' }); // Envía un mensaje si la reserva no se encuentra
        }
        reservation.date = formatDate(new Date(reservation.date)); // Formatea la fecha de la reserva
        res.render('reservations/edit', { reservation, users, classes }); // Renderiza la vista para editar la reserva, pasando la reserva, usuarios y clases
    } catch (error) {
        res.status(500).send(error.message); // Envía un mensaje de error en caso de fallo
    }
};

// Actualizar una reserva
exports.updateReservation = async (req, res) => {
    try {
        const { user_id, class_id, date } = req.body; // Obtiene los datos del cuerpo de la solicitud
        const formattedDate = formatDate(new Date(date)); // Formatea la fecha
        await Reservation.update({ user_id, class_id, date: formattedDate }, { where: { id: req.params.id } }); // Actualiza la reserva por su ID
        res.redirect(`/reservations`); // Redirige a la lista de reservas
    } catch (error) {
        res.status(500).send(error.message); // Envía un mensaje de error en caso de fallo
    }
};

// Eliminar una reserva
exports.deleteReservation = async (req, res) => {
    try {
        await Reservation.destroy({ where: { id: req.params.id } }); // Elimina una reserva por su ID
        res.redirect('/reservations'); // Redirige a la lista de reservas
    } catch (error) {
        res.status(500).send(error.message); // Envía un mensaje de error en caso de fallo
    }
};

// Buscar reservas
exports.searchReservations = async (req, res) => {
    try {
        const query = req.query.query ? req.query.query.toLowerCase() : ''; // Obtiene la query de la solicitud y la convierte a minúsculas
        let reservations;

        if (!query) {
            // Si no hay query, devolver todas las reservas
            reservations = await Reservation.findAll({ include: ['User', 'Class'] });
        } else if (!isNaN(query)) {
            // Buscar por ID si el query es un número
            reservations = await Reservation.findAll({
                where: {
                    id: query // Busca las reservas por ID
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
            reservation.date = formatDate(new Date(reservation.date)); // Formatea la fecha de cada reserva
        });

        res.json(reservations); // Devuelve las reservas en formato JSON
    } catch (err) {
        res.status(500).json({ error: err.message }); // Envía un mensaje de error en caso de fallo
    }
};
