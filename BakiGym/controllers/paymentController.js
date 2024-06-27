const { Payment, User, Plan } = require('../models');
const puppeteer = require('puppeteer');
const path = require('path');

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

exports.createPayment = async (req, res) => {
    try {
        const { userId, paymentMethod, planId } = req.body;

        const plan = await Plan.findByPk(planId);
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

        const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
        
        try {
            await page.setContent(html, { waitUntil: 'networkidle0' });
            const pdfPath = path.join(__dirname, '..', 'public', 'invoices', `invoice_${payment.id}.pdf`);
            await page.pdf({ path: pdfPath, format: 'A4' });

            await browser.close();

            // Redirigir al usuario al PDF
            res.redirect(`/invoices/invoice_${payment.id}.pdf`);
        } catch (pdfError) {
            console.error('Error al generar el PDF:', pdfError);
            await browser.close();
            res.status(500).json({ error: { message: 'Error al generar el PDF' } });
        }

    } catch (error) {
        console.error('Error en createPayment:', error);
        res.status(500).json({ error: { message: error.message } });
    }
};
