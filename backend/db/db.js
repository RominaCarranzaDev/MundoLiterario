//1 importamos modulo mysql2

const mysql = require('mysql2');

//2 configuramos conexion a la db
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin1234',
    port: 3306,
});

//conexion
connection.connect((err)=>{
    //en caso de error
    if(err){
        console.log("error de conexion con el servidor: "+err);
        return;
    }
    //en caso OK
    console.log("estado de conexion con el servidor: CONECTADO");

    //creamos consulta 
    const sqlCreatedb = 'CREATE DATABASE IF NOT EXISTS Mundo_Literario_db';

    //pasamos la consulta a la db
    connection.query(sqlCreatedb, (err, result)=>{
        //en casod de errror
        if(err){
            console.log("error de conexion con el servidor: "+err);
            return;
        }
        //exito
        console.log("base de datos: CREADA/EXISTENTE/GARANTIZADA");

        //Tabla 
        connection.changeUser({database: 'Mundo_Literario_db'}, (err)=>{
            if(err){
                console.log("Error al cambiar a la base de datos Mundo_Literario_db: "+err);
                return;
            }
            //generamos la consulta para crear la tabla
            const createTableQuery = `
                CREATE TABLE IF NOT EXISTS books (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    codigo VARCHAR(15) NOT NULL,
                    imagen VARCHAR(255) NOT NULL,
                    nombre VARCHAR(255) NOT NULL,
                    autor VARCHAR(255) NOT NULL,
                    categoria VARCHAR(255) NOT NULL,
                    descripcion VARCHAR(255),
                    precio FLOAT NOT NULL,
                    stock INT NOT NULL, 
                    title VARCHAR(255) NOT NULL,
                    editorial VARCHAR(255) NOT NULL
                );
            `;
            const createTableCategory = `
                CREATE TABLE IF NOT EXISTS category (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    codigo VARCHAR(255) NOT NULL,
                    nombre VARCHAR(255) NOT NULL,
                    sub_categoria VARCHAR(255) NOT NULL
                );
            `;
            const createTableUser = `
                CREATE TABLE IF NOT EXISTS user (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    nombre VARCHAR(255) NOT NULL,
                    apellido VARCHAR(255) NOT NULL,
                    correo VARCHAR(255) NOT NULL,
                    contraseña VARCHAR(255) NOT NULL
                );
            `;

            //pasamos la consulta
            connection.query(createTableQuery, (err, results)=>{
                //en caso de error
                if (err) {
                    console.error('Error al crear la tabla:', err);
                    return;
                }
                //en caso de exito
                console.log("Tabla: CREADA/EXISTENTE/GARANTIZADA");
            })
            //pasamos la consulta
            connection.query(createTableCategory, (err, results)=>{
                //en caso de error
                if (err) {
                    console.error('Error al crear la tabla:', err);
                    return;
                }
                //en caso de exito
                console.log("Tabla: CREADA/EXISTENTE/GARANTIZADA");
            })
            // //pasamos la consulta
            connection.query(createTableUser, (err, results)=>{
                //en caso de error
                if (err) {
                    console.error('Error al crear la tabla:', err);
                    return;
                }
                //en caso de exito
                console.log("Tabla: CREADA/EXISTENTE/GARANTIZADA");
            })
        });
    })
})

//exportacion del modulo
module.exports = connection;