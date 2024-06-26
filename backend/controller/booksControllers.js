/**
 * El controlador es el que tendrá los cambios más importantes 
 * y es el que hará el tratamiento de la información.
 * En este archivo tenemos que codificar los métodos
 * .getAllMovies
 * .getMovieById
 * .createMovie
 * .updateMovie
 * .deleteMovie
 */

//1-Importamos modulo db.js 
// El objeto db posee los métodos para conectar con la base de datos. 
// Es la conexión a la base de datos.

const db = require("../db/db.js");

//2- .getAllMovies
const getAllBooks = (req, res)=>{
    //creamos consulta
    const sql = 'SELECT * FROM books';
    //enviamos consulta a la base de datos
    db.query(sql, (err, result)=>{
        if(err){throw err}
        res.json(result)
    });
};

//3
const getBooksById = (req, res)=>{
    //obtenemos la info de id que viene del cliente
    // const id = req.params.id
    //notacion de desestructuración {id]}
    const {id} = req.params;
    const sql = 'SELECT * FROM books WHERE id = ?'

    //enviamos la consulta a la base de datos
    db.query(sql,[id],(err, result)=>{
        //si sucede algun error
        if(err){throw err}
        //si todo sale bien
        res.json(result)
    });
}

//4
const createBooks = (req, res)=>{
    //desestructuramos la request
    const {codigo, imagen, nombre, autor, categoria, descripcion, precio, stock, editorial} = req.body
    //creamos la consulta
    const sql = 'INSERT INTO books (codigo, imagen, nombre, autor, categoria, descripcion, precio, stock, editorial) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    //enviamos consulta a la bbdd
    db.query(sql,[codigo, imagen, nombre, autor, categoria, descripcion, precio, stock, editorial],(err, result)=>{
        //si sucede algun error
        if(err){throw err}
        //si todo sale bien
        res.json({mensaje:"Libro creado"})
    });

}

//5
const updateBooks = (req, res)=>{
    //desestructuracion de la consulta
    const {id} = req.params;
    const {codigo, imagen, nombre, autor, categoria, descripcion, precio, stock, editorial} = req.body;

    //creamos la consulta sql 
    const sql = 'UPDATE books SET codigo = ?, imagen= ?, nombre= ?, autor= ?, categoria= ?, descripcion= ?, precio= ?, stock= ?, editorial= ? WHERE id = ?';

    //enviamos consulta a la base de datos
    db.query(sql, [codigo, imagen, nombre, autor, categoria, descripcion, precio, stock, editorial, id], (err, result)=>{
        //si sucede algun error
        if(err){throw err}
        //si todo sale bien
        res.json({mensaje:"Libros actualizados"})
    } );
}

//6 delete
const deleteBooks = (req, res) =>{
    //desestructurar el encabezado
    //id viaja en la direccion y los atributos title director e year viajan en el body
    const {id} = req.params;
    //consulta sql 
    const sql = 'DELETE FROM books WHERE id = ?';
    //pasamos la consulta con 3 parametros.. constante sql, array y el error
    db.query(sql, [id], (err, result)=>{
        //si sucede algun error
        if(err){throw err}
        //si todo sale bien
        res.json({mensaje:"Libros borrados"})
    });

}

//7 exportamos los modulos

module.exports = {
    getAllBooks,
    getBooksById,
    createBooks,
    updateBooks,
    deleteBooks
};

//pasamos a codificar db.js