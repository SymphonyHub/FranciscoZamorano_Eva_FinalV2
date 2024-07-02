const express = require('express'); // Importa express
const router = express.Router(); // Crea una nueva instancia de router
const paymentController = require('../controllers/paymentController'); // Importa el controlador de pagos

// Ruta para obtener todos los pagos
router.get('/', paymentController.getAllPayments);

// Ruta para crear un nuevo pago
router.post('/create', paymentController.createPayment);

// Exporta el router para que pueda ser usado en otros módulos
module.exports = router;
