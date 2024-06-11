const Reservation = require('../models/Reservation');

exports.createReservation = async (req, res) => {
    try {
        const newReservation = new Reservation(req.body);
        await newReservation.save();
        res.status(201).json(newReservation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) return res.status(404).json({ error: 'Reservation not found' });
        res.status(200).json(reservation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!reservation) return res.status(404).json({ error: 'Reservation not found' });
        res.status(200).json(reservation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!reservation) return res.status(404).json({ error: 'Reservation not found' });
        res.status(200).json({ message: 'Reservation deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
