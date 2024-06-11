const Trainer = require('../models/Trainer');

exports.createTrainer = async (req, res) => {
    try {
        const newTrainer = new Trainer(req.body);
        await newTrainer.save();
        res.status(201).json(newTrainer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTrainer = async (req, res) => {
    try {
        const trainer = await Trainer.findById(req.params.id);
        if (!trainer) return res.status(404).json({ error: 'Trainer not found' });
        res.status(200).json(trainer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateTrainer = async (req, res) => {
    try {
        const trainer = await Trainer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!trainer) return res.status(404).json({ error: 'Trainer not found' });
        res.status(200).json(trainer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteTrainer = async (req, res) => {
    try {
        const trainer = await Trainer.findByIdAndDelete(req.params.id);
        if (!trainer) return res.status(404).json({ error: 'Trainer not found' });
        res.status(200).json({ message: 'Trainer deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
