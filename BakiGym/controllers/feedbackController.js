const { Feedback, User } = require('../models');

exports.getAllFeedback = async (req, res) => {
    try {
        const feedbacks = await Feedback.findAll({
            include: [{ model: User, as: 'User' }]
        });
        res.render('feedback/index', { feedbacks });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getFeedbackById = async (req, res) => {
    try {
        const feedback = await Feedback.findByPk(req.params.id, {
            include: [{ model: User, as: 'User' }]
        });
        if (!feedback) {
            return res.status(404).send('Feedback not found');
        }
        res.render('feedback/show', { feedback });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createFeedback = async (req, res) => {
    try {
        await Feedback.create(req.body);
        res.redirect('/feedback');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findByPk(req.params.id);
        if (!feedback) {
            return res.status(404).send('Feedback not found');
        }
        await feedback.update(req.body);
        res.redirect(`/feedback/${feedback.id}`);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findByPk(req.params.id);
        if (!feedback) {
            return res.status(404).send('Feedback not found');
        }
        await feedback.destroy();
        res.redirect('/feedback');
    } catch (error) {
        res.status(500).send(error.message);
    }
};
