// src/routes/movieRoutes.js
/**
 * Enrutador 
 * Endpoints
 */

// 1- Importamos el módulo
const express = require("express");

// 2- Instanciamos Router de express
const router = express.Router();

// 3- Importamos el módulo propio movieController (a realizarlo a futuro)
const booksController = require('../controller/booksControllers');

// 4- En movieController programaremos el módulo junto a métodos GET, POST, PUT, DELETE
// Dejaremos sólo la declaración de las rutas, con sus métodos 
// y el llamado al movieController con el método específico para cada opción 

// Ruta de listado en general
router.get('/', booksController.getAllBooks);
//Ruta para la consulta de peliculas por id
router.get('/:id', booksController.getBooksById);
//Ruta para crear una pelicula
router.post('/', booksController.createBooks);
//Ruta para actualizar una pelicula
router.put('/:id', booksController.updateBooks);
//Ruta para borrar una pelicula
router.delete('/:id', booksController.deleteBooks);

//5- Exportamos el módulo
module.exports = router;

//6- Pasamos a configurar movieController.js