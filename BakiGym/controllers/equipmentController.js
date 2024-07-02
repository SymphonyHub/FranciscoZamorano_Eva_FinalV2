// controllers/equipmentController.js
const Equipment = require('../models/Equipment');

exports.getAllEquipments = async (req, res) => {
    try {
        const equipments = await Equipment.findAll();
        res.render('equipment/index', { equipments });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: { message: 'NO SE ENCUENTRA' } });
    }
};

exports.createEquipmentForm = (req, res) => {
    res.render('equipment/new');
};

exports.createEquipment = async (req, res) => {
    try {
        const { name, description, imageUrl, quantity } = req.body;
        await Equipment.create({ name, description, imageUrl, quantity });
        res.redirect('/equipment');
    } catch (error) {
        res.status(500).send({ error: { message: 'NO SE ENCUENTRA' } });
    }
};

exports.getEquipmentById = async (req, res) => {
    try {
        const equipment = await Equipment.findByPk(req.params.id);
        if (!equipment) {
            return res.status(404).send('Equipment not found');
        }
        res.render('equipment/show', { equipment });
    } catch (error) {
        res.status(500).send({ error: { message: 'NO SE ENCUENTRA' } });
    }
};

exports.editEquipmentForm = async (req, res) => {
    try {
        const equipment = await Equipment.findByPk(req.params.id);
        if (!equipment) {
            return res.status(404).send('Equipment not found');
        }
        res.render('equipment/edit', { equipment });
    } catch (error) {
        res.status(500).send({ error: { message: 'NO SE ENCUENTRA' } });
    }
};

exports.updateEquipment = async (req, res) => {
    try {
        const { name, description, imageUrl, quantity } = req.body;
        await Equipment.update({ name, description, imageUrl, quantity }, { where: { id: req.params.id } });
        res.redirect('/equipment');
    } catch (error) {
        res.status(500).send({ error: { message: 'NO SE ENCUENTRA' } });
    }
};

exports.deleteEquipment = async (req, res) => {
    try {
        await Equipment.destroy({ where: { id: req.params.id } });
        res.redirect('/equipment');
    } catch (error) {
        res.status(500).send({ error: { message: 'NO SE ENCUENTRA' } });
    }
};
