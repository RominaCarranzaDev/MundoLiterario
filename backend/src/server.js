const express = require('express');
const app = express();
const cors = require('cors');

const booksRoutes = require('../routes/booksRouter');
const usersRoutes = require('../routes/usersRouter');

const PORT = 3000; 
// Permitir solicitudes desde http://127.0.0.1:5502 localhost
app.use(cors({
    origin: 'http://127.0.0.1:5502'
}));

app.use(express.json());

// Prefijo principal de las rutas y delegación de las sub-rutas
app.use('/books', booksRoutes);
app.use('/users', usersRoutes);

//Iniciación del servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: ${PORT}`);
});


