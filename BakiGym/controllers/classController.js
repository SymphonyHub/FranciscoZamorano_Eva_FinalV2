const Class = require('../models/Class');

exports.createClass = async (req, res) => {
    try {
        const newClass = new Class(req.body);
        await newClass.save();
        res.status(201).json(newClass);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getClass = async (req, res) => {
    try {
        const classData = await Class.findById(req.params.id);
        if (!classData) return res.status(404).json({ error: 'Class not found' });
        res.status(200).json(classData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateClass = async (req, res) => {
    try {
        const classData = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!classData) return res.status(404).json({ error: 'Class not found' });
        res.status(200).json(classData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteClass = async (req, res) => {
    try {
        const classData = await Class.findByIdAndDelete(req.params.id);
        if (!classData) return res.status(404).json({ error: 'Class not found' });
        res.status(200).json({ message: 'Class deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
