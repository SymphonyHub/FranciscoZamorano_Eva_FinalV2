const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.get('/', reservationController.getAllReservations);
router.get('/new', reservationController.getNewReservationForm);
router.post('/', reservationController.createReservation);
router.get('/:id', reservationController.getReservationById);
router.get('/:id/edit', reservationController.getEditReservationForm);
router.put('/:id', reservationController.updateReservation);
router.delete('/:id', reservationController.deleteReservation);

module.exports = router;
