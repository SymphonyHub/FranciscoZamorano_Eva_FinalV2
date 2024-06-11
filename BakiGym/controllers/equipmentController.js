const Equipment = require('../models/Equipment');

exports.createEquipment = async (req, res) => {
    try {
        const newEquipment = new Equipment(req.body);
        await newEquipment.save();
        res.status(201).json(newEquipment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getEquipment = async (req, res) => {
    try {
        const equipment = await Equipment.findById(req.params.id);
        if (!equipment) return res.status(404).json({ error: 'Equipment not found' });
        res.status(200).json(equipment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateEquipment = async (req, res) => {
    try {
        const equipment = await Equipment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!equipment) return res.status(404).json({ error: 'Equipment not found' });
        res.status(200).json(equipment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteEquipment = async (req, res) => {
    try {
        const equipment = await Equipment.findByIdAndDelete(req.params.id);
        if (!equipment) return res.status(404).json({ error: 'Equipment not found' });
        res.status(200).json({ message: 'Equipment deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
