// controllers/equipmentController.js
const Equipment = require('../models/Equipment'); // Importa el modelo Equipment

// Obtener todos los equipos
exports.getAllEquipments = async (req, res) => {
    try {
        const equipments = await Equipment.findAll(); // Encuentra todos los registros de Equipment
        res.render('equipment/index', { equipments }); // Renderiza la vista de equipos, pasando los equipos encontrados
    } catch (error) {
        console.error(error); // Imprime el error en la consola
        res.status(500).send({ error: { message: 'NO SE ENCUENTRA' } }); // Envía un mensaje de error en caso de fallo
    }
};

// Renderizar el formulario para crear un nuevo equipo
exports.createEquipmentForm = (req, res) => {
    res.render('equipment/new'); // Renderiza la vista para crear un nuevo equipo
};

// Crear un nuevo equipo
exports.createEquipment = async (req, res) => {
    try {
        const { name, description, imageUrl, quantity } = req.body; // Obtiene los datos del cuerpo de la solicitud
        await Equipment.create({ name, description, imageUrl, quantity }); // Crea un nuevo registro de Equipment
        res.redirect('/equipment'); // Redirige a la lista de equipos
    } catch (error) {
        res.status(500).send({ error: { message: 'NO SE ENCUENTRA' } }); // Envía un mensaje de error en caso de fallo
    }
};

// Obtener un equipo por ID
exports.getEquipmentById = async (req, res) => {
    try {
        const equipment = await Equipment.findByPk(req.params.id); // Encuentra un equipo por su ID
        if (!equipment) {
            return res.status(404).send('Equipment not found'); // Envía un mensaje si el equipo no se encuentra
        }
        res.render('equipment/show', { equipment }); // Renderiza la vista del equipo encontrado
    } catch (error) {
        res.status(500).send({ error: { message: 'NO SE ENCUENTRA' } }); // Envía un mensaje de error en caso de fallo
    }
};

// Renderizar el formulario para editar un equipo
exports.editEquipmentForm = async (req, res) => {
    try {
        const equipment = await Equipment.findByPk(req.params.id); // Encuentra un equipo por su ID
        if (!equipment) {
            return res.status(404).send('Equipment not found'); // Envía un mensaje si el equipo no se encuentra
        }
        res.render('equipment/edit', { equipment }); // Renderiza la vista para editar el equipo encontrado
    } catch (error) {
        res.status(500).send({ error: { message: 'NO SE ENCUENTRA' } }); // Envía un mensaje de error en caso de fallo
    }
};

// Actualizar un equipo
exports.updateEquipment = async (req, res) => {
    try {
        const { name, description, imageUrl, quantity } = req.body; // Obtiene los datos del cuerpo de la solicitud
        await Equipment.update({ name, description, imageUrl, quantity }, { where: { id: req.params.id } }); // Actualiza el equipo por su ID
        res.redirect('/equipment'); // Redirige a la lista de equipos
    } catch (error) {
        res.status(500).send({ error: { message: 'NO SE ENCUENTRA' } }); // Envía un mensaje de error en caso de fallo
    }
};

// Eliminar un equipo
exports.deleteEquipment = async (req, res) => {
    try {
        await Equipment.destroy({ where: { id: req.params.id } }); // Elimina un equipo por su ID
        res.redirect('/equipment'); // Redirige a la lista de equipos
    } catch (error) {
        res.status(500).send({ error: { message: 'NO SE ENCUENTRA' } }); // Envía un mensaje de error en caso de fallo
    }
};
