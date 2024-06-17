const { Payment, User, Plan } = require('../models');

exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.findAll({
            include: [
                { model: User, as: 'PaymentUser' },
                { model: Plan, as: 'PaymentPlan' }
            ]
        });
        res.render('payments/index', { payments });
    } catch (error) {
        res.status(500).json({ error: { message: error.message } });
    }
};
