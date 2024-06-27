// classRoutes.js
const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

router.get('/', classController.getAllClasses);
router.get('/new', classController.getNewClassForm);
router.post('/', classController.createClass);
router.get('/search', classController.searchClasses); // Ruta de búsqueda
router.get('/:id', classController.getClassById);
router.get('/:id/edit', classController.getEditClassForm);
router.put('/:id', classController.updateClass);
router.delete('/:id', classController.deleteClass);

module.exports = router;
