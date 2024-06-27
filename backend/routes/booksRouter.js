const express = require("express");
const router = express.Router();
const booksController = require('../controller/booksControllers');

// Ruta de listado en general
router.get('/', booksController.getAllBooks);
//Ruta para la consulta de un libro por id
router.get('/:id', booksController.getBooksById);
//Ruta para crear un libro
router.post('/', booksController.createBooks);
//Ruta para actualizar un libro
router.put('/:id', booksController.updateBooks);
//Ruta para borrar un libro
router.delete('/:id', booksController.deleteBooks);

module.exports = router;
