const db = require("../db/db.js");

const getAllBooks = (req, res)=>{
    const sql = 'SELECT books.*, category.nombre AS nombre_categoria ,category.sub_categoria AS sub_categoria FROM books INNER JOIN category ON books.categoria = category.id;';
    //enviamos consulta a la base de datos
    db.query(sql, (err, result)=>{
        if(err){throw err}
        res.json(result)
    });
};


const getBooksById = (req, res)=>{

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


const deleteBooks = (req, res) =>{

    const {id} = req.params;
    //consulta sql 
    const sql = 'DELETE FROM books WHERE id = ?';
    db.query(sql, [id], (err, result)=>{
        //si sucede algun error
        if(err){throw err}
        //si todo sale bien
        res.json({mensaje:"Libros borrados"})
    });

}

module.exports = {
    getAllBooks,
    getBooksById,
    createBooks,
    updateBooks,
    deleteBooks
};