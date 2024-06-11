const Plan = require('../models/Plan');

exports.createPlan = async (req, res) => {
    try {
        const newPlan = new Plan(req.body);
        await newPlan.save();
        res.status(201).json(newPlan);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getPlan = async (req, res) => {
    try {
        const plan = await Plan.findById(req.params.id);
        if (!plan) return res.status(404).json({ error: 'Plan not found' });
        res.status(200).json(plan);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updatePlan = async (req, res) => {
    try {
        const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!plan) return res.status(404).json({ error: 'Plan not found' });
        res.status(200).json(plan);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deletePlan = async (req, res) => {
    try {
        const plan = await Plan.findByIdAndDelete(req.params.id);
        if (!plan) return res.status(404).json({ error: 'Plan not found' });
        res.status(200).json({ message: 'Plan deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
