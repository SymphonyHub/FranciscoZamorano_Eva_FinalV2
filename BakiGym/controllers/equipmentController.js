const Equipment = require('../models/Equipment');

// Obtener todos los equipos
exports.getAllEquipments = async (req, res) => {
    try {
        const equipments = await Equipment.findAll();
        res.render('equipment/index', { equipments });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Formulario para nuevo equipo
exports.createEquipmentForm = (req, res) => {
    res.render('equipment/new');
};

// Crear un nuevo equipo
exports.createEquipment = async (req, res) => {
    try {
        const { name, description, quantity, imageUrl } = req.body;
        await Equipment.create({ name, description, quantity, imageUrl });
        res.redirect('/equipments');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un equipo por ID
exports.getEquipmentById = async (req, res) => {
    try {
        const equipment = await Equipment.findByPk(req.params.id);
        res.render('equipment/show', { equipment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Formulario para editar equipo
exports.editEquipmentForm = async (req, res) => {
    try {
        const equipment = await Equipment.findByPk(req.params.id);
        res.render('equipment/edit', { equipment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un equipo
exports.updateEquipment = async (req, res) => {
    try {
        const { name, description, quantity, imageUrl } = req.body;
        await Equipment.update({ name, description, quantity, imageUrl }, { where: { id: req.params.id } });
        res.redirect(`/equipments/${req.params.id}`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un equipo
exports.deleteEquipment = async (req, res) => {
    try {
        await Equipment.destroy({ where: { id: req.params.id } });
        res.redirect('/equipments');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
