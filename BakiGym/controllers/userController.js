const User = require('../models/User');

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
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.render('users/show', { user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        await user.update(req.body);
        res.redirect(`/users/${user.id}`);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
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
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.render('users/edit', { user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
