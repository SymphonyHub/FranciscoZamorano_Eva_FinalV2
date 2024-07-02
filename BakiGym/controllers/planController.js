// controllers/planController.js
const { Plan, Payment, User } = require('../models'); // Asegúrate de incluir User

// Función para obtener todos los planes
exports.getAllPlans = async (req, res) => {
    try {
        const plans = await Plan.findAll(); // Obtener todos los planes
        const users = await User.findAll(); // Obtener todos los usuarios

        // Formatear los planes para que el precio sea un número flotante
        const formattedPlans = plans.map(plan => ({
            ...plan.toJSON(),
            price: parseFloat(plan.price)
        }));

        res.render('plans/index', { plans: formattedPlans, users }); // Renderiza la vista de planes, pasando los planes y usuarios
    } catch (error) {
        res.status(500).send(error.message); // Envía un mensaje de error en caso de fallo
    }
};

// Crear un nuevo plan
exports.createPlan = async (req, res) => {
    try {
        const { name, price, duration } = req.body; // Obtiene los datos del cuerpo de la solicitud
        await Plan.create({
            name,
            price: parseFloat(price), // Convierte el precio a número flotante
            duration: parseInt(duration, 10) // Convierte la duración a entero
        });
        res.redirect('/plans'); // Redirige a la lista de planes
    } catch (error) {
        res.status(500).send(error.message); // Envía un mensaje de error en caso de fallo
    }
};

// Actualizar un plan existente
exports.updatePlan = async (req, res) => {
    try {
        const { name, price, duration } = req.body; // Obtiene los datos del cuerpo de la solicitud
        await Plan.update({
            name,
            price: parseFloat(price), // Convierte el precio a número flotante
            duration: parseInt(duration, 10) // Convierte la duración a entero
        }, { where: { id: req.params.id } });
        res.redirect('/plans'); // Redirige a la lista de planes
    } catch (error) {
        res.status(500).send(error.message); // Envía un mensaje de error en caso de fallo
    }
};

// Eliminar un plan existente
exports.deletePlan = async (req, res) => {
    try {
        const planId = req.params.id;
        
        // Eliminar pagos asociados
        await Payment.destroy({ where: { plan_id: planId } });
        
        // Eliminar el plan
        await Plan.destroy({ where: { id: planId } });
        
        res.redirect('/plans'); // Redirige a la lista de planes
    } catch (error) {
        res.status(500).send(error.message); // Envía un mensaje de error en caso de fallo
    }
};

// Generar un pago para un plan
exports.generatePayment = async (req, res) => {
    try {
        const { userId, paymentMethod, planId } = req.body; // Obtiene los datos del cuerpo de la solicitud
        const plan = await Plan.findByPk(planId); // Encuentra el plan por su ID
        const user = await User.findByPk(userId); // Encuentra el usuario por su ID

        if (!plan || !user) {
            throw new Error('Plan o Usuario no encontrado'); // Lanza un error si el plan o el usuario no se encuentran
        }

        const payment = await Payment.create({
            user_id: userId,
            plan_id: plan.id,
            amount: plan.price,
            date: new Date(),
            payment_method: paymentMethod
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

        const browser = await puppeteer.launch(); // Lanza el navegador Puppeteer
        const page = await browser.newPage(); // Abre una nueva página en el navegador
        await page.setContent(html); // Establece el contenido HTML
        const pdfPath = path.join(__dirname, '..', 'public', 'invoices', `invoice_${payment.id}.pdf`); // Ruta del PDF
        await page.pdf({ path: pdfPath, format: 'A4' }); // Genera el PDF
        await browser.close(); // Cierra el navegador

        res.download(pdfPath); // Descarga el PDF

    } catch (error) {
        res.status(500).send(error.message); // Envía un mensaje de error en caso de fallo
    }
};

// Renderizar el formulario para editar un plan
exports.renderEditPlanForm = async (req, res) => {
    try {
        const plan = await Plan.findByPk(req.params.id); // Encuentra el plan por su ID
        if (!plan) {
            return res.status(404).send('Plan no encontrado'); // Envía un mensaje si el plan no se encuentra
        }
        res.render('plans/edit', { plan }); // Renderiza la vista para editar el plan encontrado
    } catch (error) {
        res.status(500).send(error.message); // Envía un mensaje de error en caso de fallo
    }
};
