const express = require('express');
const methodOverride = require('method-override');
const { sequelize, connectDB } = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const trainerRoutes = require('./routes/trainerRoutes');
const classRoutes = require('./routes/classRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const planRoutes = require('./routes/planRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

require('dotenv').config();

const app = express();

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

connectDB();

// Usar rutas
app.use('/users', userRoutes);
app.use('/trainers', trainerRoutes);
app.use('/classes', classRoutes);
app.use('/reservations', reservationRoutes);
app.use('/plans', planRoutes);
app.use('/payments', paymentRoutes);
app.use('/equipments', equipmentRoutes);
app.use('/feedback', feedbackRoutes);

// Rutas públicas
app.get('/home', (req, res) => {
    res.render('home', { title: 'Bienvenido a BakiGym' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'Sobre BakiGym' });
});

// Manejo de errores HTTP
app.use((req, res, next) => {
    const error = new Error('NO SE ENCUENTRA');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
});

const PORT = process.env.PORT || 5000;
sequelize.sync({ force: false }).then(() => {
    console.log('Servidor conectado y funcionando!');
    app.listen(PORT, () => console.log(`Servidor funcionando en el Puerto: ${PORT}`));
});
