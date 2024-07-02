// app.js
const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const { sequelize, connectDB } = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const trainerRoutes = require('./routes/trainerRoutes');
const classRoutes = require('./routes/classRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const planRoutes = require('./routes/planRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const authRoutes = require('./routes/authRoutes'); // Importar las rutas de autenticación

require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

// Configurar la sesión
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Cambiar a true si usas HTTPS
}));

// Middleware para obtener el tema desde las cookies
app.use((req, res, next) => {
  const theme = req.cookies.theme || 'light';
  res.locals.theme = theme;
  res.locals.user = req.session.userId; // Pasar la sesión a las vistas
  next();
});

// Middleware de autenticación
function checkAuth(req, res, next) {
    if (req.session.userId) {
        return next();
    } else {
        res.redirect('/login');
    }
}

connectDB();

app.use('/users', checkAuth, userRoutes);
app.use('/trainers', checkAuth, trainerRoutes);
app.use('/classes', checkAuth, classRoutes);
app.use('/reservations', checkAuth, reservationRoutes);
app.use('/plans', checkAuth, planRoutes);
app.use('/payments', checkAuth, paymentRoutes);
app.use('/equipment', checkAuth, equipmentRoutes);
app.use('/feedback', checkAuth, feedbackRoutes);
app.use(authRoutes); // Usar las rutas de autenticación

app.get('/home', checkAuth, (req, res) => {
    res.render('home', { title: 'Bienvenido a BakiGym' });
});

app.get('/about', checkAuth, (req, res) => {
    res.render('about', { title: 'Sobre BakiGym' });
});

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
