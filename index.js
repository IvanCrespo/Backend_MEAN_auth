const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();

// Crear el servidor/aplicacion de Express
const app = express();

// Conexion a la DB
dbConnection();

// Directorio Publico
app.use(express.static('public'));

// CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Rutas -> usamos middleware: es una función que se ejecuta cuando el interprete pase evaluando las lineas de codigo
app.use('/api/auth', require('./routes/auth'));

// Levantar la app de Express
app.listen(process.env.PORT, () => {
    console.log(`Servidor  Corriendo en puerto ${process.env.PORT}`);
})