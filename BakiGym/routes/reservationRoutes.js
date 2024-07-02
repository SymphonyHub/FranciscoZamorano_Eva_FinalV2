// reservationRoutes.js
const express = require('express'); // Importa express
const router = express.Router(); // Crea una nueva instancia de router
const reservationController = require('../controllers/reservationController'); // Importa el controlador de reservas

// Ruta para obtener todas las reservas
router.get('/', reservationController.getAllReservations);

// Ruta para obtener el formulario para crear una nueva reserva
router.get('/new', reservationController.getNewReservationForm);

// Ruta para crear una nueva reserva
router.post('/', reservationController.createReservation);

// Ruta para buscar reservas
router.get('/search', reservationController.searchReservations);

// Ruta para obtener una reserva por ID
router.get('/:id', reservationController.getReservationById);

// Ruta para obtener el formulario para editar una reserva
router.get('/:id/edit', reservationController.getEditReservationForm);

// Ruta para actualizar una reserva por ID
router.put('/:id', reservationController.updateReservation);

// Ruta para eliminar una reserva por ID
router.delete('/:id', reservationController.deleteReservation);

// Exporta el router para que pueda ser usado en otros módulos
module.exports = router;
