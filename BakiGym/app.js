// Importación de módulos necesarios
const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const morgan = require('morgan'); // Importar morgan para registro de solicitudes HTTP
const { sequelize, connectDB } = require('./config/database');

// Importación de rutas
const userRoutes = require('./routes/userRoutes');
const trainerRoutes = require('./routes/trainerRoutes');
const classRoutes = require('./routes/classRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const planRoutes = require('./routes/planRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const authRoutes = require('./routes/authRoutes'); // Rutas de autenticación

// Cargar variables de entorno
require('dotenv').config();

const app = express();

// Configuración del motor de plantillas y la carpeta de vistas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Middlewares para análisis de solicitudes y manejo de formularios
app.use(morgan('dev')); // Usar morgan para registrar las solicitudes HTTP
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method')); // Soporte para otros métodos HTTP como PUT y DELETE
app.use(cookieParser()); // Parseo de cookies
app.use(express.static(__dirname + '/public')); // Servir archivos estáticos

// Configuración de la sesión
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Cambiar a true si usas HTTPS
}));

// Middleware para obtener el tema desde las cookies y pasar la sesión a las vistas
app.use((req, res, next) => {
  const theme = req.cookies.theme || 'light';
  res.locals.theme = theme;
  res.locals.user = req.session.userId;
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

// Conexión a la base de datos
connectDB();

// Uso de las rutas con autenticación requerida
app.use('/users', checkAuth, userRoutes);
app.use('/trainers', checkAuth, trainerRoutes);
app.use('/classes', checkAuth, classRoutes);
app.use('/reservations', checkAuth, reservationRoutes);
app.use('/plans', checkAuth, planRoutes);
app.use('/payments', checkAuth, paymentRoutes);
app.use('/equipment', checkAuth, equipmentRoutes);
app.use('/feedback', checkAuth, feedbackRoutes);
app.use(authRoutes); // Rutas de autenticación

// Rutas para páginas principales
app.get('/home', checkAuth, (req, res) => {
    res.render('home', { title: 'Bienvenido a BakiGym' });
});

app.get('/about', checkAuth, (req, res) => {
    res.render('about', { title: 'Sobre BakiGym' });
});

// Manejo de errores 404
app.use((req, res, next) => {
    const error = new Error('NO SE ENCUENTRA');
    error.status = 404;
    next(error);
});

// Manejo de otros errores
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
});

// Configuración del puerto y sincronización con la base de datos
const PORT = process.env.PORT || 5000;
sequelize.sync({ force: false }).then(() => {
    console.log('Servidor conectado y funcionando!');
    app.listen(PORT, () => console.log(`Servidor funcionando en el Puerto: ${PORT}`));
});
