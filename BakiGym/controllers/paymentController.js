const { Payment, User, Plan } = require('../models'); // Importa los modelos Payment, User y Plan
const puppeteer = require('puppeteer'); // Importa Puppeteer para la generación de PDFs
const path = require('path'); // Importa path para manejar rutas de archivos

// Obtener todos los pagos
exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.findAll({
            include: [
                { model: User, as: 'PaymentUser' }, // Incluye la relación con el modelo User
                { model: Plan, as: 'PaymentPlan' }  // Incluye la relación con el modelo Plan
            ]
        });
        res.render('payments/index', { payments }); // Renderiza la vista de pagos, pasando los pagos encontrados
    } catch (error) {
        res.status(500).json({ error: { message: error.message } }); // Envía un mensaje de error en caso de fallo
    }
};

// Crear un nuevo pago
exports.createPayment = async (req, res) => {
    try {
        const { userId, paymentMethod, planId } = req.body; // Obtiene los datos del cuerpo de la solicitud

        const plan = await Plan.findByPk(planId); // Encuentra el plan por su ID
        const user = await User.findByPk(userId); // Encuentra el usuario por su ID

        if (!plan || !user) {
            throw new Error('Plan o Usuario no encontrado'); // Lanza un error si el plan o el usuario no se encuentran
        }

        const payment = await Payment.create({
            user_id: userId,          // ID del usuario
            plan_id: plan.id,         // ID del plan
            amount: plan.price,       // Precio del plan
            date: new Date(),         // Fecha actual
            payment_method: paymentMethod // Método de pago
        });

        // HTML para el recibo de pago
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

        // Lanza el navegador Puppeteer
        const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
        
        try {
            await page.setContent(html, { waitUntil: 'networkidle0' }); // Establece el contenido HTML
            const pdfPath = path.join(__dirname, '..', 'public', 'invoices', `invoice_${payment.id}.pdf`); // Ruta del PDF
            await page.pdf({ path: pdfPath, format: 'A4' }); // Genera el PDF

            await browser.close(); // Cierra el navegador

            // Redirige al usuario al PDF
            res.redirect(`/invoices/invoice_${payment.id}.pdf`);
        } catch (pdfError) {
            console.error('Error al generar el PDF:', pdfError); // Muestra un error si no se puede generar el PDF
            await browser.close(); // Cierra el navegador en caso de error
            res.status(500).json({ error: { message: 'Error al generar el PDF' } }); // Envía un mensaje de error en caso de fallo
        }

    } catch (error) {
        console.error('Error en createPayment:', error); // Muestra un error en la consola
        res.status(500).json({ error: { message: error.message } }); // Envía un mensaje de error en caso de fallo
    }
};
