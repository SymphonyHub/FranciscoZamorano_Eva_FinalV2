// controllers/userController.js
const bcrypt = require('bcrypt');
const { User } = require('../models');
const Sequelize = require('sequelize');

// Buscar usuarios
exports.searchUsers = async (req, res) => {
    try {
        const query = req.query.query.toLowerCase();
        const users = await User.findAll({
            where: {
                [Sequelize.Op.or]: [
                    Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', '%' + query + '%'),
                    { id: query }
                ]
            }
        });
        res.render('users/index', { users });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Registro de usuario
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Verificar que todos los campos estén presentes
        if (!name || !email || !password) {
            return res.status(400).render('login_register/register', { error: 'Todos los campos son obligatorios' });
        }

        // Verificar que el email no esté ya registrado
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).render('login_register/register', { error: 'El email ya está registrado' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el nuevo usuario
        const user = await User.create({ name, email, password: hashedPassword });
        res.redirect('/login');
    } catch (err) {
        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).render('login_register/register', { error: 'Error de validación: ' + err.message });
        }
        res.status(500).json({ error: err.message });
    }
};

// Login de usuario
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).render('login_register/login', { error: 'Usuario no encontrado' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).render('login_register/login', { error: 'Contraseña incorrecta' });
        }

        req.session.userId = user.id;
        res.redirect('/home');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Logout de usuario
exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/home');
        }
        res.clearCookie('sid');
        res.redirect('/login');
    });
};

// Otras funciones del controlador...

exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.redirect('/users');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.render('users/show', { user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        await user.update(req.body);
        res.redirect(`/users/${user.id}`);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        await user.destroy();
        res.redirect('/users');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.render('users/index', { users });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.renderNewUserForm = (req, res) => {
    res.render('users/new');
};

exports.renderEditUserForm = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.render('users/edit', { user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Render login view ensuring 'error' is defined
exports.renderLogin = (req, res) => {
    res.render('login_register/login', { error: '' });
};
