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

router.post('/', async (req, res) => {
    try {
        const { nombre, precio } = req.body

        if (typeof nombre !== 'string' || !nombre.trim()) {
            return res.status(400).json({
                error: 'El nombre es obligatorio'
            })
        }

        const precioNumero = Number(precio)

        if (!Number.isFinite(precioNumero) || precioNumero <= 0) {
            return res.status(400).json({
                error: 'El precio debe ser un número mayor que 0'
            })
        }

        const resultado = await pool.query(
            'INSERT INTO productos (nombre, precio) VALUES ($1, $2) RETURNING *',
            [nombre.trim(), precioNumero]
        )

        res.status(201).json(resultado.rows[0])
    } catch (error) {
        console.error('Error al crear producto:', error)

        res.status(500).json({
            error: 'Error al crear producto'
        })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { nombre, precio } = req.body

        if (typeof nombre !== 'string' || !nombre.trim()) {
            return res.status(400).json({
                error: 'El nombre es obligatorio'
            })
        }

        const precioNumero = Number(precio)

        if (!Number.isFinite(precioNumero) || precioNumero <= 0) {
            return res.status(400).json({
                error: 'El precio debe ser un número mayor que 0'
            })
        }

        const resultado = await pool.query(
            'UPDATE productos SET nombre = $1, precio = $2 WHERE id = $3 RETURNING *',
            [nombre.trim(), precioNumero, id]
        )

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            })
        }

        res.json(resultado.rows[0])
    } catch (error) {
        console.error('Error al actualizar producto:', error)

        res.status(500).json({
            error: 'Error al actualizar producto'
        })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const resultado = await pool.query(
            'DELETE FROM productos WHERE id = $1 RETURNING *',
            [id]
        )

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            })
        }

        res.json(resultado.rows[0])
    } catch (error) {
        console.error('Error al eliminar producto:', error)

        res.status(500).json({
            error: 'Error al eliminar producto'
        })
    }
})

module.exports = router