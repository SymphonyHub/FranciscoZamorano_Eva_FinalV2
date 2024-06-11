const Feedback = require('../models/Feedback');

exports.createFeedback = async (req, res) => {
    try {
        const newFeedback = new Feedback(req.body);
        await newFeedback.save();
        res.status(201).json(newFeedback);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        if (!feedback) return res.status(404).json({ error: 'Feedback not found' });
        res.status(200).json(feedback);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!feedback) return res.status(404).json({ error: 'Feedback not found' });
        res.status(200).json(feedback);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndDelete(req.params.id);
        if (!feedback) return res.status(404).json({ error: 'Feedback not found' });
        res.status(200).json({ message: 'Feedback deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
