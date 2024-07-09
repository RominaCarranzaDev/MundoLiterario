//1 importamos modulo mysql2

const mysql = require('mysql2');

//2 configuramos conexion a la db

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
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
        //en caso de error
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
            const createTableCategory = `
                CREATE TABLE IF NOT EXISTS category (
                    id INT AUTO_INCREMENT PRIMARY KEY ,
                    codigo VARCHAR(255)NOT NULL,
                    nombre VARCHAR(255) NOT NULL,
                    sub_categoria VARCHAR(255) NOT NULL
                );
            `;
            const createTableQuery = `
                CREATE TABLE IF NOT EXISTS books (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    codigo VARCHAR(15) NOT NULL,
                    imagen VARCHAR(255) NOT NULL,
                    nombre VARCHAR(255) NOT NULL,
                    autor VARCHAR(255) NOT NULL,
                    categoria INT NOT NULL,
                    descripcion VARCHAR(255),
                    precio FLOAT NOT NULL,
                    stock INT NOT NULL, 
                    editorial VARCHAR(255) NOT NULL,
                    FOREIGN KEY (categoria) REFERENCES category(id)
                );
            `;        
            const createTableUser = `
                CREATE TABLE IF NOT EXISTS user (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    nombre VARCHAR(255) NOT NULL,
                    apellido VARCHAR(255) NOT NULL,
                    correo VARCHAR(255) NOT NULL,
                    password VARCHAR(255) NOT NULL
                );
            `;
            //pasamos la consulta para la tabla Category
            connection.query(createTableCategory, (err, results)=>{
                //en caso de error
                if (err) {
                    console.error('Error al crear la tabla:', err);
                    return;
                }
                //en caso de exito
                console.log("Tabla Category: CREADA/EXISTENTE/GARANTIZADA");
                //Chequea que la tabla esta vacia para agregar las categorias iniciales
                const checkTableCategory = 'SELECT COUNT(*) AS cantidad FROM category';
                connection.query(checkTableCategory, (err, results) => {
                    if (err) {
                        console.error('Error al verificar la tabla category:', err);
                        return;
                    }
                    const cantidad = results[0].cantidad;
                    if (cantidad === 0) {
                        // Insertar registros iniciales en la tabla category
                        const insertCategories = `
                            INSERT INTO category (codigo, nombre, sub_categoria) VALUES 
                            ('cat-inf', 'infantil', 'infantil'),
                            ('cat-nov', 'novela', 'cuento'),
                            ('cat-nov', 'novela', 'novela'),                    
                            ('cat-nov', 'novela', 'psicología'),
                            ('cat-nov', 'novela', 'novela distópica'),
                            ('cat-nov', 'novela', 'ficción espiritual'),
                            ('cat-nov', 'novela', 'novela contemporánea'),
                            ('cat-nov', 'novela', 'novela histórica'),
                            ('cat-rom', 'romantica', 'romántica'),
                            ('cat-fan', 'fantasía', 'novela fantástica'),
                            ('cat-nov', 'novela', 'realismo mágico'),
                            ('cat-fan', 'fantasía', 'fantasía'),
                            ('cat-fan', 'fantasía', 'fantasía épica'),
                            ('cat-nov', 'novela', 'thriller'),
                            ('cat-ter', 'terror', 'terror'),
                            ('cat-cfi', 'ciencia ficción', 'ciencia ficción'),
                            ('cat-pol', 'policial', 'policial'),
                            ('cat-pol', 'policial', 'policial y espionaje'),
                            ('cat-bie', 'bienestar', 'bienestar'),
                            ('cat-coc', 'cocina', 'cocina');
                        `;

                        connection.query(insertCategories, (err, results) => {
                            if (err) {
                                console.error('Error al insertar registros en la tabla category:', err);
                                return;
                            }
                            console.log("Registros iniciales en la tabla Category: INSERTADOS");
                        });
                    }
                })
            });
            //pasamos la consulta para la tabla Books
            connection.query(createTableQuery, (err, results)=>{
                //en caso de error
                if (err) {
                    console.error('Error al crear la tabla books:', err);
                    return;
                }
                //en caso de exito
                console.log("Tabla Books: CREADA/EXISTENTE/GARANTIZADA");
            })
            
            // //pasamos la consulta para la tabla User
            connection.query(createTableUser, (err, results)=>{
                //en caso de error
                if (err) {
                    console.error('Error al crear la tabla:', err);
                    return;
                }
                //en caso de exito
                console.log("Tabla User: CREADA/EXISTENTE/GARANTIZADA");
                // Insertar el registro inicial Admin solo si la tabla está vacía
                //count(*) cuenta cuantos registros hay en la tabla
                const checkTableUser = 'SELECT COUNT(*) AS cantidad FROM user';
                connection.query(checkTableUser, (err, results) => {
                    if (err) {
                        console.error('Error al verificar la tabla user:', err);
                        return;
                    }
                    const cantidad = results[0].cantidad;
                    if (cantidad === 0) {
                        const insertAdmin = `
                            INSERT INTO user (nombre, apellido, correo, password) VALUES 
                            ('Admin', 'MundoLiterario', 'mundoLiterario@gmail.com', 'admin1234');
                        `;
                        connection.query(insertAdmin, (err, results) => {
                            if (err) {
                                console.error('Error al insertar admin en la tabla user:', err);
                                return;
                            }
                            console.log("Registro Admin en la tabla User: INSERTADO");
                        });
                    }
                });
            })
        });
    })
})

//exportacion del modulo
module.exports = connection;