const express = require("express");
const router = express.Router();
const usersController = require('../controller/usersControllers');

// Ruta de listado en general
router.get('/', usersController.getAllUsers);
//Ruta para la consulta de un usuario por id
router.get('/:id', usersController.getUserById);
//Ruta para crear un usuario
router.post('/', usersController.createUser);
//Ruta para actualizar un usuario
router.put('/:id', usersController.updateUser);
//Ruta para borrar un usuario
router.delete('/:id', usersController.deleteUser);
//Ruta para chequear que el admin este logueado
router.post('/login', usersController.login);

module.exports = router;
