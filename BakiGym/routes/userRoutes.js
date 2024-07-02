// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.get('/new', userController.renderNewUserForm);
router.post('/', userController.createUser);
router.get('/search', userController.searchUsers); // Ruta de búsqueda
router.get('/:id', userController.getUser);
router.get('/:id/edit', userController.renderEditUserForm);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
