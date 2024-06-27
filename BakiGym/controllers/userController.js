// userController.js
const { User } = require('../models');
const Sequelize = require('sequelize');

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
