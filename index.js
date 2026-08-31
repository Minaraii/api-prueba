const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

pool.query('SELECT * FROM productos', (error, resultado) => {
    if (error) {
        console.error('Error consultando productos:', error);
    } else {
        console.log('Productos:', resultado.rows);
    }
});


app.get('/', (req, res) => {
    res.send('Hola desde mi servidor 🚀');
});

app.get('/api/productos', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM productos');

        res.json(resultado.rows);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({
            error: 'Error al obtener productos'
        });
    }
});

app.post('/api/productos', async (req, res) => {
    try {
        const { nombre, precio } = req.body;

        const resultado = await pool.query(
            'INSERT INTO productos (nombre, precio) VALUES ($1, $2) RETURNING *',
            [nombre, precio]
        );

        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        console.error('Error al crear producto:', error);

        res.status(500).json({
            error: 'Error al crear producto'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});