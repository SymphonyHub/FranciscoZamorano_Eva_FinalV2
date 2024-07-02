// controllers/userController.js
const bcrypt = require('bcrypt'); // Importa bcrypt para encriptar contraseñas
const { User } = require('../models'); // Importa el modelo User
const Sequelize = require('sequelize'); // Importa Sequelize

// Buscar usuarios
exports.searchUsers = async (req, res) => {
    try {
        const query = req.query.query.toLowerCase(); // Obtiene la query de la solicitud y la convierte a minúsculas
        const users = await User.findAll({
            where: {
                [Sequelize.Op.or]: [
                    Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', '%' + query + '%'), // Busca por nombre
                    { id: query } // Busca por ID
                ]
            }
        });
        res.render('users/index', { users }); // Renderiza la vista de usuarios, pasando los usuarios encontrados
    } catch (err) {
        res.status(500).json({ error: err.message }); // Envía un mensaje de error en caso de fallo
    }
};

// Registro de usuario
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body; // Obtiene los datos del cuerpo de la solicitud

        // Verificar que todos los campos estén presentes
        if (!name || !email || !password) {
            return res.status(400).render('login_register/register', { error: 'Todos los campos son obligatorios' }); // Envía un mensaje de error si faltan campos
        }

        // Verificar que el email no esté ya registrado
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).render('login_register/register', { error: 'El email ya está registrado' }); // Envía un mensaje de error si el email ya está registrado
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10); // Encripta la contraseña

        // Crear el nuevo usuario
        const user = await User.create({ name, email, password: hashedPassword });
        res.redirect('/login'); // Redirige a la página de login
    } catch (err) {
        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).render('login_register/register', { error: 'Error de validación: ' + err.message }); // Envía un mensaje de error de validación
        }
        res.status(500).json({ error: err.message }); // Envía un mensaje de error en caso de fallo
    }
};

// Login de usuario
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body; // Obtiene los datos del cuerpo de la solicitud
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).render('login_register/login', { error: 'Usuario no encontrado' }); // Envía un mensaje de error si el usuario no se encuentra
        }

        const match = await bcrypt.compare(password, user.password); // Compara la contraseña ingresada con la encriptada
        if (!match) {
            return res.status(400).render('login_register/login', { error: 'Contraseña incorrecta' }); // Envía un mensaje de error si la contraseña no coincide
        }

        req.session.userId = user.id; // Guarda el ID del usuario en la sesión
        res.redirect('/home'); // Redirige a la página de inicio
    } catch (err) {
        res.status(500).json({ error: err.message }); // Envía un mensaje de error en caso de fallo
    }
};

// Logout de usuario
exports.logout = (req, res) => {
    req.session.destroy(err => { // Destruye la sesión del usuario
        if (err) {
            return res.redirect('/home'); // Redirige a la página de inicio en caso de error
        }
        res.clearCookie('sid'); // Limpia la cookie de sesión
        res.redirect('/login'); // Redirige a la página de login
    });
};

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body); // Crea un nuevo usuario con los datos del cuerpo de la solicitud
        res.redirect('/users'); // Redirige a la lista de usuarios
    } catch (err) {
        res.status(500).json({ error: err.message }); // Envía un mensaje de error en caso de fallo
    }
};

// Obtener un usuario por ID
exports.getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id); // Encuentra un usuario por su ID
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' }); // Envía un mensaje si el usuario no se encuentra
        res.render('users/show', { user }); // Renderiza la vista del usuario encontrado
    } catch (err) {
        res.status(500).json({ error: err.message }); // Envía un mensaje de error en caso de fallo
    }
};

// Actualizar un usuario
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id); // Encuentra un usuario por su ID
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' }); // Envía un mensaje si el usuario no se encuentra
        await user.update(req.body); // Actualiza el usuario con los datos del cuerpo de la solicitud
        res.redirect(`/users/${user.id}`); // Redirige a la vista del usuario actualizado
    } catch (err) {
        res.status(500).json({ error: err.message }); // Envía un mensaje de error en caso de fallo
    }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id); // Encuentra un usuario por su ID
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' }); // Envía un mensaje si el usuario no se encuentra
        await user.destroy(); // Elimina el usuario
        res.redirect('/users'); // Redirige a la lista de usuarios
    } catch (err) {
        res.status(500).json({ error: err.message }); // Envía un mensaje de error en caso de fallo
    }
};

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll(); // Obtiene todos los usuarios
        res.render('users/index', { users }); // Renderiza la vista de usuarios, pasando los usuarios encontrados
    } catch (err) {
        res.status(500).json({ error: err.message }); // Envía un mensaje de error en caso de fallo
    }
};

// Renderizar el formulario para crear un nuevo usuario
exports.renderNewUserForm = (req, res) => {
    res.render('users/new'); // Renderiza la vista para crear un nuevo usuario
};

// Renderizar el formulario para editar un usuario
exports.renderEditUserForm = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id); // Encuentra un usuario por su ID
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' }); // Envía un mensaje si el usuario no se encuentra
        res.render('users/edit', { user }); // Renderiza la vista para editar el usuario encontrado
    } catch (err) {
        res.status(500).json({ error: err.message }); // Envía un mensaje de error en caso de fallo
    }
};

// Renderizar la vista de login asegurándose de que 'error' esté definido
exports.renderLogin = (req, res) => {
    res.render('login_register/login', { error: '' }); // Renderiza la vista de login, asegurándose de que el mensaje de error esté definido
};
