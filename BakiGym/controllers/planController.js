const puppeteer = require('puppeteer');
const path = require('path');
const { Plan, User, Payment } = require('../models');

exports.getAllPlans = async (req, res) => {
    try {
        const plans = await Plan.findAll();
        const users = await User.findAll();
        
        // Convertir plan.price a número
        const formattedPlans = plans.map(plan => ({
            ...plan.toJSON(),
            price: parseFloat(plan.price)
        }));

        res.render('plans/index', { plans: formattedPlans, users });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createPlan = async (req, res) => {
    try {
        const { name, price, duration } = req.body;
        await Plan.create({
            name,
            price: parseFloat(price), // Asegurar que price sea numérico
            duration: parseInt(duration, 10)
        });
        res.redirect('/plans');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updatePlan = async (req, res) => {
    try {
        const { name, price, duration } = req.body;
        await Plan.update({
            name,
            price: parseFloat(price), // Asegurar que price sea numérico
            duration: parseInt(duration, 10)
        }, { where: { id: req.params.id } });
        res.redirect('/plans');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deletePlan = async (req, res) => {
    try {
        await Plan.destroy({ where: { id: req.params.id } });
        res.redirect('/plans');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.generatePayment = async (req, res) => {
    try {
        const { userId, paymentMethod } = req.body;
        const plan = await Plan.findByPk(req.params.id);
        const user = await User.findByPk(userId);

        if (!plan || !user) {
            throw new Error('Plan o Usuario no encontrado');
        }

        const payment = await Payment.create({
            user_id: userId,
            plan_id: plan.id,
            amount: plan.price,
            date: new Date(),
            payment_method: paymentMethod
        });

        const html = `
            <h1>Recibo de Pago</h1>
            <p>Nombre del Plan: ${plan.name}</p>
            <p>Precio: $${plan.price}</p>
            <p>Duración: ${plan.duration} días</p>
            <p>Usuario: ${user.name}</p>
            <p>Email: ${user.email}</p>
            <p>Método de Pago: ${paymentMethod}</p>
            <p>Fecha: ${new Date().toLocaleDateString()}</p>
        `;

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(html);
        const pdfPath = path.join(__dirname, '..', 'public', 'invoices', `invoice_${payment.id}.pdf`);
        await page.pdf({ path: pdfPath, format: 'A4' });
        await browser.close();

        res.download(pdfPath);

    } catch (error) {
        res.status(500).send(error.message);
    }
};
