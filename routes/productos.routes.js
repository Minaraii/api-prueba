const express = require('express')
require('dotenv').config()

const router = express.Router()

const pool = require('../db/database')

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