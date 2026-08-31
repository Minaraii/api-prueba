const express = require('express');
const cors = require('cors');

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

let productos = [
    {
        id: 1,
        nombre: 'Botella de cobre',
        precio: 25
    },
    {
        id: 2,
        nombre: 'Estatua decorativa',
        precio: 40
    },
    {
        id: 3,
        nombre: 'Rastreador de hábitos',
        precio: 15
    }
];

app.get('/', (req, res) => {
    res.send('Hola desde mi servidor 🚀');
});

app.get('/api/productos', (req, res) => {
    res.json(productos);
});

app.post('/api/productos', (req, res) => {
    const nuevoProducto = {
        id: productos.length + 1,
        nombre: req.body.nombre,
        precio: req.body.precio
    };

    productos.push(nuevoProducto);

    res.status(201).json(nuevoProducto);
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});