const db = require("../db/db.js");

const getAllUsers = (req, res)=>{
    const sql = 'SELECT * FROM user';
    //enviamos consulta a la base de datos
    db.query(sql, (err, result)=>{
        if(err){throw err}
        res.json(result)
    });
};


const getUserById = (req, res)=>{

    const {id} = req.params;
    const sql = 'SELECT * FROM user WHERE id = ?'

    //enviamos la consulta a la base de datos
    db.query(sql,[id],(err, result)=>{
        //si sucede algun error
        if(err){throw err}
        //si todo sale bien
        res.json(result)
    });
}


const createUser = (req, res)=>{
    //desestructuramos la request
    const {nombre, apellido, correo, password} = req.body
    //creamos la consulta
    const sql = 'INSERT INTO user (nombre, apellido, correo, password) VALUES (?, ?, ?, ?)';
    //enviamos consulta a la bbdd
    db.query(sql,[nombre, apellido, correo, password],(err, result)=>{
        //si sucede algun error
        if(err){throw err}
        //si todo sale bien
        res.json({mensaje:"Usuario creado"})
    });

}


const updateUser = (req, res)=>{
    //desestructuracion de la consulta
    const {id} = req.params;
    const {nombre, apellido, correo, password} = req.body;

    //creamos la consulta sql 
    const sql = 'UPDATE user SET nombre = ?, apellido = ?, correo = ?, autor= ?, pasword = ? WHERE id = ?';

    //enviamos consulta a la base de datos
    db.query(sql, [nombre, apellido, correo, password, id], (err, result)=>{
        //si sucede algun error
        if(err){throw err}
        //si todo sale bien
        res.json({mensaje:"Usuario actualizado"})
    } );
}


const deleteUser = (req, res) =>{

    const {id} = req.params;
    //consulta sql 
    const sql = 'DELETE FROM user WHERE id = ?';
    db.query(sql, [id], (err, result)=>{
        //si sucede algun error
        if(err){throw err}
        //si todo sale bien
        res.json({mensaje:"Usuario eliminado"})
    });

}


const login = (req, res)=>{
    const {correo, password} = req.body;
    const sql = 'SELECT * FROM user WHERE correo = ? AND password = ?' ;
    //enviamos la consulta a la base de datos
    db.query(sql,[correo, password],(err, result)=>{
        //si sucede algun error
        if(err){throw err}
        //si todo sale bien
        //Si existe el usuario y contraseña ingresados en la db
        if (result.length === 1) {
            res.json({ "found": true });
        } else {
            res.json({ "found": false });
        }
    });
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login
};