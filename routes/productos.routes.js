const express = require('express')
const { Pool } = require('pg')
require('dotenv').config()

const router = express.Router()

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})

router.get('/', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM productos')
        res.json(resultado.rows)
    } catch (error) {
        console.error('Error al obtener productos:', error)

        res.status(500).json({
            error: 'Error al obtener productos'
        })
    }
})

module.exports = router